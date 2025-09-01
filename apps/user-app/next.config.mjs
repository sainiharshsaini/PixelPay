/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    disableFileSystemPublicRoutes: true,
  },
  webpack: (config, { isServer }) => {
    // Prevent webpack from scanning external directories
    config.watchOptions = {
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/.next/**',
        '**/C:/**',
        '**/Users/**',
        '**/Program Files/**',
        '**/Windows/**',
      ],
    };
    
    config.resolve.symlinks = false;
    
    return config;
  },
  env: {
    NEXT_DISABLE_FILE_SYSTEM_PUBLIC_ROUTES: 'true',
    NEXT_TELEMETRY_DISABLED: '1',
  },
};

export default nextConfig;
