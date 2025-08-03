import type { Config } from 'tailwindcss'
import baseConfig from '@repo/tailwind-config/config/tailwind.config'


const config: Config = {
    ...baseConfig,
    content: [
        "../../apps/**/*.{js,ts,jsx,tsx}",
        "../../packages/ui/**/*.{js,ts,jsx,tsx}"
    ],
    plugins: [require("tailwindcss-animate")]
}

export default config