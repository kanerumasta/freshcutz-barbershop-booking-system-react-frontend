const { nextui } = require("@nextui-org/react");
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{html,js}",
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                wallpaper: "url('../public/images/huahh.jpg')",
                haircut: "url('../public/images/burst.jpg')",
                logo: "url('../public/images/logo.png')",
            },
        },
    },
    darkMode: "class",
    plugins: [nextui()],
};
