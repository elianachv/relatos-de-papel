import React from 'react';
import { useTranslation } from "react-i18next";
import { useCart } from '../../context/CartContext';

function AddToCartButton({ book, className = '', showMsg = true }) {
    const { t } = useTranslation();
    const { stock, titulo, precio_usd } = book;
    const { addToCart, isInCart, getItemQuantity } = useCart();

    const handleAddToCart = () => {
        addToCart(book);
    };

    const isOutOfStock = stock <= 0;
    const inCart = isInCart(titulo);
    const quantity = getItemQuantity(titulo);
    
    let msg = t('catalog.addToCart');
    if (isOutOfStock) {
        msg = t('catalog.outOfStock');
    } else if (inCart) {
        msg = `${t('catalog.inCart')} (${quantity})`;
    }

    return (
        <button
            className={`btn btn-dark ${className}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? t('catalog.productOutOfStock') : t('catalog.addToCartTitle', { title: titulo })}
        >
            <span className="me-2">🛒</span>
            {showMsg ? msg : null}
        </button>
    );
}

export default AddToCartButton;