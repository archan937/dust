export const cx = (
  ...classes: (string | false | null | undefined | 0)[]
): string => classes.filter(Boolean).join(' ');
