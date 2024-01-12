/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
    images:{
      unoptimized:true,
      domains:["res.cloudinary.com"]
    },
    serverRuntimeConfig: {
        // Adjust the body size limit here (in bytes)
        serverMaxBodySize: 10 * 1024 * 1024, // 10MB
      },
}

module.exports = nextConfig
