/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@package/ui"],
  images: {
    formats: ["image/webp"],
    minimumCacheTTL: 2678400, // 31 dias
  },
}

export default nextConfig
