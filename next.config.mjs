/** @type {import('next').NextConfig} */
const nextConfig = {
  assetPrefix: "/exp1-static",
  transpilePackages: ["@workspace/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination:
          "https://stage.ema-api.com/ema-dev/firm/entpmsandbox393/ema/:path*",
      },
    ];
  },
  
};

export default nextConfig;
