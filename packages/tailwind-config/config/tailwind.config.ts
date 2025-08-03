import type { Config } from 'tailwindcss'
import tailwindcssAnimate from 'tailwindcss-animate'

const config: Config = {
    content: [
        "../../apps/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        extend: {
            colors: {
                primary: "#6366f1", // indigo-500
                success: "#22c55e",
                warning: "#facc15",
                info: "#0ea5e9",
                gradient: {
                    aurora: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    primary: "linear-gradient(90deg, #4f46e5, #3b82f6)",
                    sunset: "linear-gradient(135deg, #fb7185, #fcd34d)",
                    card: "linear-gradient(to right, #f472b6, #a78bfa)",
                    hero: "radial-gradient(circle at center, #4f46e5, transparent 70%)"
                }
            },
            backgroundImage: {
                "gradient-aurora": "linear-gradient(135deg, #a78bfa, #60a5fa)",
                "gradient-primary": "linear-gradient(90deg, #4f46e5, #3b82f6)",
                "gradient-sunset": "linear-gradient(135deg, #fb7185, #fcd34d)",
                "gradient-glass": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                "gradient-card": "linear-gradient(to right, #f472b6, #a78bfa)",
                "gradient-hero": "radial-gradient(circle at center, #4f46e5, transparent 70%)",
            },
            boxShadow: {
                elegant: "0 20px 40px rgba(0, 0, 0, 0.1)",
                glow: "0 0 10px rgba(99, 102, 241, 0.5)",
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease-out forwards",
            },
            keyframes: {
                fadeIn: {
                    from: { opacity: 0, transform: "translateY(20px)" },
                    to: { opacity: 1, transform: "translateY(0)" }
                }
            }
        },
    },
    plugins: [tailwindcssAnimate],
}

export default config