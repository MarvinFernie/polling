/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Original primary colors (kept for compatibility)
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Dark mode colors - more refined and elegant
        background: 'rgb(16, 19, 24)',
        card: 'rgb(27, 32, 40)',
        'card-hover': 'rgb(32, 37, 45)',
        input: 'rgb(36, 41, 49)',
        border: 'rgb(45, 51, 59)',
        'border-light': 'rgb(60, 66, 74)',
        hover: 'rgb(40, 45, 55)',
        // Softer accent colors (elegant teal-mint)
        accent: 'rgb(88, 199, 173)', // Softer teal
        'accent-dark': 'rgb(70, 179, 153)',
        'accent-light': 'rgb(120, 216, 190)',
        'accent-subtle': 'rgba(88, 199, 173, 0.15)',
        // Additional UI colors
        surface: 'rgb(22, 26, 34)',
        'surface-light': 'rgb(30, 36, 44)',
        success: 'rgb(106, 201, 119)',
        warning: 'rgb(253, 186, 116)',
        error: 'rgb(242, 135, 135)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.1)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'elevated': '0 8px 28px rgba(0, 0, 0, 0.25), 0 4px 10px rgba(0, 0, 0, 0.22)',
        'inner-subtle': 'inset 0 2px 4px rgba(0, 0, 0, 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'pulse-gentle': 'pulseGentle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGentle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(229, 231, 235)',
            h1: {
              color: 'rgb(229, 231, 235)',
            },
            p: {
              color: 'rgb(229, 231, 235)',
            },
          }
        }
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}