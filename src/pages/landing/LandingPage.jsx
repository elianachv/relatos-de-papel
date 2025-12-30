import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppRoutes } from '../../routes/appRoutes';
import './LandingPage.css';

export default function LandingPage() {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        // Contador regresivo
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

        // Redirección automática de respaldo
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

    return (
        <div className="landing-container">
            <div className="landing-content">

                {/* Header con Logo */}
                <header className="landing-header">
                    <div className="logo-section">
                        <div className="logo-icon">📚</div>
                        <div className="logo-text">
                            <h1 className="app-title">Relatos de Papel</h1>
                            <p className="app-tagline">Tu librería digital de confianza</p>
                        </div>
                    </div>
                </header>

                {/* Contenido Principal */}
                <main className="landing-main">
                    {/* Sección Hero */}
                    <section className="hero-section">
                        <div className="hero-content">
                            <h2 className="hero-title">Descubre mundos infinitos entre páginas</h2>
                            <p className="hero-description">
                                Accede a una amplia colección de libros digitales, desde best-sellers
                                hasta joyas literarias ocultas. Tu próxima gran lectura te espera.
                            </p>
                        </div>
                    </section>

                    {/* Mini Catálogo de Vista Previa */}
                    <section className="preview-section">
                        <h3 className="preview-title">Algunos de nuestros destacados</h3>
                        <div className="book-preview-grid">
                            <div className="preview-book">
                                <div className="preview-book-cover" style={{backgroundColor: '#2c3e50'}}>
                                    <span className="preview-book-title">Clean Code</span>
                                </div>
                                <div className="preview-book-info">
                                    <div className="preview-book-rating">★★★★☆ 4.7</div>
                                    <div className="preview-book-price">$37.99</div>
                                </div>
                            </div>

                            <div className="preview-book">
                                <div className="preview-book-cover" style={{backgroundColor: '#3498db'}}>
                                    <span className="preview-book-title">Pragmatic Programmer</span>
                                </div>
                                <div className="preview-book-info">
                                    <div className="preview-book-rating">★★★★☆ 4.8</div>
                                    <div className="preview-book-price">$45.00</div>
                                </div>
                            </div>

                            <div className="preview-book">
                                <div className="preview-book-cover" style={{backgroundColor: '#e74c3c'}}>
                                    <span className="preview-book-title">Algorithms</span>
                                </div>
                                <div className="preview-book-info">
                                    <div className="preview-book-rating">★★★★☆ 4.5</div>
                                    <div className="preview-book-price">$94.99</div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Features */}
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
                                <div className="feature-icon">🎧</div>
                                <div className="feature-content">
                                    <h3>Lectura Inmersiva</h3>
                                    <p>Optimizado para todas las pantallas</p>
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

                {/* Footer con Countdown */}
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
                            © 2024 Relatos de Papel. Todos los derechos reservados.
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}