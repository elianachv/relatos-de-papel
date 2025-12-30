import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';
import { AppRoutes } from '../../routes/appRoutes';
import Login from './Login';
import Register from './Register';

export default function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        terms: false
    });

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, type, value, checked } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleLoginSubmit = (e) => {
        login(loginData);
        navigate(AppRoutes.home);

    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();

        if (registerData.password !== registerData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        if (!registerData.terms) {
            alert('Debes aceptar los términos');
            return;
        }

        login(registerData);
        navigate(AppRoutes.home);
    };

    return (
        <div className="container mt-5" style={{ maxWidth: 420 }}>
            <div className="card shadow-sm">
                <div className="card-body">

                    {/* Tabs */}
                    <ul className="nav nav-tabs mb-3" role="tablist">
                        <li className="nav-item">
                            <button
                                className="nav-link active"
                                data-bs-toggle="tab"
                                data-bs-target="#login"
                                type="button"
                            >
                                Iniciar sesión
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#register"
                                type="button"
                            >
                                Registrarse
                            </button>
                        </li>
                    </ul>

                    {/* Content */}
                    <div className="tab-content">

                        {/* LOGIN */}
                        <div className="tab-pane fade show active" id="login">
                            <Login handleLoginSubmit={handleLoginSubmit} handleLoginChange={handleLoginChange} loginData={loginData} />
                        </div>

                        {/* REGISTER */}
                        <div className="tab-pane fade" id="register">
                            <Register handleRegisterSubmit={handleRegisterSubmit} handleRegisterChange={handleRegisterChange} registerData={registerData} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
