import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['sequelize', 'mysql2']
  /* config options here */
  
};

export default nextConfig;
