import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="input-container">
            {label && <label htmlFor={id}>{label}</label>}
            <input type={type} className={`input ${className}`} ref={ref} {...props} id={id} />
        </div>
    );
});

export default Input;
