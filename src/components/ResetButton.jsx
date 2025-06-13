import React from 'react';
import { useColorPicker } from '../contexts/ColorPickerContext';
import './ResetButton.css';

export function ResetButton() {
  const { hasColoredElements, resetColors } = useColorPicker();

  if (!hasColoredElements) return null;

  return (
    <button 
      className="reset-button"
      onClick={resetColors}
      aria-label="Reset all colors"
    >
      Reset Colors
    </button>
  );
} 