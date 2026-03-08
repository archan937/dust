interface DustHTMLAttributes {
  [key: string]: unknown;
  // Common HTML attributes
  className?: string;
  id?: string;
  style?: string;
  ref?: { current: Element | null };
  href?: string;
  src?: string;
  alt?: string;
  type?: string;
  placeholder?: string;
  value?: string | number;
  checked?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  for?: string;
  htmlFor?: string;
  tabIndex?: number;
  role?: string;
  // Mouse events
  onClick?: (event: MouseEvent) => void;
  onDblClick?: (event: MouseEvent) => void;
  onMouseDown?: (event: MouseEvent) => void;
  onMouseUp?: (event: MouseEvent) => void;
  onMouseEnter?: (event: MouseEvent) => void;
  onMouseLeave?: (event: MouseEvent) => void;
  onMouseMove?: (event: MouseEvent) => void;
  onContextMenu?: (event: MouseEvent) => void;
  // Keyboard events
  onKeyDown?: (event: KeyboardEvent) => void;
  onKeyUp?: (event: KeyboardEvent) => void;
  onKeyPress?: (event: KeyboardEvent) => void;
  // Input/form events
  onInput?: (event: InputEvent) => void;
  onChange?: (event: Event) => void;
  onSubmit?: (event: SubmitEvent) => void;
  onReset?: (event: Event) => void;
  // Focus events
  onFocus?: (event: FocusEvent) => void;
  onBlur?: (event: FocusEvent) => void;
  // Scroll/wheel
  onScroll?: (event: Event) => void;
  onWheel?: (event: WheelEvent) => void;
  // Drag events
  onDragStart?: (event: DragEvent) => void;
  onDragEnd?: (event: DragEvent) => void;
  onDrop?: (event: DragEvent) => void;
  onDragOver?: (event: DragEvent) => void;
  // Pointer events
  onPointerDown?: (event: PointerEvent) => void;
  onPointerUp?: (event: PointerEvent) => void;
  onPointerMove?: (event: PointerEvent) => void;
  onPointerEnter?: (event: PointerEvent) => void;
  onPointerLeave?: (event: PointerEvent) => void;
  // Touch events
  onTouchStart?: (event: TouchEvent) => void;
  onTouchEnd?: (event: TouchEvent) => void;
  onTouchMove?: (event: TouchEvent) => void;
  // Other
  onLoad?: (event: Event) => void;
  onError?: (event: Event) => void;
}

declare namespace JSX {
  type Element = globalThis.Node;
  type IntrinsicElements = Record<string, DustHTMLAttributes>;
}
