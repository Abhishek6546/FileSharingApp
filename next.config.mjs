/** @type {import('next').NextConfig} */
const nextConfig = {
        images: {
          domains: ['firebasestorage.googleapis.com'], // Allow firebase storage domain
        },
};

export default nextConfig;
