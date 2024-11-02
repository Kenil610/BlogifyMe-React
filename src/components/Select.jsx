import React, { useId } from 'react';

function Select({
    options,
    label,
    className = "",
    ...props
}, ref) {
    const id = useId();
    return (
        <div className="select-container">
            {label && <label htmlFor={id} className="select-label">{label}</label>}
            <select {...props} className={`select ${className}`} ref={ref} id={id}>
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default React.forwardRef(Select)