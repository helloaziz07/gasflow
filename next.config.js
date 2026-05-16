/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Required for wagmi/viem — some packages use node-specific modules
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // Fix for WalletConnect / RainbowKit encoding issues
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

module.exports = nextConfig;
