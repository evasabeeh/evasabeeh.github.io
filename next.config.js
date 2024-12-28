import WithPWA from "next-pwa";

const withPWA = WithPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  scope: "/",
  sw: "service-worker.js",
});

/**
 * @type {import('next').NextConfig}
 */
const config = withPWA({
  reactStrictMode: true,
  output: "export", // Enables static export
  images: { unoptimized: true }, // Disables image optimization for static export
});

export default config;
