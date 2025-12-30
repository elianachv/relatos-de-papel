import { useTranslation } from "react-i18next";
import AddToCartButton from "../../components/shared/AddToCartButton";
import imagen from '../../assets/images/error400-cover.png';

export default function CatalogItem({ data, onViewDetail }) {
    const { t } = useTranslation();
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
                <img src={url_caratula} alt={titulo} onError={(e) => {
                    e.target.src = imagen;
                }} />
            </div>
            <div className="catalog-item-body">
                <h5 className="catalog-item-title" title={titulo}>{titulo}</h5>
                {renderStars()}
                <div className="catalog-item-price">${precio_usd.toFixed(2)}</div>
                <div className="d-flex gap-2">
                    <button className="btn btn-info w-75 catalog-item-button" onClick={() => onViewDetail(data)}>
                        {t('catalog.viewDetail')}
                    </button>
                    <AddToCartButton
                        book={data}
                        className="w-25 catalog-item-button"
                        showMsg={false}
                    />
                </div>
            </div>
        </div>
    );
}