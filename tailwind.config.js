/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#060B18',
          'navy-deep': '#030712',
          'navy-card': '#0B132B',
          'navy-surface': '#111C38',
          'navy-border': '#1E294B',
          cyan: '#00F0FF',
          'cyan-light': '#67E8F9',
          'cyan-dark': '#0891B2',
          blue: '#2563EB',
          'blue-light': '#38BDF8',
          aqua: '#14F1D9',
          green: '#10B981',
          amber: '#F59E0B',
          rose: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'glow-cyan': '0 0 25px -5px rgba(0, 240, 255, 0.4)',
        'glow-cyan-sm': '0 0 12px -2px rgba(0, 240, 255, 0.3)',
        'glow-blue': '0 0 25px -5px rgba(37, 99, 235, 0.4)',
        'glow-green': '0 0 20px -5px rgba(16, 185, 129, 0.4)',
        'glow-red': '0 0 20px -5px rgba(239, 68, 68, 0.4)',
        'card-dark': '0 10px 30px -10px rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
        'card-light': '0 10px 30px -10px rgba(0, 30, 80, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2.5s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { opacity: '0.4' },
          '100%': { opacity: '0.9' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
