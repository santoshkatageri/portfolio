import type { MDXComponents } from 'mdx/types';
import { mdxComponents } from '@/components/articleMdxComponents';

/**
 * Global MDX component mapping (the file Next looks for by convention).
 *
 * Server-safe by design: a plain function, no React context — MDX rendered in
 * server components resolves its custom elements through here. Article pages
 * scope the styling via the component classes.
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...mdxComponents,
    ...components,
  };
}
