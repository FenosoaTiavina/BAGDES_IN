/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    output: 'export',
    distDir: 'out',
    images: {
        unoptimized: true
    },
    experimental: {
        serverActions: true,
    }

}

module.exports = nextConfig
