import fs from "node:fs";
import path from "node:path";

import { bundle } from "src/bundler";
import { getContentType, ROOT } from "src/utils";

import { create, type Request, type Response } from "./create";

export const dev = (): number =>
  create(async (req: Request): Promise<Response> => {
    const url = new URL(`http://${req.headers.host}${req.url}`);
    const pathname = url.pathname.replaceAll("..", "");

    if (pathname === "/sw.js") {
      return [
        200,
        "function SW() {}",
        { "Content-Type": "application/javascript" },
      ];
    }

    if (pathname.match(/\.(j|t)sx?$/)) {
      try {
        return [
          200,
          await bundle(path.join(ROOT, pathname)),
          { "Content-Type": "application/javascript" },
        ];
      } catch (error) {
        console.error(`Error serving file ${pathname}:`, error);
        return [500, "Error processing file"];
      }
    }

    let file = path.join(ROOT, pathname);
    if (!fs.existsSync(file)) {
      file += "/index.html";
    }

    const stats = fs.existsSync(file) && fs.statSync(file);
    if (stats && stats.isFile?.()) {
      const contentType = getContentType(file);
      return [
        200,
        fs.readFileSync(
          file,
          contentType === "application/octet-stream" ? null : "utf8",
        ),
        { "Content-Type": contentType },
      ];
    }

    return [
      200,
      fs.readFileSync(path.join(ROOT, "index.html"), "utf8"),
      { "Content-Type": "text/html" },
    ];
  });
