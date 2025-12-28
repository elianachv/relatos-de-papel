import { FaRegTrashAlt } from "react-icons/fa";
import imagen from '../../assets/images/user.png';
export default function CartItem() {
    return (
        <div className="d-flex gap-2 border-bottom mb-2">
            <div className="cart-item-image">
                <img className="img-fluid object-fit-cover" src={imagen} alt="Libro 1" />
            </div>
            <div className="cart-item-body">
                <div className="d-flex justify-content-between align-items-center mb-2 p-2">
                    <h6 className="m-0">Libro 1</h6>
                    <button className="btn btn-sm"><FaRegTrashAlt color="red"/></button>
                </div>
                <div className="d-flex justify-content-between p-2 align-items-center">
                    <div className="cart-item-quantity">
                        <span>-</span>
                        <span>1</span>
                        <span>+</span>
                    </div>
                    <span>$20.00</span>
                </div>

            </div>
        </div>
    )
}