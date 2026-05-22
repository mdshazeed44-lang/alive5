import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        // ===== BRAND (LOCKED — official Alive5 Brand Guide 2023) =====
        alive5: {
          orange: '#EB5124', // PMS 7579 — primary brand
          grey: '#48484A', // PMS 7540 — primary text
          white: '#FFFFFF',
        },
        // ===== ORANGE RAMP =====
        orange: {
          50: '#FEF4EE',
          100: '#FCE3D2',
          200: '#F9CEB3',
          300: '#F5B088',
          400: '#F08560',
          500: '#EB5124',
          600: '#D63F18',
          700: '#B33212',
          800: '#8F2810',
          900: '#6E2010',
        },
        // ===== GREY RAMP =====
        grey: {
          50: '#F5F5F6',
          100: '#E8E8EA',
          200: '#D1D1D4',
          300: '#B0B0B3',
          400: '#9E9D9E',
          500: '#73737A',
          600: '#5C5C5F',
          700: '#48484A',
          800: '#2E2E30',
          900: '#1F1F20',
        },
        // ===== OFFICIAL ACCENT COLORS =====
        accent: {
          'light-blue': '#A5DBDB', // PMS 572
          yellow: '#FFD889', // PMS 1205
          teal: '#278B93', // PMS 5483
          green: '#7CB65E', // PMS 7489
          'light-green': '#BFE0BB', // PMS 7485
          navy: '#0E4F74', // PMS 3025
          peach: '#F9CEB3', // PMS 475
          purple: '#955683', // PMS 7655
          pink: '#F8B4BD', // PMS 707
        },
        // ===== SURFACES =====
        surface: {
          page: '#FFFFFF',
          soft: '#FAFAFA',
          grey: '#F5F5F6',
          cream: '#FFF8F2',
          dark: '#1F1F20',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['88px', { lineHeight: '96px', letterSpacing: '-0.02em', fontWeight: '700' }],
        h1: ['72px', { lineHeight: '80px', letterSpacing: '-0.02em', fontWeight: '700' }],
        h2: ['48px', { lineHeight: '56px', letterSpacing: '-0.015em', fontWeight: '700' }],
        h3: ['32px', { lineHeight: '40px', letterSpacing: '-0.01em', fontWeight: '700' }],
        h4: ['20px', { lineHeight: '28px', letterSpacing: '-0.005em', fontWeight: '700' }],
        'body-lg': ['18px', { lineHeight: '30px', fontWeight: '400' }],
        body: ['16px', { lineHeight: '28px', fontWeight: '400' }],
        small: ['14px', { lineHeight: '22px', fontWeight: '400' }],
        legal: ['12px', { lineHeight: '18px', fontWeight: '400' }],
      },
      borderRadius: {
        sm: '4px',
        DEFAULT: '6px', // brand button radius
        md: '8px',
        lg: '12px',
        xl: '20px',
        '2xl': '32px',
      },
      boxShadow: {
        xs: '0 1px 2px rgba(72, 72, 74, 0.05)',
        sm: '0 2px 4px rgba(72, 72, 74, 0.06), 0 1px 2px rgba(72, 72, 74, 0.04)',
        md: '0 8px 16px -4px rgba(72, 72, 74, 0.08), 0 2px 4px -1px rgba(72, 72, 74, 0.06)',
        lg: '0 16px 32px -8px rgba(72, 72, 74, 0.12), 0 6px 12px -4px rgba(72, 72, 74, 0.08)',
        xl: '0 24px 48px -12px rgba(72, 72, 74, 0.16), 0 8px 16px -8px rgba(72, 72, 74, 0.10)',
        '2xl': '0 32px 64px -16px rgba(72, 72, 74, 0.20), 0 12px 24px -8px rgba(72, 72, 74, 0.12)',
        orange: '0 12px 32px -8px rgba(235, 81, 36, 0.35)',
        'orange-lg': '0 24px 48px -12px rgba(235, 81, 36, 0.40)',
      },
      maxWidth: { '8xl': '1440px' },
      animation: {
        marquee: 'marquee 30s linear infinite',
        'marquee-slow': 'marquee 60s linear infinite',
        'fade-in': 'fade-in 0.6s ease-out',
        'fade-up': 'fade-up 0.8s ease-out',
        'status-pulse': 'status-pulse 2s ease-out infinite',
        float: 'float 6s ease-in-out infinite',
        'typing-dot': 'typing-dot 1.4s ease-in-out infinite',
        spin: 'rotate-1turn 1s linear infinite',
      },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        'fade-in': { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'status-pulse': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '100%': { transform: 'scale(3)', opacity: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'typing-dot': {
          '0%, 60%, 100%': { transform: 'translateY(0)', opacity: '0.4' },
          '30%': { transform: 'translateY(-4px)', opacity: '1' },
        },
        'rotate-1turn': { '100%': { transform: 'rotate(360deg)' } },
      },
    },
  },
  plugins: [],
} satisfies Config;
