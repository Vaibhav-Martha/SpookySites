/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'blood-red': '#8B0000',
        'ghost-white': '#F8F8FF',
        'midnight': '#191970',
        'graveyard-gray': '#2F2F2F',
        'neon-purple': '#9D4EDD',
        'cursed-green': '#39FF14'
      },
      fontFamily: {
        'gothic': ['Cinzel', 'Playfair Display', 'serif'],
        'horror': ['Nosifer', 'Creepster', 'cursive'],
        'retro': ['Courier New', 'monospace'],
        'medieval': ['UnifrakturMaguntia', 'serif']
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'flicker': 'flicker 2s linear infinite',
        'crawl': 'crawl 20s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'vampire-fly': 'vampireFly 8s ease-in-out infinite',
        'vampire-cross-screen': 'vampireCrossScreen 15s linear infinite',
        'wing-flap': 'wingFlap 0.5s ease-in-out infinite alternate'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-10px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(10px)' }
        },
        flicker: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.3 }
        },
        crawl: {
          '0%': { transform: 'translateX(-100px) translateY(0px)' },
          '25%': { transform: 'translateX(50vw) translateY(20px)' },
          '50%': { transform: 'translateX(100vw) translateY(0px)' },
          '75%': { transform: 'translateX(50vw) translateY(-20px)' },
          '100%': { transform: 'translateX(-100px) translateY(0px)' }
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px #ff0000' },
          '100%': { boxShadow: '0 0 20px #ff0000, 0 0 30px #ff0000' }
        },
        'vampireFly': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0px) rotate(-2deg)' },
          '25%': { transform: 'translateX(-50%) translateY(-15px) rotate(1deg)' },
          '50%': { transform: 'translateX(-50%) translateY(-10px) rotate(-1deg)' },
          '75%': { transform: 'translateX(-50%) translateY(-20px) rotate(2deg)' }
        },
        'vampireCrossScreen': {
          '0%': { transform: 'translateX(-200px) translateY(20px) rotate(-8deg) scale(0.9)' },
          '15%': { transform: 'translateX(15vw) translateY(-40px) rotate(3deg) scale(1)' },
          '30%': { transform: 'translateX(35vw) translateY(-20px) rotate(-2deg) scale(1.05)' },
          '50%': { transform: 'translateX(50vw) translateY(-50px) rotate(0deg) scale(1.1)' },
          '70%': { transform: 'translateX(65vw) translateY(-15px) rotate(4deg) scale(1.05)' },
          '85%': { transform: 'translateX(85vw) translateY(-35px) rotate(-3deg) scale(1)' },
          '100%': { transform: 'translateX(calc(100vw + 200px)) translateY(10px) rotate(-8deg) scale(0.9)' }
        },
        'wingFlap': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(15deg)' }
        }
      }
    },
  },
  plugins: [],
}