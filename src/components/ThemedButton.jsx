import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemedButton = ({ children, onClick, variant = 'primary', className, ...props }) => {
    const { theme } = useTheme();

    const backgroundColor = variant === 'primary' ? theme.primaryColor : theme.backgroundColor;
    const textColor = variant === 'primary' ? 'white' : 'black';

    return (
        <button
            onClick={onClick}
            style={{
                backgroundColor,
                color: textColor,
            }}
            className={`px-4 py-2 rounded-md shadow transition duration-300 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default ThemedButton;
