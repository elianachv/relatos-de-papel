import { useState } from 'react';
import CartItem from './CartItem';
import { useCart } from '../../context/CartContext';
import './cart.css';
import { AppRoutes } from '../../routes/appRoutes';
import { NavLink } from 'react-router-dom';

export default function CartPage() {
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

    const [coupon, setCoupon] = useState('');


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
            alert(result.message);
        }
    };

    const handleRemoveCoupon = () => {
        removeCoupon();
        setCoupon('');
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
                            <span className="text-muted">Subtotal preliminar:</span>
                            <span className="fw-semibold">${subtotal.toFixed(2)}</span>
                        </div>
                        <p className="tax-notice">
                            <i className="bi bi-info-circle me-1"></i>
                            Los impuestos y gastos de envío se calcularán en el checkout
                        </p>
                    </div>
                </div>

                {/* Resumen */}
                <div className="col-12 col-lg-4">
                    <div className="cart-summary-card">
                        <h5 className="cart-summary-title">Resumen del pedido</h5>


                        <div className="coupon-section">
                            <label className="coupon-label">Código de descuento</label>
                            {discountApplied ? (
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <span className="text-success small">
                                        <i className="bi bi-check-circle me-1"></i>
                                        Cupón aplicado: {couponCode}
                                    </span>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={handleRemoveCoupon}
                                    >
                                        Remover
                                    </button>
                                </div>
                            ) : (
                                <div className="coupon-input-group">
                                    <input
                                        type="text"
                                        className="coupon-input"
                                        placeholder="Ingrese su código"
                                        value={coupon}
                                        onChange={(e) => setCoupon(e.target.value)}
                                    />
                                    <button
                                        className="coupon-btn"
                                        onClick={handleApplyCoupon}
                                        disabled={!coupon.trim()}
                                    >
                                        Aplicar
                                    </button>
                                </div>
                            )}
                        </div>

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

                        <div className="total-section">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>

                        <button className="checkout-btn">
                            Proceder al pago
                        </button>
                    </div>

                    <div className="continue-shopping">
                        <NavLink to={AppRoutes.home}>
                            Continuar comprando
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}