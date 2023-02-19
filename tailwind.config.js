const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ".public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mp3logo': 'url("https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.25/static/media/icon_zing_mp3_60.f6b51045.svg")',
        'gradient-bg-chart': 'linear-gradient(180deg,#740091,#2d1a4c)',
        'gradient-bg-vip': 'linear-gradient(117deg,#5a4be7,#c86dd7 102%)'
      },
      backgroundColor: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#f9dbdb',
        'main-400': '#f9dbdb',
        'main-500': '#0E8080',
        'overlay-30': 'rgba(0,0,0,0.3)',
        'main-player': '#181818',
      },
      colors: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#CED9D9',
        'main-400': '#C0D8D8',
        'main-500': '#0E8080',
        'main-text-noacctive': '#efe6f2',
        'main-text-acctive': '#ebedee',
        'main-text': 'white',
      },
      transitionDuration: {
        'transition-duration-section': '0.5s'
      },
      keyframes: {
        'slide-right': {
          '0%': {
            '-webkit-transform': ' translateX(-500px);',
            transform: 'translateX(-500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'slide-left2': {
          '0%': {
            '-webkit-transform': ' translateX(500px);',
            transform: 'translateX(500px);'
          },
          '100%': {
            '-webkit-transform': 'translateX(0);',
            transform: 'translateX(0);'
          }
        },
        'rotate-center': {
          '0%': {
            transform: 'rotate(0);',
            'border-radius': '9999px',
          },
          '100%': {
            transform: 'rotate(360deg);'
          }
        },
        'rotate-center-pause': {
          '0%': {
            transform: 'rotate(360deg);',
            'border-radius': '9999px',
          },
          '100%': {
            transform: 'rotate(0);'
          }
        },
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'rotate-center': 'rotate-center 6s linear infinite;',
        'rotate-center-pause': 'rotate-center-pause 0.2s linear 1;',
      },
      flex: {
        '4': '4 4 0%',
        '6': '6 6 0%',
        '3': '3 3 0%',
        '7': '7 7 0%',
      }
    },
    screens: {
      '1600': '1600px',
      '1200': '1200px',
      '438': '438px',
      '640': '640px'
    }
  },
  plugins: [
    require('tailwind-scrollbar'),
    plugin(function ({ addVariant }) {
      addVariant('current', '&.active');
    }),
  ],
}