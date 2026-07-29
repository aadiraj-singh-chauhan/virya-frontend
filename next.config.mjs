/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Trimmed from the Next.js defaults (8 deviceSizes x 8 imageSizes) down
    // to what this project's <Image sizes="..."> props actually request —
    // see the fixed-px and vw breakpoints used across src/components.
    deviceSizes: [768, 1024, 1280, 1920],
    imageSizes: [96, 128, 256, 384, 480, 640, 768],
  },
};

export default nextConfig;
