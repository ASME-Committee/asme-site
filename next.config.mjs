/** @type {import('next').NextConfig} */

// For GitHub Pages project sites the app is served from /<repo>, so the CI
// build sets PAGES_BASE_PATH=/asme-site. Local dev and a future custom domain
// (served at the root) leave it empty.
const basePath = process.env.PAGES_BASE_PATH || "";

const nextConfig = {
  reactStrictMode: true,
  // Emit a fully static site (out/) so it can be hosted on GitHub Pages.
  output: "export",
  // GitHub Pages has no image optimizer, so serve images as-is.
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.prod.website-files.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  basePath,
  assetPrefix: basePath || undefined,
  // Produces /about/index.html etc., which GitHub Pages serves cleanly.
  trailingSlash: true,
};

export default nextConfig;
