/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
     
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'marvel-live.freetls.fastly.net',
                port: "",
                pathname: '/**',
               
            }
        ]
    }
};

export default nextConfig;
