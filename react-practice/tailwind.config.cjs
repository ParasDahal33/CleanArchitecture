/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
      content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
      theme: {
            colors: {
                  white: "#fafbfc",
                  primary: "#1e67ac",
                  default: "rgb(19, 19, 61)",
                  mute: "rgba(180, 180, 180)",
                  "mute-xl": "rgb(145, 144, 144)",
                  title: "rgb(19, 19, 61)",
                  success: "green",
                  "success-60":"rgb(0 128 0 / 0.6)",
                  danger: "#d10909",
                  link: "#0e598b",
                  inactive: "#9e9e9e",
                  warning: "#FF8800",
                  selected: "rgba(163, 170, 231, 0.048)",
                  "light-blue": "#416aa7",
                  "side-nav": "#0e598b",
                  "side-nav-selected": "#156eab",
                  "mute-gray": "rgba(201, 201, 201, 0.493)",
                  "primary-mute": "#f1a24127",
                  "primary-mute-xl": "rgba(180, 122, 55, 0.048)",
            },
            extend: {
                  dropShadow: {
                        nav: "rgba(0, 0, 0, 0.021) 0px 3px 12px",
                  },
                  boxShadow: {
                        button: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  },
            },
            screens: {
                  "1sm": "375px",
                  // => @media (min-width: 375px) { ... }

                  "2sm": "530px",
                  // => @media (min-width: 530px) { ... }

                  sm: "640px",
                  // => @media (min-width: 640px) { ... }

                  md: "768px",
                  // => @media (min-width: 768px) { ... }

                  lg: "1024px",
                  // => @media (min-width: 1024px) { ... }

                  xl: "1280px",
                  // => @media (min-width: 1280px) { ... }

                  "1xl": "1534px",
                  // => @media (min-width: 1534px) { ... }

                  "2xl": "1536px",
                  // => @media (min-width: 1536px) { ... }
            },
      },
};
