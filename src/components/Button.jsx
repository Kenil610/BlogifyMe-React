import React from 'react';

function Button({
    children,
    type = 'button',
    className = "",
    ...props
}) {
  return (
    <button className={`btn ${className}`} {...props}>
        {children}
    </button>
  );
}

export default Button;
