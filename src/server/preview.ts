import fs from "node:fs";
import path from "node:path";

import { getContentType, ROOT } from "src/utils";

import { create, type Request, type Response } from "./create";

export const preview = (): number =>
  create(async (req: Request): Promise<Response> => {
    const url = new URL(req.url ?? "");
    const pathname = url.pathname.replaceAll("..", "");

    const file = path.join(ROOT, "dist", pathname);
    const stats = fs.existsSync(file) && fs.statSync(file);

    if (stats && stats.isFile?.()) {
      const contentType = getContentType(file);
      return [
        200,
        await Bun.file(file)[
          contentType === "application/octet-stream" ? "bytes" : "text"
        ](),
        { "Content-Type": contentType },
      ];
    }

    return [
      200,
      await Bun.file(path.join(ROOT, "dist", "index.html")).text(),
      { "Content-Type": "text/html" },
    ];
  });
