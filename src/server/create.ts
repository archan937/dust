import { createServer, IncomingMessage, ServerResponse } from "http";

import { PORT } from "src/utils";

export type Request = IncomingMessage & { url: string };
export type Response = [number, string | Uint8Array, Record<string, string>?];
export type Handler = (req: Request) => Promise<Response>;

export const create = (handler: Handler): number => {
  const server = createServer(
    async (req: IncomingMessage, res: ServerResponse) => {
      try {
        const [statusCode, body, headers = {}] = await handler(req as Request);
        const defaultContentType =
          typeof body === "string" ? "text/plain" : "application/octet-stream";
        headers["Content-Type"] = headers["Content-Type"] ?? defaultContentType;
        res.writeHead(statusCode, headers);
        res.end(body);
      } catch (error) {
        console.error("Error in handler:", error);
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Server Error");
      }
    },
  );

  server.listen(PORT);
  process.once("SIGINT", () => server.close());
  process.once("SIGTERM", () => server.close());

  const address = server.address();
  if (typeof address === "string" || address === null) {
    throw new Error("Server address is not a net.AddressInfo object");
  }

  return address.port;
};
