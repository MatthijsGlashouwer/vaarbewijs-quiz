/** @type {import('next').NextConfig} */
const nextConfig = {
  // Vercel will handle the deployment automatically, 
  // so we don't need static export configurations here
  images: {
    remotePatterns: [
      // Add remote patterns here if needed in the future
    ],
    dangerouslyAllowSVG: true, // Allow SVG images to be used with Next.js Image component
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig; 