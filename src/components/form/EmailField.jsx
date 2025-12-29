// components/form/EmailField.jsx
import React from 'react';
import InputField from './InputField';

function EmailField({ value, onChange, error = null, ...props }) {
    return (
        <InputField
            label="Email"
            type="email"
            name="email"
            value={value}
            onChange={onChange}
            required
            placeholder="tu@email.com"
            error={error}
            {...props}
        />
    );
}

export default EmailField;