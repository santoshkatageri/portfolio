import { isValidElement, type ComponentPropsWithoutRef, type ElementType, type ReactNode } from 'react';
import styles from './ArticleBody.module.css';

/**
 * Component map used when compiling article MDX. Keeps presentation out of
 * the content files while giving code blocks, headings and links an editorial
 * treatment. Plain elements that need no behaviour stay unlisted and are
 * styled through the `.body` scope in ArticleBody.module.css.
 */

function slugify(node: unknown): string {
  const text = Array.isArray(node)
    ? node.map((child) => slugify(child)).join('')
    : typeof node === 'string' || typeof node === 'number'
      ? String(node)
      : isValidElement(node)
        ? slugify((node.props as { children?: unknown }).children)
        : '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/** Pull `language-​*` off the inner <code> so the frame can label itself. */
function extractLanguage(children: unknown): string | null {
  const child = Array.isArray(children) ? children[0] : children;
  if (isValidElement<{ className?: string }>(child)) {
    const match = /language-([\w-]+)/.exec(child.props.className ?? '');
    if (match) return match[1];
  }
  return null;
}

function H2(props: ComponentPropsWithoutRef<'h2'>) {
  const id = props.id ?? slugify(props.children);
  return (
    <h2 id={id} className={styles.heading}>
      <a className={styles.headingAnchor} href={`#${id}`} aria-hidden="true">
        #
      </a>
      {props.children}
    </h2>
  );
}

function H3(props: ComponentPropsWithoutRef<'h3'>) {
  const id = props.id ?? slugify(props.children);
  return (
    <h3 id={id} className={styles.heading}>
      <a className={styles.headingAnchor} href={`#${id}`} aria-hidden="true">
        #
      </a>
      {props.children}
    </h3>
  );
}

/** Tables scroll horizontally on small screens instead of overflowing. */
function Table(props: ComponentPropsWithoutRef<'table'>) {
  return (
    <div className={styles.tableWrap}>
      <table {...props} />
    </div>
  );
}

function Pre(props: ComponentPropsWithoutRef<'pre'>) {
  const language = extractLanguage(props.children);
  return (
    <figure className={styles.codeFrame}>
      {language ? (
        <figcaption className={styles.codeLabel}>{language}</figcaption>
      ) : null}
      <pre className={styles.pre}>{props.children}</pre>
    </figure>
  );
}

/**
 * Scope wrapper for a rendered article body. Element-level reading styles in
 * ArticleBody.module.css hang off this class, so article pages should render
 * MDX inside it.
 */
export function ArticleBody({ children }: { children: ReactNode }) {
  return <div className={styles.body}>{children}</div>;
}

export const mdxComponents: Record<string, ElementType> = {
  h2: H2,
  h3: H3,
  pre: Pre,
  table: Table,
};
