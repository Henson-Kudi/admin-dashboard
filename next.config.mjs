/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
          {
            source: "/api/:path*",
            headers: [
              { key: "Access-Control-Allow-Credentials", value: "true" },
              { key: "Access-Control-Allow-Origin", value: "http://localhost:4000" }, // your API server in dev
              // Add other necessary headers
            ]
          }
        ]
  },
};

export default nextConfig;
