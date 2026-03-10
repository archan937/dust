declare module 'https://esm.sh/react@19' {
  export { default, useState, useRef, createElement, Fragment } from 'react';
}

declare module 'https://esm.sh/react-dom@19/client' {
  export { createRoot } from 'react-dom/client';
}

declare module 'https://esm.sh/react-dom@19' {
  export { flushSync } from 'react-dom';
}
