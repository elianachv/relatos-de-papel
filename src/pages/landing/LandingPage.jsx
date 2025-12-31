import {useEffect, useMemo, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/appRoutes';
import './LandingPage.css';
import catalog_list from "../../utilities/catalog_list.json";
import CatalogItem from '../catalog/CatalogItem.jsx';

export default function LandingPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {

        const countdownInterval = setInterval(() => {
            setCountdown(prev => {
                if (prev <= 1) {
                    clearInterval(countdownInterval);
                    navigate(AppRoutes.home);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        const redirectTimer = setTimeout(() => {
            navigate(AppRoutes.home);
        }, 5000);

        return () => {
            clearInterval(countdownInterval);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    const handleSkip = () => {
        navigate(AppRoutes.home);
    };

    const Items = useMemo(() => {
        return catalog_list.pages.flatMap(page => page.items).slice(0, 3);
    }, []);

    return (
        <div className="landing-container">
            <div className="landing-content">

                <header className="landing-header">
                    <div className="logo-section">
                        <div className="logo-icon">📚</div>
                        <div className="logo-text">
                            <h1 className="app-title">Relatos de Papel</h1>
                            <p className="app-tagline">Tu librería digital de confianza</p>
                        </div>
                    </div>
                </header>

                <main className="landing-main">
                    <section className="hero-section">
                        <div className="hero-content">
                            <h2 className="hero-title">Descubre mundos infinitos entre páginas</h2>
                            <p className="hero-description">
                                Accede a una amplia colección de libros digitales, desde best-sellers
                                hasta joyas literarias ocultas. Tu próxima gran lectura te espera.
                            </p>
                        </div>
                    </section>

                    <section className="preview-section landing-books-section">
                        <h3 className="preview-title">Libros más populares este mes</h3>
                        <div className="book-preview-grid landing-book-grid">
                            {Items.slice(0, 4).map((book, index) => {
                                const colors = ['#75704e', '#3c513b', '#934e43'];
                                const currentColor = colors[index];
                                return (
                                    <div
                                        key={`featured-${index}`}
                                        className={`landing-book-card landing-book-${index}`}
                                        style={{ '--card-color': currentColor }}
                                    >
                                        <CatalogItem
                                            data={book}
                                            onViewDetail={() => {
                                                navigate(AppRoutes.bookDetail.replace(":id", book.titulo), {
                                                    replace: true,
                                                    state: { book }
                                                });
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="features-section">
                        <div className="features-grid">
                            <div className="feature-card">
                                <div className="feature-icon">📚</div>
                                <div className="feature-content">
                                    <h3>Catálogo Exclusivo</h3>
                                    <p>+10,000 libros seleccionados por expertos</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">⚡</div>
                                <div className="feature-content">
                                    <h3>Acceso Instantáneo</h3>
                                    <p>Descarga inmediata tras tu compra</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">📦</div>
                                <div className="feature-content">
                                    <h3>Envío Seguro Garantizado</h3>
                                    <p>Protección total de tu pedido desde nuestro almacén hasta tu puerta</p>
                                </div>
                            </div>

                            <div className="feature-card">
                                <div className="feature-icon">🔒</div>
                                <div className="feature-content">
                                    <h3>Compra Segura</h3>
                                    <p>Protección SSL y garantía de devolución</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer className="landing-footer">
                    <div className="countdown-container">
                        <div className="countdown-display">
                            <div className="countdown-visual">
                                <div className="countdown-circle">
                                    <span className="countdown-number">{countdown}</span>
                                </div>
                                <div className="countdown-text">
                                    <p className="countdown-message">
                                        Redirigiendo automáticamente en <span className="countdown-highlight">{countdown}</span> segundos
                                    </p>
                                    <p className="countdown-subtext">
                                        O entra manualmente ahora
                                    </p>
                                </div>
                            </div>

                            <div className="action-buttons">
                                <button
                                    className="primary-action-button"
                                    onClick={handleSkip}
                                    aria-label="Explorar catálogo completo"
                                >
                                    <span>Explorar Catálogo Completo</span>
                                    <span className="button-icon">→</span>
                                </button>

                                <button
                                    className="secondary-action-button"
                                    onClick={() => navigate(`${AppRoutes.auth}`)}
                                    aria-label="Iniciar sesión en Relatos de Papel"
                                >
                                    Iniciar Sesión
                                </button>
                            </div>

                            <p className="hint-text">
                                Serás redirigido automáticamente a la página principal
                            </p>
                        </div>
                    </div>

                    <div className="landing-footer-bottom">
                        <p className="copyright-text">
                            © 2026 Relatos de Papel. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}