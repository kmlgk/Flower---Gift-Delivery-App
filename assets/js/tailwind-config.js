tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: { 50:'#fdf2f6',100:'#fce7ef',200:'#fbcfe0',300:'#f8a8c5',400:'#f2739f',500:'#e64a80',600:'#d02a63',700:'#af1d4f',800:'#911b44',900:'#7a1a3d',950:'#450a1f' },
        secondary: { 50:'#effbf4',100:'#d7f5e2',200:'#b2eaca',300:'#7ed9ab',400:'#46bf87',500:'#22a06c',600:'#158059',700:'#12674a',800:'#12523c',900:'#104433',950:'#07271d' },
        accent: { 50:'#fefbea',100:'#fdf3c6',200:'#fbe38c',300:'#f8cd4c',400:'#f5b521',500:'#ec9509',600:'#cd7104',700:'#a35108',800:'#863f0e',900:'#71350f',950:'#411a04' },
        ink: { 50:'#f6f6f8',100:'#ececf1',200:'#d5d5e0',300:'#b1b1c6',400:'#8686a5',500:'#68688a',600:'#535170',600:'#53516f',700:'#44415b',800:'#39374c',900:'#252336',950:'#151420' }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      borderRadius: { '4xl':'2rem', '5xl':'2.5rem' },
      boxShadow: {
        glow: '0 0 40px -10px rgba(230,74,128,0.45)',
        soft: '0 20px 60px -15px rgba(37,35,54,0.25)',
        'soft-dark': '0 20px 60px -15px rgba(0,0,0,0.6)'
      },
      backgroundImage: {
        'petal-gradient': 'linear-gradient(135deg,#e64a80 0%,#ec9509 100%)',
        'leaf-gradient': 'linear-gradient(135deg,#22a06c 0%,#e64a80 100%)',
        'dusk-gradient': 'linear-gradient(180deg,#151420 0%,#39374c 100%)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'spin-slow': 'spin 14s linear infinite',
        blob: 'blob 12s ease-in-out infinite',
        marquee: 'marquee 28s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px) rotate(0deg)' }, '50%': { transform: 'translateY(-18px) rotate(3deg)' } },
        blob: { '0%,100%': { borderRadius: '42% 58% 65% 35% / 45% 45% 55% 55%' }, '50%': { borderRadius: '65% 35% 42% 58% / 55% 62% 38% 45%' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.8)', opacity: 0.7 }, '80%,100%': { transform: 'scale(1.8)', opacity: 0 } }
      }
    }
  }
};
