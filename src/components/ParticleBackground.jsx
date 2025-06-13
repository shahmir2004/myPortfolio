// src/components/ParticleBackground.jsx
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useTheme } from '../context/ThemeContext';

const ParticleBackground = () => {
  const { theme } = useTheme();
  const [particleKey, setParticleKey] = useState(0); // To force re-render on theme change

  // State for theme-dependent colors
  const [currentParticleColors, setCurrentParticleColors] = useState({
    grabLinkColor: 'rgba(0, 123, 255, 0.7)',
    bubbleColor: 'rgba(255, 193, 7, 0.8)',
    particleBaseColor: "#495057",
    particleLinkColor: "#adb5bd"
  });

  useEffect(() => {
    // Function to safely get CSS variable values
    const getSafeCssVar = (varName, fallback) => {
        if (typeof window !== 'undefined' && document.documentElement) {
            const val = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
            return val || fallback;
        }
        return fallback;
    };
    
    const primaryRGB = getSafeCssVar(theme === 'dark' ? '--brand-primary-rgb-dark' : '--brand-primary-rgb', '13, 110, 253');
    const accentRGB = getSafeCssVar(theme === 'dark' ? '--brand-accent-rgb-dark' : '--brand-accent-rgb', '255, 202, 44');

    setCurrentParticleColors({
      grabLinkColor: `rgba(${primaryRGB}, 0.7)`,
      bubbleColor: `rgba(${accentRGB}, 0.8)`,
      particleBaseColor: getSafeCssVar('--text-secondary', theme === 'dark' ? '#adb5bd' : '#495057'),
      particleLinkColor: getSafeCssVar('--border-primary', theme === 'dark' ? '#373b3e' : '#dee2e6')
    });
    setParticleKey(prevKey => prevKey + 1); // Change key to force Particles re-render with new options
  }, [theme]);


  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  // Memoize options to prevent re-creation on every render unless colors change
  const particleOptions = useMemo(() => ({
    fpsLimit: 60,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["grab", "bubble"],
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 180,
          links: {
            opacity: 0.8,
            color: currentParticleColors.grabLinkColor, // Use state variable
          }
        },
        bubble: {
          distance: 200,
          size: 8,
          duration: 0.4,
          opacity: 0.9,
          color: currentParticleColors.bubbleColor, // Use state variable
        },
        push: { quantity: 3 },
      },
    },
    particles: {
      color: {
        value: currentParticleColors.particleBaseColor, // Use state variable
      },
      links: {
        color: currentParticleColors.particleLinkColor, // Use state variable
        distance: 160,
        enable: true,
        opacity: 0.25,
        width: 1,
      },
      move: {
        direction: "none",
        enable: true,
        outModes: { default: "bounce" },
        random: true,
        speed: 0.8,
        straight: false,
      },
      number: {
        density: { enable: true, area: 900 },
        value: 45,
      },
      opacity: {
        value: { min: 0.1, max: 0.6 },
        animation: { enable: true, speed: 0.4, minimumValue: 0.05, sync: false },
      },
      shape: { type: "circle" },
      size: {
        value: { min: 1, max: 3.5 },
        animation: { enable: true, speed: 1.5, minimumValue: 0.3, sync: false },
      },
    },
    detectRetina: true,
  }), [currentParticleColors]); // Re-calculate options if currentParticleColors change

  if (!currentParticleColors.grabLinkColor) return null; // Or a loader, if colors are not ready

  return (
    <Particles
      key={particleKey} // Use key to force re-mount when theme (and thus options) change
      id="tsparticles-hero"
      init={particlesInit}
      // loaded={particlesLoaded} // loaded callback can be omitted if not used
      options={particleOptions}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
};

export default ParticleBackground;