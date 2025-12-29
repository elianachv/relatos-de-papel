import { MdOutlineLocalShipping } from "react-icons/md";
import { FaTimes, FaExclamationTriangle } from "react-icons/fa";
import imagen from '../../assets/images/error400-cover.png';
import './orders.css';

export default function OrderItem({
                                      orderNumber,
                                      status, // 'success', 'warning', etc.
                                      statusText,
                                      date,
                                      price,
                                      images = [],
                                      isExpanded,
                                      onClick
                                  }) {
    // Determinar si el pedido está entregado (success)
    const isDelivered = status === 'success';
    // Determinar si el pedido está en tránsito
    const isInTransit = status === 'warning';
    // Determinar si el pedido está cancelado
    const isCancelled = status === 'canceled';

    return (
        <div 
            className={`card p-3 col-12 ${!isExpanded ? 'order-card' : ''}`}
            style={{ cursor: 'pointer' }}
            onClick={onClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onClick();
                }
            }}
            aria-expanded={isExpanded}
        >
            <div className="d-flex justify-content-between mb-2">
                <h5 className="m-0">Pedido #{orderNumber}</h5>
                <span className={`badge text-bg-${status}`}>{statusText}</span>
            </div>
            <div className="d-flex justify-content-between">
                <span className="text-muted small">{date}</span>
                {price && <span><b>${price}</b></span>}
            </div>
            
            <div className={`order-content ${isExpanded ? 'order-content-expanded' : 'order-content-collapsed'}`}>
                <div className="border-top border-bottom py-3">
                    {images.length > 0 ? (
                        images.map((img, index) => (
                            <img 
                                key={index} 
                                src={img} 
                                alt={`Libro ${index + 1}`} 
                                className="order-image" 
                            />
                        ))
                    ) : (
                        <>
                            <img src={imagen} alt="Libro 1" className="order-image" />
                            <img src={imagen} alt="Libro 2" className="order-image" />
                        </>
                    )}
                </div>
                <div className="d-flex flex-column flex-md-row py-2 gap-2">
                    <button 
                        className='btn btn-outline-dark order-button-responsive'
                        onClick={(e) => e.stopPropagation()}
                        disabled={!isInTransit} // Solo habilitado si está en tránsito
                        title={isInTransit ? "Rastrear envío" : "No disponible para pedidos entregados"}
                    >
                        <MdOutlineLocalShipping /> Rastrear Envío
                    </button>
                    <button 
                        className='btn btn-outline-danger order-button-responsive'
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isDelivered && !isCancelled) {
                                // Lógica para cancelar pedido
                                console.log(`Cancelando pedido #${orderNumber}`);
                            }
                        }}
                        disabled={isDelivered || isCancelled} // Deshabilitado si está entregado o cancelado
                        title={isDelivered
                            ? "No se puede cancelar un pedido entregado"
                            : isCancelled
                                ? "Pedido ya cancelado"
                                : "Cancelar pedido"
                        }
                    >
                        <FaTimes /> Cancelar Pedido
                        {isDelivered && <span className="visually-hidden"> (No disponible para pedidos entregados)</span>}
                    </button>
                    <button 
                        className='btn btn-outline-warning order-button-responsive'
                        onClick={(e) => e.stopPropagation()}
                        disabled={isCancelled} // Deshabilitado si está cancelado
                        title={isCancelled ? "No disponible para pedidos cancelados" : "Reportar un problema"}
                    >
                        <FaExclamationTriangle /> Reportar un problema
                    </button>
                </div>
            </div>
        </div>
    );
}