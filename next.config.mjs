import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Static export for Cloudflare Pages — produces the `out/` directory.
  // All routes are prerendered at build time; there is no server runtime.
  output: 'export',
  // Static export: no image optimisation server, images ship as-is.
  images: { unoptimized: true },
  // Allow the sandboxed preview host to load /_next/* assets in dev.
  allowedDevOrigins: ['*.e2b.app'],
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkGfm,
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: 'frontmatter' }],
    ],
  },
});

export default withMDX(nextConfig);
