const injected = new Set<string>();
let styleEl: HTMLStyleElement | null = null;

const getStyleEl = (): HTMLStyleElement => {
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.setAttribute('data-dust-css', '');
    document.head.appendChild(styleEl);
  }
  return styleEl;
};

const hash = (s: string): string => {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h) ^ s.charCodeAt(i);
  return 'd' + (h >>> 0).toString(36);
};

export const css = (
  strings: TemplateStringsArray,
  ...values: unknown[]
): string => {
  const raw = String.raw({ raw: strings }, ...values).trim();
  const className = hash(raw);
  if (!injected.has(className)) {
    injected.add(className);
    getStyleEl().textContent += `.${className}{${raw}}\n`;
  }
  return className;
};
