import React from 'react';

function InputField({
                        label,
                        type = 'text',
                        name,
                        value,
                        onChange,
                        required = false,
                        placeholder = '',
                        className = '',
                        error = null,
                        ...props
                    }) {
    return (
        <div className={`mb-3 ${className}`}>
            <label htmlFor={name} className="form-label">
                {label}
                {required && <span className="text-danger ms-1">*</span>}
            </label>

            <input
                id={name}
                type={type}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                required={required}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
            />

            {error && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
}

export default InputField;