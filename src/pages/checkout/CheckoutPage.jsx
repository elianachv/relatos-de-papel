import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { FaCreditCard, FaPaypal } from "react-icons/fa";
import { useCart } from '../../context/CartContext';
import { AppRoutes } from '../../routes/appRoutes';
import InputField from '../../components/form/InputField';
import './checkout.css';

export default function CheckoutPage() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { processOrder } = useCart();
    

    const [formData, setFormData] = useState({
        address: '',
        payment: 'card'
    });
    
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        
        processOrder(formData);
        
        // Navegar a la página de pedidos
        navigate(AppRoutes.private.orders);
    };

    return (
        <div className="card p-3">
            <h5>{t('checkout.title')}</h5>
            <InputField label={t('checkout.shippingAddress')} name="address" value={formData.address} onChange={handleChange} />
            <h5>{t('checkout.paymentMethod')}</h5>
            <label className={`payment-option d-flex align-items-center mb-3 ${formData.payment === 'card' ? 'active' : ''}`}>
                <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={formData.payment === 'card'}
                    onChange={handleChange}
                />
                <span className="me-2"><FaCreditCard /></span>
                    <strong>{t('checkout.creditDebitCard')}</strong>
            </label>

            <label className={`payment-option d-flex align-items-center ${formData.payment === 'paypal' ? 'active' : ''}`}>
                <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={formData.payment === 'paypal'}
                    onChange={handleChange}
                />
                <span className="me-2"><FaPaypal /></span>
                <strong>{t('checkout.paypal')}</strong>
            </label>

            <button className="btn btn-dark w-100 mt-2" onClick={handleSubmit}>{t('checkout.confirmAndPay')}</button>
        </div>
    );
}