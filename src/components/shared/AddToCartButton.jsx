import React from 'react';
import { useCart } from '../../context/CartContext';

function AddToCartButton({ book, className = '', showMsg = true }) {
    const { stock, titulo, precio_usd } = book;
    const { addToCart, isInCart, getItemQuantity } = useCart();

    const handleAddToCart = () => {
        addToCart(book);
    };

    const isOutOfStock = stock <= 0;
    const inCart = isInCart(titulo);
    const quantity = getItemQuantity(titulo);
    
    let msg = "Añadir al carrito";
    if (isOutOfStock) {
        msg = "Agotado";
    } else if (inCart) {
        msg = `En carrito (${quantity})`;
    }

    return (
        <button
            className={`btn btn-dark ${className}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? "Producto agotado" : `Añadir "${titulo}" al carrito`}
        >
            <span className="me-2">🛒</span>
            {showMsg ? msg : null}
        </button>
    );
}

export default AddToCartButton;