import { useLocation } from "react-router-dom";

export default function CatalogItemDetail() {
    const { book } = useLocation().state;
    if (!book) {
        return <Navigate to="/" />;
    }
    const { url_caratula, titulo, descripcion, precio_usd, autor, stock } = book;
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
    return (
        <div className="container-detail">

            <div className="container-detail-image">
                <img src={url_caratula} alt={titulo} />
            </div>
            <div className="container-detail-content">
                <h1>{titulo}</h1>
                <p className="text-muted small">{autor}</p>
                <p>{descripcion}</p>
                <div className="d-flex align-items-center gap-2 mb-2">
                    <p className="fs-5 fw-bold m-0">${precio_usd}</p>
                    {renderStock()}
                </div>
                <button className="btn btn-dark mb-2">
                    <span className="me-2">🛒</span>
                    Añadir al carrito
                </button>
                <div className="alert alert-info" role="alert">
                    <p className="m-0"><b>Entrega Digital:</b> Recibe el acceso instantáneo tras la compra.</p>
                </div>
            </div>
        </div>
    );
}