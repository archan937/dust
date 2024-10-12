declare namespace JSX {
  interface IntrinsicElements {
    a: {
      href?: string;
      target?: string;
      rel?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    abbr: {
      title?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    address: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    area: {
      alt?: string;
      href?: string;
      target?: string;
      shape?: string;
      coords?: string;
    };
    article: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    aside: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    audio: {
      src?: string;
      controls?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    b: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    base: { href?: string; target?: string };
    bdi: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    bdo: {
      dir?: "ltr" | "rtl";
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    big: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    blockquote: {
      cite?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    body: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    br: object;
    button: {
      type?: "button" | "submit" | "reset";
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    canvas: {
      width?: number;
      height?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    caption: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    cite: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    code: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    col: { span?: number };
    colgroup: { span?: number };
    data: {
      value?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    datalist: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    dd: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    del: {
      cite?: string;
      datetime?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    details: {
      open?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    dfn: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    dialog: {
      open?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    div: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    dl: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    dt: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    em: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    embed: { src?: string; type?: string; width?: string; height?: string };
    fieldset: {
      disabled?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    figcaption: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    figure: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    footer: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    form: {
      action?: string;
      method?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h1: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h2: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h3: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h4: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h5: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    h6: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    head: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    header: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    hgroup: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    hr: object;
    html: {
      lang?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    i: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    iframe: {
      src?: string;
      title?: string;
      width?: string;
      height?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    img: { src: string; alt?: string; width?: number; height?: number };
    input: {
      type?: string;
      value?: string;
      placeholder?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    ins: {
      cite?: string;
      datetime?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    kbd: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    label: {
      htmlFor?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    legend: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    li: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    link: { rel?: string; href?: string };
    main: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    map: {
      name?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    mark: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    menu: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    menuitem: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    meta: { charset?: string; name?: string; content?: string };
    meter: {
      value?: number;
      min?: number;
      max?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    nav: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    noscript: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    object: {
      data?: string;
      type?: string;
      width?: number;
      height?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    ol: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    optgroup: {
      label?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    option: {
      value?: string;
      selected?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    output: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    p: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    param: { name?: string; value?: string };
    picture: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    pre: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    progress: {
      value?: number;
      max?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    q: {
      cite?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    rp: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    rt: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    ruby: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    s: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    samp: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    script: {
      src?: string;
      async?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    section: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    select: {
      multiple?: boolean;
      value?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    small: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    source: { src?: string; type?: string };
    span: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    strong: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    style: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    sub: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    summary: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    sup: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    table: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    tbody: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    td: {
      colspan?: number;
      rowspan?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    textarea: {
      rows?: number;
      cols?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    tfoot: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    th: {
      colspan?: number;
      rowspan?: number;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    thead: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    time: {
      datetime?: string;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    title: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    tr: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    track: { src?: string; kind?: string; srclang?: string; label?: string };
    u: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    ul: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    var: {
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    video: {
      src?: string;
      width?: number;
      height?: number;
      controls?: boolean;
      children?:
        | string
        | number
        | JSX.Element
        | JSX.Element[]
        | null
        | undefined;
    };
    wbr: object;
  }
}
