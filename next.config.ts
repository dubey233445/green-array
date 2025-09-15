import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images: {
     unoptimized: true,
  },
    
   
};


module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // allow all HTTPS domains
      },
      {
        protocol: "http",
        hostname: "**", // allow all HTTP domains (not recommended)
      },
    ],
  },
};
export default nextConfig;
