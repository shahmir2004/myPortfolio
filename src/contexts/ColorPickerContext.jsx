import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ColorPickerContext = createContext();

export function ColorPickerProvider({ children }) {
  const [isColorPickerActive, setIsColorPickerActive] = useState(false);
  const [lastPickedColor, setLastPickedColor] = useState(null);
  const [pickedElements, setPickedElements] = useState(new Map());
  const [hasColoredElements, setHasColoredElements] = useState(false);

  // Function to check if an element is color-changeable
  const isColorChangeable = useCallback((element) => {
    // Skip interactive elements and their children
    if (element.tagName === 'BUTTON' || 
        element.tagName === 'A' || 
        element.tagName === 'INPUT' ||
        element.closest('button') ||
        element.closest('a') ||
        element.closest('input') ||
        element.closest('[role="button"]') ||
        element.closest('[role="link"]') ||
        element.hasAttribute('href') ||
        element.hasAttribute('onClick')) {
      return false;
    }

    // Check if element has any content or background
    const styles = window.getComputedStyle(element);
    return element.offsetWidth > 0 && 
           element.offsetHeight > 0 && 
           (styles.backgroundColor !== 'transparent' || 
            styles.color !== 'transparent');
  }, []);

  // Function to highlight color-changeable elements
  const highlightColorChangeableElements = useCallback(() => {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      if (isColorChangeable(element)) {
        element.style.cursor = 'pointer';
      }
    });
  }, [isColorChangeable]);

  // Function to remove highlighting
  const removeHighlighting = useCallback(() => {
    const elements = document.querySelectorAll('*');
    elements.forEach(element => {
      element.style.cursor = '';
    });
  }, []);

  const toggleColorPicker = useCallback(() => {
    setIsColorPickerActive(prev => {
      const newState = !prev;
      if (!newState) {
        removeHighlighting();
      }
      return newState;
    });
  }, [removeHighlighting]);

  // Handle color picker activation/deactivation
  useEffect(() => {
    if (isColorPickerActive) {
      highlightColorChangeableElements();
    } else {
      removeHighlighting();
    }
    
    return () => {
      removeHighlighting();
    };
  }, [isColorPickerActive, highlightColorChangeableElements, removeHighlighting]);

  const handleColorPick = useCallback((element, color) => {
    if (!isColorPickerActive) return;

    // Don't allow color picking on buttons or interactive elements
    if (element.tagName === 'BUTTON' || 
        element.tagName === 'A' || 
        element.tagName === 'INPUT' ||
        element.closest('button') ||
        element.closest('a') ||
        element.closest('input') ||
        element.closest('[role="button"]') ||
        element.closest('[role="link"]') ||
        element.hasAttribute('href') ||
        element.hasAttribute('onClick')) {
      return;
    }

    setLastPickedColor(color);
    setPickedElements(prev => {
      const newMap = new Map(prev);
      newMap.set(element, color);
      return newMap;
    });
    setHasColoredElements(true);

    // Apply the color
    element.style.backgroundColor = color;
  }, [isColorPickerActive]);

  const resetColors = useCallback(() => {
    pickedElements.forEach((color, element) => {
      element.style.backgroundColor = '';
    });
    setPickedElements(new Map());
    setLastPickedColor(null);
    setHasColoredElements(false);
  }, [pickedElements]);

  const value = {
    isColorPickerActive,
    toggleColorPicker,
    handleColorPick,
    lastPickedColor,
    pickedElements,
    resetColors,
    isColorChangeable,
    hasColoredElements
  };

  return (
    <ColorPickerContext.Provider value={value}>
      {children}
    </ColorPickerContext.Provider>
  );
}

export function useColorPicker() {
  const context = useContext(ColorPickerContext);
  if (!context) {
    throw new Error('useColorPicker must be used within a ColorPickerProvider');
  }
  return context;
} 