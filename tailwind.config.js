/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff8f3',
          100: '#ffedd8',
          200: '#ffd5b6',
          300: '#ffb78a',
          400: '#ff8e50',
          500: '#ff6b1a',
          600: '#ff570a',
          700: '#e84a00',
          800: '#c43d00',
          900: '#a13300',
        },
        secondary: {
          50: '#fff7f0',
          100: '#ffedd0',
          200: '#ffd7a0',
          300: '#ffbb66',
          400: '#ff9633',
          500: '#ff7700',
          600: '#e66600',
          700: '#cc5500',
          800: '#994400',
          900: '#733300',
        },
        accent: {
          50: '#f0f8ff',
          100: '#e6f2ff',
          200: '#bfdaff',
          300: '#80c0ff',
          400: '#40a6ff',
          500: '#1a92ff',
          600: '#0077cc',
          700: '#005ca3',
          800: '#00447a',
          900: '#003366',
        },
        tech: {
          50: '#f0f7ff',
          100: '#e6f0ff',
          200: '#bfdbff',
          300: '#80c0ff',
          400: '#40a6ff',
          500: '#008cff',
          600: '#0066cc',
          700: '#004da3',
          800: '#00337a',
          900: '#001a52',
        }
      },
      backgroundImage: {
        'tech-gradient': 'linear-gradient(135deg, rgba(255,107,26,0.1) 0%, rgba(255,107,26,0.05) 25%, rgba(0,140,255,0.05) 75%, rgba(0,140,255,0.1) 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.8) 0%, rgba(255,248,243,0.9) 100%)',
        'button-gradient': 'linear-gradient(135deg, #ff6b1a 0%, #ff570a 100%)',
      }
    },
  },
  plugins: [],
}

