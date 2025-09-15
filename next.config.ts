/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://stage.ema-api.com/ema-dev/firm/entpmsandbox393/ema/:path*", 
      },
    ];
  },
};

export default nextConfig;
