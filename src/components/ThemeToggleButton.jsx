// src/components/ThemeToggleButton.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggleButton.css';

// Simple sun and moon icons (can be replaced with SVGs or icon library)
const SunIcon = () => <span role="img" aria-label="sun emoji">☀️</span>;
const MoonIcon = () => <span role="img" aria-label="moon emoji">🌙</span>;

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default ThemeToggleButton;