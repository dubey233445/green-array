import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    
   
};


module.exports={
     images: {
    remotePatterns: [new URL('https://perenual.com/**')],
  },

}
export default nextConfig;
