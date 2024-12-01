/** @type {import('next').NextConfig} */
import nextPwa from "next-pwa";

const withPwa = nextPwa({
  dest: "public",
});

const nextConfig = {
  typescript: {
    // ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withPwa(nextConfig);
// export default nextConfig;
