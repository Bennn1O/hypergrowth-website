/**
 * Tailwind Color Palette Configuration
 *
 * Palette de couleurs HyperGrowth à ajouter dans tailwind.config.ts
 * pour éviter les couleurs hardcodées en hex.
 *
 * Usage:
 * ```tsx
 * // Dans tailwind.config.ts
 * import colors from './config/tailwind-color-palette';
 *
 * export default {
 *   theme: {
 *     extend: {
 *       colors: colors,
 *     }
 *   }
 * }
 * ```
 *
 * Puis utiliser :
 * ```tsx
 * className="bg-hg-night text-hg-white"
 * className="border-hg-carbon hover:text-hg-orchid"
 * ```
 */

const hyperGrowthColors = {
  // Brand Colors
  'hg-night': '#180a22',           // Nitro Night - Fond principal
  'hg-white': '#ffffff',           // White
  'hg-orchid': '#f285f0',          // Orchid - Accent secondaire (Rose/Magenta)
  'hg-violet': '#803fab',          // Velocity Violet - Accent primaire (Violet)

  // Secondary Colors
  'hg-metal': '#737373',           // Midnight Metal - Gris moyen
  'hg-silver': '#cfcfcf',          // Silver Circuit - Gris clair
  'hg-carbon': '#414141',          // Stealth Carbon - Gris foncé

  // Gradients (pour usage avec gradient utilities)
  // Utiliser : bg-gradient-to-r from-hg-violet to-hg-orchid
};

/**
 * Configuration Tailwind v4 complète recommandée
 * À copier dans tailwind.config.ts
 */
export const tailwindConfig = {
  theme: {
    extend: {
      colors: hyperGrowthColors,
      fontFamily: {
        archivo: ['Archivo', 'Arial', 'sans-serif'],
        'archivo-italic': ['"Archivo Italic"', 'Arial', 'sans-serif'],
        instrument: ['Instrument', '"Palatino Linotype"', 'sans-serif'],
        'instrument-italic': ['"Instrument Italic"', '"Palatino Linotype"', 'sans-serif'],
      },
      backgroundColor: {
        'glass': 'rgba(65, 65, 65, 0.2)', // Glassmorphism backdrop
      },
      borderRadius: {
        'hg': '10px', // Standard HyperGrowth border radius
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

/**
 * Palette de couleurs pour référence en composants
 */
export const colorPalette = {
  dark: {
    primary: '#180a22',      // Fond principal
    secondary: '#250f35',    // Fond secondaire
  },
  accent: {
    primary: '#803fab',      // Violet
    secondary: '#f285f0',    // Rose/Orchid
  },
  neutral: {
    white: '#ffffff',
    lightGray: '#cfcfcf',
    mediumGray: '#737373',
    darkGray: '#414141',
  },
  states: {
    hover: '#180a22',        // Couleur de fond au hover
    active: '#5b2380',       // Couleur active
    disabled: '#414141',     // Couleur désactivée
  },
} as const;

/**
 * Utilitaire pour générer des couleurs avec opacité
 */
export function withOpacity(color: string, opacity: number): string {
  // Convertir hex en RGB puis appliquer opacity
  const hex = color.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export default hyperGrowthColors;
