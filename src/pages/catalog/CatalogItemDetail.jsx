import { useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import AddToCartButton from '../../components/shared/AddToCartButton'
import { useReviews } from '../../context/ReviewsContext';
import imagen from '../../assets/images/error400-cover.png';
import { formatDate } from "../../utilities/utils";

export default function CatalogItemDetail() {
    const { book } = useLocation().state;
    const { getReviews, addReview, canUserPostReview, isAuthenticated } = useReviews();
    const [reviewText, setReviewText] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    if (!book) {
        return <Navigate to="/" />;
    }
    const { url_caratula, titulo, descripcion, precio_usd, autor, stock } = book;

    const canPost = canUserPostReview(titulo);
    const reviews = getReviews(titulo);
    const renderStock = () => {
        if (stock > 0) {
            return (<p className="m-0 text-success small">
                <span className="in-stock"></span>
                En stock: {stock}
            </p>)
        } else {
            return (<p className="m-0 text-danger small">
                <span className="sold-out"></span>
                Agotado
            </p>)
        }
    }

    const handleSubmitReview = () => {
        setError("");
        setSuccess("");
        
        try {
            addReview(titulo, reviewText);
            setReviewText("");
            setSuccess("Reseña publicada exitosamente");
            // Limpiar mensaje de éxito después de 3 segundos
            setTimeout(() => setSuccess(""), 3000);
        } catch (err) {
            setError(err.message);
            // Limpiar mensaje de error después de 5 segundos
            setTimeout(() => setError(""), 5000);
        }
    }


    return (
        <div className="container-detail">
            <div className="container-detail-image">
                <img src={url_caratula} alt={titulo} onError={(e) => {
                    e.target.src = imagen;
                }} />
            </div>
            <div className="container-detail-content">
                <h1>{titulo}</h1>
                <p className="text-muted small">{autor}</p>
                <p>{descripcion}</p>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <p className="fs-5 fw-bold m-0">${precio_usd}</p>
                    {renderStock()}
                </div>
                <AddToCartButton
                    book={book}
                    className="mb-2"
                />
                <div className="alert alert-info" role="alert">
                    <p className="m-0"><b>Entrega Digital:</b> Recibe el acceso instantáneo tras la compra.</p>
                </div>
            </div>
            <div className="separator"></div>
            <div className="container-detail-reviews">
                <h4>Reseñas de la comunidad ⭐</h4>
                
                {canPost && (
                    <div className="bg-body-tertiary p-4 rounded border mb-4">
                        <h6>Escribir una reseña</h6>
                        {error && (
                            <div className="alert alert-danger mt-2 mb-2" role="alert">
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className="alert alert-success mt-2 mb-2" role="alert">
                                {success}
                            </div>
                        )}
                        <textarea 
                            className="form-control mt-2 mb-2" 
                            placeholder="Escribe tu reseña aquí"
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                            rows="4"
                        ></textarea>
                        <button 
                            className="btn btn-outline-dark"
                            onClick={handleSubmitReview}
                            disabled={!reviewText.trim()}
                        >
                            Publicar reseña
                        </button>
                    </div>
                )}

                {!canPost && (
                    <div className="alert alert-info mb-4" role="alert">
                        {isAuthenticated ? 
                            "Debes haber comprado este libro para publicar una reseña" :
                            "Debes iniciar sesión y haber comprado este libro para publicar una reseña"
                        }
                    </div>
                )}

                {reviews.length === 0 ? (
                    <p className="text-muted">Aún no hay reseñas para este libro. ¡Sé el primero en opinar!</p>
                ) : (
                    <div className="d-flex flex-column gap-3">
                        {reviews.map((review) => (
                            <div key={review.id} className="d-flex gap-2">
                                <div className="bg-body-secondary p-3 rounded-circle border d-flex align-items-center justify-content-center" 
                                     style={{width: '40px', height: '40px', flexShrink: 0}}>
                                    <span style={{fontSize: '0.875rem', fontWeight: 'bold'}}>
                                        {review.userName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="flex-grow-1">
                                    <h6 className="mb-1">
                                        {review.userName} 
                                        <span className="text-muted" style={{fontSize: '0.75rem', fontWeight: 'normal'}}>
                                            {' • '}{formatDate(review.date)}
                                        </span>
                                    </h6>
                                    <p className="mb-0">{review.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}