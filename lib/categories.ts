export const CATEGORIES = [
  { value: 'backend', label: 'Backend' },
  { value: 'frontend', label: 'Frontend' },
  { value: 'devops', label: 'DevOps & Infrastructure' },
  { value: 'career', label: 'Career & Education' },
  { value: 'others', label: 'Others' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];

export function categoryLabel(value: string): string {
  return CATEGORIES.find((c) => c.value === value)?.label ?? value;
}
