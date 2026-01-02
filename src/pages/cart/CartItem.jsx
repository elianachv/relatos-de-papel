import { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import { FaRegTrashAlt } from "react-icons/fa";
import { askAlert } from '../../utilities/alerts';

export default function CartItem({
                                     itemId,
                                     itemName = "Libro 1",
                                     price = 20.00,
                                     initialQuantity = 1,
                                     image,
                                     onQuantityChange,
                                     onRemove
                                 }) {
    const { t } = useTranslation();
    const [quantity, setQuantity] = useState(initialQuantity);

    // Sincronizar cantidad cuando cambie desde el contexto
    useEffect(() => {
        setQuantity(initialQuantity);
    }, [initialQuantity]);

    const itemTotal = price * quantity;

    const handleIncrement = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (onQuantityChange) {
            onQuantityChange(itemId, newQuantity);
        }
    };

    const handleDecrement = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(itemId, newQuantity);
            }
        }
    };

    const confirmRemoveItem = () => {
         if (onRemove) {
                onRemove(itemId);
            }
    }

    const handleRemoveClick = () => {
       askAlert(
        t('cart.removeItemConfirm', { itemName }), 
        t('common.confirm'), 
        t('common.cancel'), 
        confirmRemoveItem
    )
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image">
                <img src={image} alt={itemName} />
            </div>
            <div className="cart-item-body">
                <div className="cart-item-header">
                    <h6 className="cart-item-title">{itemName}</h6>
                    <button
                        className="cart-item-remove-btn"
                        onClick={handleRemoveClick}
                        aria-label={t('cart.removeItem', { itemName })}
                    >
                        <FaRegTrashAlt />
                    </button>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                    <div className="cart-item-quantity">
                        <button
                            className="btn"
                            onClick={handleDecrement}
                            disabled={quantity <= 1}
                            aria-label={t('cart.decreaseQuantity')}
                        >
                            -
                        </button>
                        <span className="quantity-display">{quantity}</span>
                        <button
                            className="btn"
                            onClick={handleIncrement}
                            aria-label={t('cart.increaseQuantity')}
                        >
                            +
                        </button>
                    </div>

                    <div className="cart-item-prices">
                        <span className="cart-item-price-unit">${price.toFixed(2)} {t('cart.perUnit')}</span>
                        <span className="cart-item-price-total">${itemTotal.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}