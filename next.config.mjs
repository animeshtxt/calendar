/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/calendar",
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
