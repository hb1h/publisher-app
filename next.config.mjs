/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    MODE: "production", // development || production
  },

  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
},
};

export default nextConfig;
