import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
const CartContext = createContext(null);
const couponCodes = {
  'DESCUENTO10': 0.10,
  'DESCUENTO20': 0.20,
};
export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [couponCode, setCouponCode] = useState('');

  // Cargar carrito y descuento desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem("cart_items");
    if (storedCart) {
      try {
        setCartItems(JSON.parse(storedCart));
      } catch (error) {
        console.error("Error al cargar el carrito desde localStorage:", error);
        setCartItems([]);
      }
    }

    const storedDiscount = localStorage.getItem("cart_discount");
    if (storedDiscount) {
      try {
        const discountData = JSON.parse(storedDiscount);
        setDiscount(discountData.amount || 0);
        setCouponCode(discountData.couponCode || '');
      } catch (error) {
        console.error("Error al cargar el descuento desde localStorage:", error);
        setDiscount(0);
        setCouponCode('');
      }
    }
  }, []);

  // Guardar carrito en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
  }, [cartItems]);

  // Guardar descuento en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem(
      "cart_discount",
      JSON.stringify({ amount: discount, couponCode })
    );
  }, [discount, couponCode]);

  // Recalcular descuento cuando cambien los items del carrito (si hay cupón aplicado)
  useEffect(() => {
    if (couponCode) {
      const discountRate = couponCodes[couponCode];
      if (discountRate) {
        const subtotal = getSubtotal();
        const discountAmount = subtotal * discountRate;
        setDiscount(discountAmount);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems, couponCode]);

  // Agregar item al carrito o incrementar cantidad si ya existe
  const addToCart = (book) => {
    if (!book || book.stock <= 0) {
      return;
    }

    setCartItems((prevItems) => {
      // Usar título como identificador único
      const existingItem = prevItems.find((item) => item.titulo === book.titulo);

      if (existingItem) {
        // Si ya existe, incrementar cantidad (solo si hay stock disponible)
        if (existingItem.quantity < book.stock) {
          return prevItems.map((item) =>
            item.titulo === book.titulo
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        } else {
          // Stock insuficiente
          return prevItems;
        }
      } else {
        // Si no existe, agregar nuevo item
        return [
          ...prevItems,
          {
            titulo: book.titulo,
            autor: book.autor,
            precio_usd: book.precio_usd,
            url_caratula: book.url_caratula,
            stock: book.stock,
            quantity: 1,
          },
        ];
      }
    });
  };

  // Eliminar item del carrito
  const removeFromCart = (titulo) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.titulo !== titulo));
  };

  // Actualizar cantidad de un item
  const updateQuantity = (titulo, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(titulo);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.titulo === titulo) {
          // Verificar que no exceda el stock disponible
          const quantity = Math.min(newQuantity, item.stock);
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  // Limpiar todo el carrito
  const clearCart = () => {
    setCartItems([]);
    setDiscount(0);
    setCouponCode('');
  };

  // Calcular total de items en el carrito
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Calcular subtotal del carrito
  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.precio_usd * item.quantity,
      0
    );
  };

  // Calcular total (subtotal - descuento)
  const getTotal = () => {
    const subtotal = getSubtotal();
    return subtotal - discount;
  };

  // Aplicar cupón de descuento
  const applyCoupon = (coupon) => {
    if (!coupon || !coupon.trim()) {
      return { success: false, message: 'Cupón no válido' };
    }

    const discountRate = couponCodes[coupon.toUpperCase()];
    
    if (discountRate) {
      const subtotal = getSubtotal();
      const discountAmount = subtotal * discountRate;
      setDiscount(discountAmount);
      setCouponCode(coupon.toUpperCase());
      return { success: true, message: 'Cupón aplicado correctamente' };
    } else {
      return { success: false, message: 'Cupón no válido' };
    }
  };

  // Remover cupón de descuento
  const removeCoupon = () => {
    setDiscount(0);
    setCouponCode('');
  };

  // Verificar si un libro está en el carrito
  const isInCart = (titulo) => {
    return cartItems.some((item) => item.titulo === titulo);
  };

  // Obtener cantidad de un libro en el carrito
  const getItemQuantity = (titulo) => {
    const item = cartItems.find((item) => item.titulo === titulo);
    return item ? item.quantity : 0;
  };

  const processOrder = (formData) => {
    // Validar que haya items en el carrito
    if (cartItems.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Validar dirección
    if (!formData.address.trim()) {
      alert('Por favor, ingresa una dirección de envío');
      return;
    }

    // Crear idPedido único
    const idPedido = `PED-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    // Obtener datos de la compra
    const fechaCompra = new Date().toISOString();
    const totalPagado = getTotal();
    const urlsImagenes = cartItems.map(item => item.url_caratula);

    // Crear objeto de compra
    const compra = {
      idPedido,
      auth_user: user.email,
      fechaCompra,
      totalPagado,
      urlsImagenes,
      items: cartItems.map(item => ({
        titulo: item.titulo,
        autor: item.autor,
        precio_usd: item.precio_usd,
        url_caratula: item.url_caratula,
        quantity: item.quantity
      })),
      direccionEnvio: formData.address,
      metodoPago: formData.payment
    };

    // Obtener pedidos existentes del localStorage
    const pedidosKey = `pedidos_${user.email}`;
    const pedidosExistentes = localStorage.getItem(pedidosKey);
    let pedidos = [];

    if (pedidosExistentes) {
      try {
        pedidos = JSON.parse(pedidosExistentes);
      } catch (error) {
        console.error('Error al cargar pedidos existentes:', error);
        pedidos = [];
      }
    }

    // Agregar nuevo pedido
    pedidos.push(compra);

    localStorage.setItem(pedidosKey, JSON.stringify(pedidos));

    // Limpiar el carrito
    clearCart();

    alert('¡Compra realizada con éxito!');
  }
  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubtotal,
    getTotal,
    discount,
    couponCode,
    applyCoupon,
    removeCoupon,
    isInCart,
    getItemQuantity,
    processOrder
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return context;
}

