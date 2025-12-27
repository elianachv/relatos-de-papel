export default function CatalogItem({ data, onViewDetail }) {
    const { url_caratula, titulo, calificacion = 0, precio_usd = 0 } = data;
    // Renderizar estrellas de calificación
    const renderStars = () => {
        const fullStars = Math.floor(calificacion);
        const hasHalfStar = calificacion % 1 >= 0.5;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <div className="catalog-item-rating">
                {Array.from({ length: fullStars }).map((_, i) => (
                    <span key={`full-${i}`} className="star">★</span>
                ))}
                {hasHalfStar && <span className="star">☆</span>}
                {Array.from({ length: emptyStars }).map((_, i) => (
                    <span key={`empty-${i}`} className="star empty">☆</span>
                ))}
                <span className="rating-value">({calificacion.toFixed(1)})</span>
            </div>
        );
    };

    return (
        <div className="catalog-item">
            <div className="catalog-item-image">
                <img src={url_caratula} alt={titulo} />
            </div>
            <div className="catalog-item-body">
                <h5 className="catalog-item-title" title={titulo}>{titulo}</h5>
                {renderStars()}
                <div className="catalog-item-price">${precio_usd.toFixed(2)}</div>
                <div className="d-flex gap-2">
                    <button className="btn btn-info w-50 catalog-item-button" onClick={() => onViewDetail(data)}>
                        Ver detalle
                    </button>
                    <button className="btn btn-dark w-50 catalog-item-button">
                        🛒
                    </button>
                </div>
            </div>
        </div>
    );
}