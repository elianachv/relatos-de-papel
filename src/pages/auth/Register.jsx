import { useState } from 'react';
import { useTranslation } from "react-i18next";
import EmailField from '../../components/form/EmailField.jsx';
import PasswordField from '../../components/form/PasswordField.jsx';
import CheckboxField from '../../components/form/CheckboxField.jsx';

export default function Register({ handleRegisterSubmit, handleRegisterChange, registerData }) {
    const { t } = useTranslation();
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        if (!registerData.email) {
            newErrors.email = t('validation.emailRequired');
        } else if (!/\S+@\S+\.\S+/.test(registerData.email)) {
            newErrors.email = t('validation.emailInvalid');
        }

        if (!registerData.password) {
            newErrors.password = t('validation.passwordRequired');
        } else if (registerData.password.length < 6) {
            newErrors.password = t('validation.passwordMinLength');
        }

        setErrors(newErrors);
        console.log("Errores", newErrors)
        return Object.keys(newErrors).length === 0;
    };       

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            handleRegisterSubmit(registerData);
        }
    };           

    return (
        <form onSubmit={handleSubmit}>
            <EmailField
                value={registerData.email}
                onChange={handleRegisterChange}
                error={errors.email}
                label={t('auth.email')}
                placeholder={t('auth.emailPlaceholder')}
            />

            <PasswordField
                value={registerData.password}
                onChange={handleRegisterChange}
                error={errors.password}
                label={t('auth.password')}
                showToggle={true}
                placeholder=""
            />

            <PasswordField
                value={registerData.confirmPassword}
                onChange={handleRegisterChange}
                error={errors.confirmPassword}
                label={t('auth.confirmPassword')}
                name="confirmPassword"
                id="confirmPassword"
                placeholder=""
                showToggle={true}
            />

            <CheckboxField
                name="terms"
                id="terms"
                checked={registerData.terms || false}
                onChange={handleRegisterChange}
                label={t('auth.acceptTerms')}
                error={errors.terms}
                required={true}
            />

            <button type="submit" className="btn btn-dark w-100 mt-4">
                {t('auth.register')}
            </button>
        </form>
    );
}