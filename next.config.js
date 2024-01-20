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
        serverMaxBodySize: "10mb", 
      },
     experimental:{
      serverActions: {
        bodySizeLimit: '20mb',
      },
     } 
    
  
    
}

module.exports = nextConfig
