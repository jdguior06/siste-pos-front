import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Definir temas predefinidos
    const themes = {
        light: {
            name: "light",
            primaryColor: '#1677FF',
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
            borderRadius: 4,
            fixed: false, // Permite personalización
        },
        dark: {
            name: "dark",
            primaryColor:  '#121212', // Gris oscuro para contenido
            backgroundColor: '#2E2E2E', // Negro intenso para fondo
            textColor: '#FFFFFF', // Texto blanco
            borderRadius: 4,
            fixed: true, // Tema fijo, no ajustable
        },
        document: {
            name: "document",
            primaryColor: '#4CAF50',
            backgroundColor: '#F3F4F6',
            textColor: '#000000',
            borderRadius: 4,
            fixed: false,
        },
        blossom: {
            name: "blossom",
            primaryColor: '#ED4192',
            backgroundColor: '#FFE4E6',
            textColor: '#000000',
            borderRadius: 4,
            fixed: false,
        }
    };

    // Estado del tema actual
    const [theme, setTheme] = useState(themes.light);

    // Cambia el tema completamente según el nombre
    const setThemeByName = (themeName) => {
        const selectedTheme = themes[themeName];
        setTheme(selectedTheme);
    };

    // Aplica un tema temporalmente, siempre aplicable con "Aplicar"
    const applyTheme = (tempTheme) => {
        // Aplica siempre el tema completo
        setTheme(tempTheme);
    };

    // Actualiza una propiedad específica del tema si el tema no es fijo
    const updateThemeColor = (property, value) => {
        setTheme((prevTheme) => ({
            ...prevTheme,
            [property]: value,
        }));
    };

    return (
        <ThemeContext.Provider value={{ theme, setThemeByName, updateThemeColor, applyTheme, themes }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personalizado para usar el contexto del tema
export const useTheme = () => useContext(ThemeContext);
