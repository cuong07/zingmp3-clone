/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    ".public/index.html"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mp3logo': 'url("https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.8.25/static/media/icon_zing_mp3_60.f6b51045.svg")'
      },
      backgroundColor: {
        'main-100': '#E7ECEC',
        'main-200': '#DDE4E4',
        'main-300': '#f9dbdb',
        'main-400': '#f9dbdb',
        'main-500': '#0E8080'
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
        'rotate': {
          '0%': {
            transform: 'rotate(0);',
          },
          '100%': {
            transform: 'rotate(360deg);'
          }
        }
      },
      animation: {
        'slide-right': 'slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left': 'slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'slide-left2': 'slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
        'loading': 'rotate 1s linear infinite;',
      },
      flex: {
        '4': '4 4 0'
      }
    },
    screens: {
      '1600': '1600px',
      '1200': '1200px',
      '438': '438px',
      '640': '640px'
    }
  },
  plugins: [],
}