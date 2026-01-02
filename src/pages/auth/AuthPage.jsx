import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from '../../context/AuthContext';
import { AppRoutes } from '../../routes/appRoutes';
import Login from './Login';
import Register from './Register';
import { errorAlert, warningAlert } from '../../utilities/alerts';

export default function AuthPage() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const { t } = useTranslation();

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

    const handleLoginSubmit = () => {
        login(loginData);
        navigate(AppRoutes.home);

    };

    const handleRegisterSubmit = () => {

        if (registerData.password !== registerData.confirmPassword) {
            errorAlert(t('alert.checkAuthData'),t('validation.passwordsDoNotMatch'));
            return;
        }

        if (!registerData.terms) {
            warningAlert(t('validation.mustAcceptTerms'), '', false);
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
                                {t('auth.login')}
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className="nav-link"
                                data-bs-toggle="tab"
                                data-bs-target="#register"
                                type="button"
                            >
                                {t('auth.register')}
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
