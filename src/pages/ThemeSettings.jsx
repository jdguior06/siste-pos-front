import React, { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeSettings = () => {
  const { theme, setThemeByName, updateThemeColor, applyTheme, themes } = useTheme();
  const [tempTheme, setTempTheme] = useState({ ...theme });

  // Al seleccionar un tema, establece el tema temporal
  const handleThemeSelection = (themeName) => {
    const selectedTheme = themes[themeName];
    setTempTheme(selectedTheme);
  };

  // Manejador de cambio de color o radio de borde
  const handleChange = (type, value) => {
    setTempTheme((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-gray-800 text-white max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Customize Theme</h2>

      {/* Cuadros de Selección de Tema */}
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Theme:</label>
        <div className="flex space-x-4">
          {Object.keys(themes).map((themeName) => (
            <div
              key={themeName}
              onClick={() => handleThemeSelection(themeName)}
              className={`w-20 h-16 rounded-lg cursor-pointer border-2 ${
                tempTheme.name === themeName
                  ? "border-blue-500"
                  : "border-gray-600"
              }`}
              style={{
                backgroundColor: themes[themeName].backgroundColor,
              }}
            >
              <div
                className={`w-full h-full rounded-lg`}
                style={{
                  backgroundColor: themes[themeName].primaryColor,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>

      {/* Color Primario (solo modificable en temas que no son fijos) */}
      {!tempTheme.fixed && (
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Primary Color:</label>
          <input
            type="color"
            value={tempTheme.primaryColor}
            onChange={(e) => handleChange("primaryColor", e.target.value)}
            className="w-full h-10 p-0 border rounded"
          />
        </div>
      )}

      {/* Radio de Borde */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Border Radius:</label>
        <input
          type="range"
          min="0"
          max="10"
          value={tempTheme.borderRadius}
          onChange={(e) => handleChange("borderRadius", e.target.value)}
          className="w-full"
        />
      </div>

      {/* Botón Aplicar */}
      <button
        onClick={() => applyTheme(tempTheme)}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg mt-4"
      >
        Apply
      </button>
    </div>
  );
};

export default ThemeSettings;
