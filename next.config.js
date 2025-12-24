// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   output: 'export',
//   images: {
//     unoptimized: true, // 👈 This disables the Image Optimization API
//   },
//   trailingSlash: true,

// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: 'export',
  images: {
    unoptimized: true,
    domains: ["firebasestorage.googleapis.com"],
  },
  trailingSlash: true,
};

module.exports = nextConfig;
