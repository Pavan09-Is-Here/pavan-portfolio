import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The instrument panel was staged at /v2 before it became the home
      // page. Anything already shared pointing there still resolves.
      { source: "/v2", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
