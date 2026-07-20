import { isValidElement, type ReactNode } from 'react';

export function extractReactText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractReactText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) {
    return extractReactText(node.props.children);
  }
  return '';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

/**
 * Slugifies text and disambiguates repeats (e.g. the same heading text
 * appearing under multiple sections) by appending -1, -2, etc. `seen`
 * must be the same Map instance across all calls for one document so
 * IDs stay consistent between separate passes over the same content
 * (e.g. extracting a table of contents vs. rendering heading anchors).
 */
export function uniqueSlug(text: string, seen: Map<string, number>): string {
  const base = slugify(text);
  const count = seen.get(base) ?? 0;
  seen.set(base, count + 1);
  return count === 0 ? base : `${base}-${count}`;
}
