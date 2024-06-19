/** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['www.aljazeera.com'],
//     },
// };

const nextConfig = {
    images: {
        domains: ['qwenlm.github.io',"www.davidbordwell.net"],

        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
};
export default nextConfig;