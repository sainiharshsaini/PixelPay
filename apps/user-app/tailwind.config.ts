import type { Config } from 'tailwindcss'
import baseConfig from '@repo/tailwind-config/config/tailwind.config'

const config: Config = {
    ...baseConfig,
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}"
    ],
}

export default config