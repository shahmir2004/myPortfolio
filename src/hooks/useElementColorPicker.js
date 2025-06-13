import { useEffect, useCallback } from 'react';
import { useColorPicker } from '../contexts/ColorPickerContext';

export function useElementColorPicker() {
  const { isColorPickerActive, handleColorPick, isColorChangeable } = useColorPicker();

  const handleClick = useCallback((event) => {
    if (!isColorPickerActive) return;

    const element = event.target;
    
    // Check if the element is color-changeable
    if (!isColorChangeable(element)) {
      return;
    }

    // Store original styles to prevent layout shifts
    const originalStyles = {
      position: element.style.position,
      top: element.style.top,
      left: element.style.left,
      width: element.style.width,
      height: element.style.height,
      margin: element.style.margin,
      padding: element.style.padding,
      transform: element.style.transform,
      transition: element.style.transition
    };

    // Create a color picker input
    const colorPicker = document.createElement('input');
    colorPicker.type = 'color';
    colorPicker.style.position = 'absolute';
    colorPicker.style.left = '-9999px';
    document.body.appendChild(colorPicker);

    // Show the color picker
    colorPicker.click();

    // Handle color selection
    colorPicker.addEventListener('change', (e) => {
      const color = e.target.value;
      handleColorPick(element, color);
      document.body.removeChild(colorPicker);

      // Restore original styles
      Object.entries(originalStyles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });

    // Clean up if the color picker is closed without selecting a color
    colorPicker.addEventListener('blur', () => {
      if (document.body.contains(colorPicker)) {
        document.body.removeChild(colorPicker);
      }
      // Restore original styles
      Object.entries(originalStyles).forEach(([property, value]) => {
        element.style[property] = value;
      });
    });
  }, [isColorPickerActive, handleColorPick, isColorChangeable]);

  useEffect(() => {
    if (isColorPickerActive) {
      document.addEventListener('click', handleClick);
      document.body.style.cursor = 'crosshair';
    } else {
      document.removeEventListener('click', handleClick);
      document.body.style.cursor = 'default';
    }

    return () => {
      document.removeEventListener('click', handleClick);
      document.body.style.cursor = 'default';
    };
  }, [isColorPickerActive, handleClick]);

  return {
    isColorPickerActive
  };
} 