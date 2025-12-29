import React from 'react';
import EmailField from '../../components/form/EmailField.jsx';
import PasswordField from '../../components/form/PasswordField.jsx';
import CheckboxField from '../../components/form/CheckboxField.jsx';

export default function Register({
                                     handleRegisterSubmit,
                                     handleRegisterChange,
                                     registerData,
                                     errors = {}  // ← Agregar errors como prop
                                 }) {
    return (
        <form onSubmit={handleRegisterSubmit}>
            {/* Campo de Email */}
            <EmailField
                value={registerData.email}
                onChange={handleRegisterChange}
                error={errors.email}
                label="Email"
                placeholder="tu@email.com"
            />

            {/* Campo de Password */}
            <PasswordField
                value={registerData.password}
                onChange={handleRegisterChange}
                error={errors.password}
                label="Contraseña"
                showToggle={true}
                placeholder=""
            />

            {/* Campo de Confirmar Password */}
            <PasswordField
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                error={errors.confirmPassword}
                label="Confirmar Contraseña"
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
                showToggle={true}
            />

            {/* Checkbox de Términos y Condiciones */}
            <CheckboxField
                name="terms"
                id="terms"
                checked={registerData.terms || false}
                onChange={handleRegisterChange}
                label="Acepto los términos y condiciones"
                error={errors.terms}
                required={true}
            />

            <button type="submit" className="btn btn-dark w-100 mt-4">
                Registrarse
            </button>
        </form>
    );
}