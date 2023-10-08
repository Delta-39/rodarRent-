/** @type {import('tailwindcss').Config} */
export default {
  darkMode:'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'slide-horizontal': 'slide-horizontal 25s infinite linear',
      },
      keyframes: {
        'slide-horizontal': {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },

      screens:{
        "xs":"350px"
      },
      fontSize:{
        landing2Xl:'5rem',
        landingXl:'4.5rem',
        landingLg: '3.8rem',
        landingMd:'3.5rem',
        landingMobile:'2.2rem'
      },
      scale:{
        '175':'1.75',
        '185':'1.85',
        '200':'2',
        '215':'2.15'
      },
      height:{
        landingMd:'70vh',
        landingXs:'53vh',
        landingLaptop:'80vh',
        landingDesktop:'75vh',
        noNavLaptop:'99.1vh',
        customerDetail:'86.5vh',
        form:'738px',
        adminCardWrapper:'810px',
        formLaptop:'630px',
        register:'730px',
        card:'328px',
        chart:'450px'
      },
      width:{
        '100':'29rem',
        '120':'39rem',
        card: '400px',
        '840': '840px',
        '769': '769px'
      },
      colors:{
        'blue':'#163C85',
        'red':'#C70039'
      }
    },
    fontFamily:{
      poppins:["poppins","sans-serif"]
    },

  },

  plugins: [],
  
}