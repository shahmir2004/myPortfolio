import React, { useState } from 'react';
import { useColorPicker } from '../contexts/ColorPickerContext';
import './ColorPicker.css';

function ColorPicker() {
  const { isColorPickerActive, setIsColorPickerActive, resetColors } = useColorPicker();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const handleColorPickerToggle = () => {
    setIsColorPickerActive(!isColorPickerActive);
    setShowColorPicker(false);
  };

  const handleColorChange = (e) => {
    setSelectedColor(e.target.value);
  };

  const handleReset = () => {
    resetColors();
    setShowColorPicker(false);
  };

  return (
    <div className="color-picker-container">
      <button 
        className={`color-picker-button ${isColorPickerActive ? 'active' : ''}`}
        onClick={handleColorPickerToggle}
        title="Toggle Color Picker"
      >
        🎨
      </button>
      
      {showColorPicker && (
        <div className="color-picker-panel">
          <input
            type="color"
            value={selectedColor}
            onChange={handleColorChange}
            className="color-input"
          />
          <button onClick={handleReset} className="reset-button">
            Reset Colors
          </button>
        </div>
      )}
    </div>
  );
}

export default ColorPicker; 