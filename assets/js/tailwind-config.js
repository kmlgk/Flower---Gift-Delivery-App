tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        /* Editorial Botanical palette — deep forest, burnt terracotta, muted gold, warm ink */
        primary: { 50:'#eaf0ec',100:'#cfe0d5',200:'#a7c2b2',300:'#7fa490',400:'#588870',500:'#3d7057',600:'#2c5a44',700:'#1f3d2c',800:'#15291e',900:'#0d1a13',950:'#081009' },
        secondary: { 50:'#fdf1ea',100:'#f9dac5',200:'#f0b78e',300:'#e28f5c',400:'#d0723e',500:'#c4602f',600:'#a44d24',700:'#7d3a1b',800:'#5a2913',900:'#3a1a0c',950:'#21100a' },
        accent: { 50:'#fbf7ed',100:'#f5eacb',200:'#e9d293',300:'#dab668',400:'#c99a45',500:'#b27f2f',600:'#8f6524',700:'#6b4b1b',800:'#4a3413',900:'#2e200c',950:'#1a1207' },
        ink: { 50:'#f7f6f3',100:'#ede9e0',200:'#d6d2c6',300:'#b7b1a0',400:'#8c8676',500:'#676254',600:'#4c4840',700:'#363330',800:'#262421',900:'#1a1815',950:'#0f0e0c' },
        cream: { 50:'#fffdfa',100:'#fbf9f5',200:'#f7f3ec',300:'#efe7d8',400:'#e3d7bf' }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Archivo"', 'sans-serif']
      },
      borderRadius: { '4xl':'1.75rem', '5xl':'2.25rem' },
      boxShadow: {
        glow: '0 0 42px -12px rgba(44,90,68,0.4)',
        soft: '0 24px 60px -20px rgba(26,24,21,0.16)',
        'soft-dark': '0 24px 60px -20px rgba(0,0,0,0.55)'
      },
      backgroundImage: {
        'petal-gradient': 'linear-gradient(135deg,#2c5a44 0%,#c4602f 100%)',
        'leaf-gradient': 'linear-gradient(135deg,#1f3d2c 0%,#b27f2f 100%)',
        'dusk-gradient': 'linear-gradient(180deg,#0f0e0c 0%,#262421 100%)'
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        'float-slow': 'float 10s ease-in-out infinite',
        'spin-slow': 'spin 16s linear infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.4s cubic-bezier(0.4,0,0.6,1) infinite'
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-14px)' } },
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'pulse-ring': { '0%': { transform: 'scale(0.8)', opacity: 0.7 }, '80%,100%': { transform: 'scale(1.8)', opacity: 0 } }
      }
    }
  }
};
