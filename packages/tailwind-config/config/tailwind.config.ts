import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        // Paths to your application and UI library files will be configured in each package
    ],
    theme: {
        extend: {
            colors: {
                primary: 'var(--primary)',
                secondary: 'var(--secondary)',
            },
        },
    },
    plugins: [],
}

export default config