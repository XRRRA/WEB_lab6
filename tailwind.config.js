/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                'f1-red': '#E10600',
                'f1-dark': '#15151E',
                'f1-silver': '#C0C0C0'
            }
        }
    },
    plugins: []
};
