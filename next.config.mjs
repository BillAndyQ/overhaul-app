/** @type {import('next').NextConfig} */
const nextConfig = {
    allowedDevOrigins: [process.env.NEXT_PUBLIC_APP_URL],
};

export default nextConfig;
