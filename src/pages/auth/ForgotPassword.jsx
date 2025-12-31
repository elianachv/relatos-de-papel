import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EmailField from "../../components/form/EmailField";

export default function ForgotPassword({ onClose }) {
    const { t } = useTranslation();

    const [data, setData] = useState({ email: "" });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!data.email) {
            newErrors.email = t("validation.emailRequired") || "El email es obligatorio.";
        } else if (!/\S+@\S+\.\S+/.test(data.email)) {
            newErrors.email = t("validation.emailInvalid") || "Introduce un email válido.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        // MPV sin backend: simulación de envío
        alert(
            t("auth.recoveryEmailSent") ||
            "Te hemos enviado un correo con instrucciones para recuperar tu contraseña."
        );

        if (onClose) onClose();
    };

    return (
        <div>
            <h5 className="mb-3">
                {t("auth.forgotPassword") || "Recuperar contraseña"}
            </h5>

            <form onSubmit={handleSubmit}>
                <EmailField
                    name="email"
                    id="email"
                    value={data.email}
                    onChange={handleChange}
                    error={errors.email}
                    label={t("auth.email") || "Email"}
                    placeholder={t("auth.emailPlaceholder") || "tuemail@dominio.com"}
                />

                <button type="submit" className="btn btn-dark w-100 mt-3">
                    {t("auth.sendRecoveryEmail") || "Enviar instrucciones"}
                </button>

                <div className="text-center mt-3">
                    <button
                        type="button"
                        className="btn btn-link text-decoration-none p-0"
                        onClick={onClose}
                    >
                        {t("common.close") || "Cerrar"}
                    </button>
                </div>
            </form>
        </div>
    );
}
