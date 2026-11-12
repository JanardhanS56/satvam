/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx}'],
    theme: {
        extend: {
            colors: {
                ivory: '#FAF7F0',
                cream: '#F5EFE3',
                paper: '#FFFFFF',
                forest: '#2D3E2F',
                bark: '#6B5B45',
                moss: '#A3B18A',
                gold: '#C9A961',
                hibiscus: '#A8453D',
                saffron: '#E8B44A'
            },
            fontFamily: {
                display: ['Fraunces', 'serif'],
                body: ['Inter', 'system-ui', 'sans-serif'],
                eyebrow: ['"Cormorant SC"', 'serif']
            },
            boxShadow: {
                soft: '0 1px 2px rgba(45,62,47,0.04), 0 8px 24px rgba(45,62,47,0.06)',
                lifted: '0 4px 12px rgba(45,62,47,0.08), 0 24px 48px rgba(45,62,47,0.12)'
            },
            transitionTimingFunction: {
                out: 'cubic-bezier(0.22, 1, 0.36, 1)',
                inout: 'cubic-bezier(0.65, 0, 0.35, 1)'
            }
        }
    },
    plugins: []
};