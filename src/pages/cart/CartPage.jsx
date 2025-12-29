import { useState } from 'react';
import CartItem from './CartItem';
import './cart.css'; // Asegúrate de importar el CSS

export default function CartPage() {
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: "Libro 1",
            price: 20.00,
            quantity: 1,
            image: "https://via.placeholder.com/80x100"
        },
        {
            id: 2,
            name: "Libro 2",
            price: 25.00,
            quantity: 2,
            image: "https://via.placeholder.com/80x100"
        },
        {
            id: 3,
            name: "Libro 3",
            price: 30.00,
            quantity: 1,
            image: "https://via.placeholder.com/80x100"
        }
    ]);

    const [coupon, setCoupon] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountApplied, setDiscountApplied] = useState(false);

    // Calcular subtotal
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total = subtotal - discount;
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

    const handleQuantityChange = (itemId, newQuantity) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const handleRemoveItem = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    const handleApplyCoupon = () => {
        if (!coupon.trim()) return;

        const couponCodes = {
            'DESCUENTO10': 0.10,
            'DESCUENTO20': 0.20,
        };

        if (couponCodes[coupon.toUpperCase()]) {
            const discountRate = couponCodes[coupon.toUpperCase()];
            const discountAmount = subtotal * discountRate;
            setDiscount(discountAmount);
            setDiscountApplied(true);
        } else {
            alert('Cupón no válido');
            setDiscount(0);
            setDiscountApplied(false);
        }
    };

    return (
        <div className="container py-4">
            <h4 className="mb-4">Tu Carrito ({totalItems} {totalItems === 1 ? 'item' : 'items'})</h4>

            <div className="row">
                <div className="col-12 col-lg-8 mb-4 mb-lg-0">
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="bi bi-cart-x me-2"></i>
                                Tu carrito está vacío
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <CartItem
                                    key={item.id}
                                    itemId={item.id}
                                    itemName={item.name}
                                    price={item.price}
                                    initialQuantity={item.quantity}
                                    image={item.image}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={() => handleRemoveItem(item.id)}
                                />
                            ))
                        )}
                    </div>
                    <div className="preliminary-subtotal">
                        <div className="price-row">
                            <span className="text-muted">Subtotal preliminar:</span>
                            <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="tax-notice">
                            <i className="bi bi-info-circle me-1"></i>
                            Los impuestos y gastos de envío se calcularán en el checkout
                        </p>
                    </div>
                </div>

                {/* Columna derecha - Resumen */}
                <div className="col-12 col-lg-4">
                    <div className="cart-summary-card">
                        <h5 className="cart-summary-title">Resumen del pedido</h5>

                        {/* Cupón */}
                        <div className="coupon-section">
                            <label className="coupon-label">Código de descuento</label>
                            <div className="coupon-input-group">
                                <input
                                    type="text"
                                    className="coupon-input"
                                    placeholder="Ingrese su código"
                                    value={coupon}
                                    onChange={(e) => setCoupon(e.target.value)}
                                    disabled={discountApplied}
                                />
                                <button className="coupon-btn"
                                        onClick={handleApplyCoupon}
                                        disabled={discountApplied || !coupon.trim()}
                                >
                                    {discountApplied ? '✓' : 'Aplicar'}
                                </button>
                            </div>
                        </div>

                        {/* Precios */}
                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="price-row">
                                    <span className="discount-text">Descuento</span>
                                    <span className="discount-text">-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="price-row shipping-text">
                                <span>Envío</span>
                                <span className="text-success">Gratis</span>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="total-section">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        {/* Botón de pago */}
                        <button className="checkout-btn">
                            Proceder al pago
                        </button>

                        {/* Métodos de pago
                        <div className="payment-methods">
                            <p className="payment-methods-title">Métodos de pago aceptados:</p>
                            <div className="payment-icons">
                                <i className="bi bi-credit-card text-muted"></i>
                                <i className="bi bi-paypal text-primary"></i>
                                <i className="bi bi-google text-success"></i>
                            </div>
                        </div>*/}
                    </div>

                    {/* Continuar comprando */}
                    <div className="continue-shopping">
                        <a href="/catalog">
                            <i className="bi bi-arrow-left"></i>
                            Continuar comprando
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}