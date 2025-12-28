import './checkout.css';
import { FaCreditCard, FaPaypal } from "react-icons/fa";

export default function CheckoutPage() {
    return (
        <div className="card p-3">
            <h5>Finalizar compra</h5>
            <label htmlFor="address" className="form-label fw-bold small">Dirección de envío</label>
            <input type="text" className="form-control mb-4" id="address" placeholder="Ingrese su dirección de envío" />

            <h5>Metodo de pago</h5>
            <label className="payment-option active d-flex align-items-center mb-3">
                <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked
                />
                <span className="me-2"><FaCreditCard /></span>
                    <strong>Tarjeta de Crédito / Débito</strong>
            </label>

            <label className="payment-option d-flex align-items-center">
                <input
                    type="radio"
                    name="payment"
                    value="paypal"
                />
                <span className="me-2"><FaPaypal /></span>
                <strong>PayPal</strong>
            </label>

            <button className="btn btn-dark w-100 mt-2">Confirmar y pagar</button>
        </div>
    );
}