/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    localPatterns: [
      {
        pathname: "/heroes/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
