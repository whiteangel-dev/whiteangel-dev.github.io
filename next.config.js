/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
      unoptimized: true,
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  typescript: {
    ignoreBuildErrors: false,
  },

  eslint: {
    ignoreDuringBuilds: false,
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },

  experimental: {
    optimizePackageImports: ["lucide-react"],
  },

  // Fix for ChunkLoadError during development
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      config.output.chunkLoadTimeout = 120000;

      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: "all",
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: "vendors",
              priority: -10,
              chunks: "all",
            },
          },
        },
      };
    }

    return config;
  },

  ...(process.env.NODE_ENV === "development" && {
    devIndicators: {
      position: "bottom-right",
    },

    onDemandEntries: {
      maxInactiveAge: 60 * 1000,
      pagesBufferLength: 2,
    },
  }),
};

module.exports = nextConfig;