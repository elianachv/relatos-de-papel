import { useState } from 'react';
import { useTranslation } from "react-i18next";
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import './cart.css';
import { AppRoutes } from '../../routes/appRoutes';
import { NavLink, useNavigate } from 'react-router-dom';
import { warningAlert } from '../../utilities/alerts';

export default function CartPage() {
    const { t } = useTranslation();
    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        getTotalItems,
        getSubtotal,
        getTotal,
        discount,
        couponCode,
        applyCoupon,
        removeCoupon
    } = useCart();
    const { isAuthenticated } = useAuth();
    const [coupon, setCoupon] = useState('');
    const navigate = useNavigate();

    const subtotal = getSubtotal();
    const total = getTotal();
    const totalItems = getTotalItems();
    const discountApplied = discount > 0;

    const handleQuantityChange = (titulo, newQuantity) => {
        updateQuantity(titulo, newQuantity);
    };

    const handleRemoveItem = (titulo) => {
        removeFromCart(titulo);
    };

    const handleApplyCoupon = () => {
        if (!coupon.trim()) return;

        const result = applyCoupon(coupon);
        if (!result.success) {
            warningAlert(result.message, '', false);
        }
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCoupon('');
    };

    const handleProceedToCheckout = () => {
        if (isAuthenticated) {
            navigate(AppRoutes.private.checkout);
        } else {
            navigate(AppRoutes.auth);
        }
    };
    return (
        <div className="container py-4">
            <h4 className="mb-4">{t('cart.title')} ({totalItems} {totalItems === 1 ? t('cart.item') : t('cart.items')})</h4>

            <div className="row">
                <div className="col-12 col-lg-8 mb-4 mb-lg-0">
                    <div className="cart-items-container">
                        {cartItems.length === 0 ? (
                            <div className="alert alert-info">
                                <i className="bi bi-cart-x me-2"></i>
                                {t('cart.empty')}
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <CartItem
                                    key={item.titulo}
                                    itemId={item.titulo}
                                    itemName={item.titulo}
                                    price={item.precio_usd}
                                    initialQuantity={item.quantity}
                                    image={item.url_caratula}
                                    onQuantityChange={handleQuantityChange}
                                    onRemove={handleRemoveItem}
                                />
                            ))
                        )}
                    </div>
                    <div className="preliminary-subtotal">
                        <div className="price-row">
                            <span className="text-muted">{t('cart.preliminarySubtotal')}</span>
                            <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="tax-notice">
                            <i className="bi bi-info-circle me-1"></i>
                            {t('cart.taxNotice')}
                        </p>
                    </div>
                </div>

                {/* Resumen */}
                <div className="col-12 col-lg-4">
                    <div className="cart-summary-card">
                        <h5 className="cart-summary-title">{t('cart.orderSummary')}</h5>


                        <div className="coupon-section">
                            <label className="coupon-label">{t('cart.discountCode')}</label>
                            {discountApplied ? (
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="text-success small">
                                        <i className="bi bi-check-circle me-1"></i>
                                        {t('cart.couponApplied')} {couponCode}
                                    </span>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={handleRemoveCoupon}
                                    >
                                        {t('cart.remove')}
                                    </button>
                                </div>
                            ) : (
                                <div className="coupon-input-group">
                                    <input
                                        type="text"
                                        className="coupon-input"
                                        placeholder={t('cart.enterCode')}
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button
                                        className="coupon-btn"
                                        onClick={handleApplyCoupon}
                                        disabled={!coupon.trim()}
                                    >
                                        {t('cart.apply')}
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="price-breakdown">
                            <div className="price-row">
                                <span>{t('cart.subtotal')}</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div className="price-row">
                                    <span className="discount-text">{t('cart.discount')}</span>
                                    <span className="discount-text">-${discount.toFixed(2)}</span>
                                </div>
                            )}
                            <div className="price-row shipping-text">
                                <span>{t('cart.shipping')}</span>
                                <span className="text-success">{t('cart.free')}</span>
                            </div>
                        </div>

                        <div className="total-section">
                            <span>{t('cart.total')}</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn" onClick={handleProceedToCheckout}>
                            {t('cart.proceedToPayment')}
                        </button>
                    </div>

                    <div className="continue-shopping">
                        <NavLink to={AppRoutes.home}>
                            {t('cart.continueShopping')}
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}