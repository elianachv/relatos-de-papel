import React from 'react';
import './forms.css'; // O donde tengas tu forms.css

function CheckboxField({
                           name,
                           id,
                           checked,
                           onChange,
                           label,
                           error = null,
                           required = false,
                           className = '',
                           disabled = false,
                           ...props
                       }) {
    return (
        <div className={`checkbox-field-container ${className}`}>
            <div className="form-check">
                <input
                    className={`form-check-input ${error ? 'is-invalid' : ''}`}
                    type="checkbox"
                    name={name}
                    id={id}
                    checked={checked}
                    onChange={onChange}
                    required={required}
                    disabled={disabled}
                    {...props}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                    {required && <span className="text-danger ms-1">*</span>}
                </label>
            </div>
            {error && (
                <div className="invalid-feedback d-block">
                    {error}
                </div>
            )}
        </div>
    );
}

export default CheckboxField;