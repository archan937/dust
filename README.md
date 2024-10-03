# Dust

A minimalistic reactive Javascript library for building dynamic state component-based interfaces

## Introduction

Why the name (radioactive) `Dust`?

Well, I was overthinking a new name for this repo together with ChatGPT keep the essence of the library and I suggested `dust`. Here is how ChatGPT responded:

> Dust as a concept can actually work really well for a library name, especially if you're looking for something that evokes subtle power or widespread impact. Here's how Dust could fit your needs:
>
> Why "Dust"?
>
> Lightweight & Pervasive: Dust is small, lightweight, and gets everywhere, which aligns perfectly with a library that's fast, nimble, and efficient. It suggests something that quietly infiltrates and affects everything in its path.
>
> Subtle Yet Powerful: In a radioactive or hazardous context, dust can carry powerful substances (like radioactive particles), spreading them far and wide. This could symbolize the wide-reaching efficiency or impact of your library.
>
> Transformative: Dust can accumulate and change environments over time, symbolizing the gradual but powerful impact of your small library in applications.
>
> Simple & Memorable: "Dust" is short, easy to remember, and has an interesting dual meaning — it can be harmless but, under certain conditions, extremely hazardous or reactive, just like your library might be small but powerful.

I was searching for a static single HTML page solution for another project I was working on, I obviously started with [React](https://react.dev) but I was concerned about inefficient rerendering of components as I need to update state at a very high rate.

The second attempt was to use [SolidJS](https://www.solidjs.com) which was a bit more difficult to use on a static HTML page and also, not being able to use destructuring of state was a bit disappointing.

So in order to comply with the requirements of my other project and also for the sake of fun and learning new things, I started with `dust`.

To be clear! `dust` is NOT meant to fulfill all the expectations of a drop-in replacement for `React`, `SolidJS` or [styled-components](https://styled-components.com). It just fulfills the basic functionality that I need to for use in a static single HTML page.

> [NOTE: October 1st, 2024]
>
> I decided to revamp the entire codebase and went the other way first, which is being able to run a `dev` server (and generate a `build`) as with React or any other similar library. I dropped QUnit and am sticking closely to Bun (FTW). Once satisfied, I will be making Dust static HTML page compatible again ^^

## Features

- Constraints for reactive behaviour is minimized as much as possible (why trouble the developer?)
- Components are JSX based
- Components are only called once (just like SolidJS)
- The expected package script commands:
  - `dust dev`
  - `dust build`
  - `dust preview`
- Routing similar to `react-router-dom`
- Routing similar to `Next.js`
- A `styled-components`-like way of adding styling to components [SOON]
- Router layout components and route params [SOON]
- Additional React hooks like useEffect, useRef, etc. [SOON]
- Import `dust` in a static HTML page (no Node.js or Bun needed) [SOON]

Enjoy the library! I would love to receive a shoutout and/or your feedback ;)

## Try out the example app

First, install [Bun](https://bun.sh/) and follow these commands:

```bash
$ git clone git@github.com:archan937/dust.git
$ cd dust
$ bun i
$ bun link
$ cd example
$ bun i
$ bun dev
```

Now you can visit the application at [http://localhost:3000](http://localhost:3000) in your browser.

## Contact me

For support, remarks and requests, please mail me at [pm_engel@icloud.com](mailto:pm_engel@icloud.com).

## License

Copyright (c) 2024 Paul Engel, released under the MIT License

http://github.com/archan937 – http://twitter.com/archan937 – [pm_engel@icloud.com](mailto:pm_engel@icloud.com)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
