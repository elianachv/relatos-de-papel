import { useState } from 'react';
import OrderItem from './OrderItem';
import './orders.css';

export default function OrdersPage() {
    const [expandedOrderId, setExpandedOrderId] = useState(0);

    const orders = [
        {
            id: 0,
            orderNumber: '1234',
            status: 'warning',
            statusText: 'En Transito',
            date: 'Realizado el 10 Dic 2025',
            price: '100.00'
        },
        {
            id: 1,
            orderNumber: '4648',
            status: 'success',
            statusText: 'Entregado',
            date: 'Entregado hace 2 meses',
            price: '50'
        }
    ];

    const handleOrderClick = (orderId) => {
        setExpandedOrderId(orderId);
    };

    return (
        <div>
            <h4 className="mb-4">Mis Pedidos</h4>

            {orders.map((order) => (
                <div className='row mb-4' key={order.id}>
                    <OrderItem
                        orderNumber={order.orderNumber}
                        status={order.status}
                        statusText={order.statusText}
                        date={order.date}
                        price={order.price}
                        isExpanded={expandedOrderId === order.id}
                        onClick={() => handleOrderClick(order.id)}
                    />
                </div>
            ))}
        </div>
    );
}