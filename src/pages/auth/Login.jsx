// pages/auth/Login.jsx
import React, { useState } from 'react';
import EmailField from '../../components/form/EmailField';
import PasswordField from '../../components/form/PasswordField';

export default function Login({ handleLoginSubmit, loginData: initialData }) {
    const [loginData, setLoginData] = useState(initialData || { email: '', password: '' });
    const [errors, setErrors] = useState({});  // ← Estado local para errores

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData(prev => ({ ...prev, [name]: value }));

        // Limpiar error cuando el usuario escribe
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };

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
            // Llamar a la función que viene por props
            handleLoginSubmit(loginData);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <EmailField
                value={loginData.email}
                onChange={handleChange}
                error={errors.email}
            />

            <PasswordField
                value={loginData.password}
                onChange={handleChange}
                error={errors.password}
                showToggle={true}
            />

            <button type="submit" className="btn btn-dark w-100 mt-3">
                Iniciar sesión
            </button>
        </form>
    );
}