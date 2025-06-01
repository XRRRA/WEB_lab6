/** @type {import('tailwindcss').Config} */
// tailwind.config.js
export default {
    content: [
        './index.html',
        './src/**/*.{js,jsx,ts,tsx}'
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                "f1-red":    "#DC0000",
                "f1-yellow": "#FFDD00",
                "mercedes-teal":   "#00D2BE",
                "ferrari-red":     "#DC0000",
                "redbull-blue":    "#1E41FF",
                "mclaren-orange":  "#FF8700",
                "alpine-blue":     "#0090FF",
                "astonMartin-green": "#00A553",
                "williams-blue":   "#005AFF",
                "alphaTauri-navy": "#2B4562",
                "alfaRomeo-maroon":"#900000",
                "haas-gray":       "#B6BABD"
            }
        }
    },
    plugins: []
}
