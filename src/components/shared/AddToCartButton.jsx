// components/AddToCartButton.jsx
import React from 'react';

function AddToCartButton({ book, className = '' }) {
    const { stock, titulo, precio_usd } = book;

    const handleAddToCart = () => {
        // Aquí iría la lógica para añadir al carrito
        console.log(`Añadiendo "${titulo}" al carrito por $${precio_usd}`);

        // Ejemplo básico:
        // 1. Obtener carrito actual del localStorage o estado global
        // 2. Agregar el libro
        // 3. Actualizar estado/context/redux
        // 4. Mostrar notificación
    };

    const isOutOfStock = stock <= 0;

    return (
        <button
            className={`btn btn-dark ${className}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            title={isOutOfStock ? "Producto agotado" : `Añadir "${titulo}" al carrito`}
        >
            <span className="me-2">🛒</span>
            {isOutOfStock ? "Agotado" : "Añadir al carrito"}
        </button>
    );
}

export default AddToCartButton;