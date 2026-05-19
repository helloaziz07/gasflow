/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Required for wagmi/viem — some packages use node-specific modules
    config.resolve.fallback = { fs: false, net: false, tls: false };
    // Fix for WalletConnect / RainbowKit encoding issues
    config.externals.push("pino-pretty", "lokijs", "encoding");
    // Fix for MetaMask SDK trying to import React Native modules in browser
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      '@solana/web3.js': false,
      '@mysten/sui/jsonRpc': false,
    };
    return config;
  },
};

module.exports = nextConfig;
