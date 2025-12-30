import React, { useState } from 'react';
import EmailField from '../../components/form/EmailField';
import PasswordField from '../../components/form/PasswordField';

export default function Login({ handleLoginSubmit, handleLoginChange, loginData }) {
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const validateForm = () => {
        const newErrors = {};

        if (!loginData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
            newErrors.email = 'Email inválido';
        }

        if (!loginData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (loginData.password.length < 6) {
            newErrors.password = 'Mínimo 6 caracteres';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            handleLoginSubmit(loginData);
        }
    };

    const handleRecoverPassword = (e) => {
        e.preventDefault();
        
        // Validar contraseña
        if (!newPassword) {
            setPasswordError('La contraseña es requerida');
            return;
        } else if (newPassword.length < 6) {
            setPasswordError('Mínimo 6 caracteres');
            return;
        }

        // Mostrar alerta de éxito
        alert('Contraseña recuperada exitosamente');
        
        // Cerrar modal y limpiar formulario
        handleCloseModal();
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setNewPassword('');
        setPasswordError('');
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <EmailField
                    value={loginData.email}
                    onChange={handleLoginChange}
                    error={errors.email}
                />

                <PasswordField
                    value={loginData.password}
                    onChange={handleLoginChange}
                    error={errors.password}
                    showToggle={true}
                />

                <button type="submit" className="btn btn-dark w-100 mt-3">
                    Iniciar sesión
                </button>

                <div className="text-center mt-3">
                    <button 
                        type="button" 
                        className="btn btn-link text-decoration-none p-0"
                        onClick={() => setShowModal(true)}
                    >
                        ¿Olvidaste tu contraseña?
                    </button>
                </div>
            </form>

            {/* Modal de recuperar contraseña */}
            {showModal && (
                <>
                    <div 
                        className="modal-backdrop fade show"
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1040 }}
                        onClick={handleCloseModal}
                    ></div>
                    <div 
                        className="modal fade show" 
                        style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1050 }} 
                        tabIndex="-1"
                        onClick={(e) => {
                            if (e.target === e.currentTarget) {
                                handleCloseModal();
                            }
                        }}
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Recuperar contraseña</h5>
                                    <button 
                                        type="button" 
                                        className="btn-close" 
                                        onClick={handleCloseModal}
                                        aria-label="Cerrar"
                                    ></button>
                                </div>
                                <form onSubmit={handleRecoverPassword}>
                                    <div className="modal-body">
                                        <PasswordField
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                setPasswordError('');
                                            }}
                                            error={passwordError}
                                            showToggle={true}
                                            label="Nueva contraseña"
                                            id="newPassword"
                                        />
                                    </div>
                                    <div className="modal-footer">
                                        <button 
                                            type="button" 
                                            className="btn btn-secondary" 
                                            onClick={handleCloseModal}
                                        >
                                            Cancelar
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="btn btn-dark"
                                        >
                                            Confirmar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}