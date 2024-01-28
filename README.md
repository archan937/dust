# hydrogen.js

A minimalistic reactive Javascript library for building dynamic component-based interfaces

## Introduction

Why the name `hydrogen.js`?

Well, here is what ChatGPT answered to my question: `"What is the smallest reactive element?"`:

> The smallest reactive element is hydrogen. It is the lightest and simplest element, with the atomic number 1 and symbol H. Hydrogen is highly reactive and can form compounds with various other elements. It is the most abundant element in the universe and plays a crucial role in various chemical reactions and processes.

As I was searching for a static single HTML page solution for another project I was working on, I obviously started with [React](https://react.dev) but I was concerned about inefficient rerendering of components as I need to update state at a very high rate.

The second attempt was to use [SolidJS](https://www.solidjs.com) which was a bit more difficult to use on a static HTML page and also, not being able to use destructuring of state was a bit disappointing.

So in order to comply with the requirements of my other project and also for the sake of fun and learning new things, I started with `hydrogen.js`.

To be clear! `hydrogen.js` is NOT meant to fulfill all the expectations of a drop-in replacement for `React`, `SolidJS` or [styled-components](https://styled-components.com). It just fulfills the basic functionality that I need to for use in a static single HTML page.

## Features

- Run `hydrogen.js` on a static HTML page
- Constraints for reactive behaviour is minimized as much as possible (why trouble the developer?)
- Components are JSX based
- Components are only called once (just like SolidJS)
- A `styled-components`-like way of adding styling to components

Enjoy the library! I would love to receive a shoutout and/or your feedback ;)

## Installation

Include `hydrogen.js` using a `<script>` tag:

```
  <script src="../dist/hydrogen.js"></script>
```

## Contact me

For support, remarks and requests, please mail me at [pm_engel@icloud.com](mailto:pm_engel@icloud.com).

## License

Copyright (c) 2024 Paul Engel, released under the MIT License

http://github.com/archan937 – http://twitter.com/archan937 – [pm_engel@icloud.com](mailto:pm_engel@icloud.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
