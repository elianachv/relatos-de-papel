import CartItem from "./CartItem";
import './cart.css';
export default function CartPage() {
    return (
        <div>
            <h4>Tu Carrito (3 items)</h4>
            <div className="row">
                <div className="col-12 col-md-6">
                    <CartItem />
                    <CartItem />
                </div>
                <div className="card p-3 col-12 col-md-6">
                    <h5>Resumen del pedido</h5>
                    <label htmlFor="coupon" className="form-label fw-bold small">Código de descuento</label>
                    <div className="d-flex gap-2 mb-4">
                        <input type="text" className="form-control" id="coupon" placeholder="Ingrese su código de descuento" />
                        <button className="btn btn-dark">Aplicar</button>
                    </div>
                    <div className="border-top border-bottom py-2">
                        <div className="d-flex justify-content-between">
                            <span>Subtotal</span>
                            <span>$100.00</span>
                        </div>
                        <div className="d-flex justify-content-between text-success">
                            <span>Descuento</span>
                            <span>-$0.00</span>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between py-2 fs-5">
                        <span><b>Total</b></span>
                        <span><b>$100.00</b></span>
                    </div>
                    <button className="btn btn-dark w-100 mt-2">Proceder al pago</button>
                </div>
            </div>
        </div>
    )
}