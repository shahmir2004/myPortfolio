// src/utils/animationVariants.js

export const staggerContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const itemFadeInUpVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: "circOut" },
  },
};

export const buttonHoverTapVariants = {
  hover: {
    scale: 1.05,
    // Box shadow should primarily be handled by CSS :hover for theme consistency
    // If you need JS-driven shadow, pass color as prop or use a fixed color string here
    transition: { type: "spring", stiffness: 350, damping: 15 },
  },
  tap: { scale: 0.95 },
};

export const sectionScrollRevealVariants = {
  hidden: { opacity: 0, y: 55, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.15 },
  },
};

// scrollItemVariants can be an alias or re-export for clarity
export const scrollItemVariants = itemFadeInUpVariants;