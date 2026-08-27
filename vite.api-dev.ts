import type { IncomingMessage, ServerResponse } from "node:http";
import type { Plugin, ViteDevServer } from "vite";

const API_ROUTES = new Set([
  "generate",
  "download",
  "waitlist",
  "me",
  "create-checkout",
  "confirm-checkout",
]);

function readBody(req: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) {
        resolve(undefined);
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        resolve(undefined);
      }
    });
    req.on("error", reject);
  });
}

function createResAdapter(res: ServerResponse) {
  let statusCode = 200;

  const adapter = {
    status(code: number) {
      statusCode = code;
      return {
        json(body: unknown) {
          if (res.headersSent) return;
          res.statusCode = statusCode;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify(body));
        },
        end(body?: unknown) {
          if (res.headersSent) return;
          res.statusCode = statusCode;
          if (body !== undefined) res.end(body);
          else res.end();
        },
      };
    },
    setHeader(name: string, value: string) {
      res.setHeader(name, value);
      return adapter;
    },
    end(body?: unknown) {
      if (res.headersSent) return;
      res.statusCode = statusCode;
      if (body !== undefined) res.end(body);
      else res.end();
    },
  };

  return adapter;
}

async function handleApiRequest(server: ViteDevServer, req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url || "/", "http://localhost");
  const route = url.pathname.slice("/api/".length);
  if (!API_ROUTES.has(route)) {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Not found" }));
    return;
  }

  const mod = await server.ssrLoadModule(`/api/${route}.ts`);
  const handler = mod.default;
  if (typeof handler !== "function") {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "API handler is missing." }));
    return;
  }

  const headers: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(req.headers)) {
    headers[key] = Array.isArray(value) ? value[0] : value;
  }

  const query = Object.fromEntries(url.searchParams.entries());
  const body =
    req.method && !["GET", "HEAD"].includes(req.method) ? await readBody(req) : undefined;

  await handler({ method: req.method, headers, body, query }, createResAdapter(res));
}

/** Run Vercel-style api/*.ts handlers during `vite dev`. */
export function apiDevPlugin(): Plugin {
  return {
    name: "api-dev",
    apply: "serve",
    configureServer(server) {
      const middleware = async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        const pathname = (req.url || "").split("?")[0];
        if (!pathname?.startsWith("/api/")) return next();

        try {
          await handleApiRequest(server, req, res);
        } catch (err) {
          if (!res.headersSent) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(
              JSON.stringify({
                error: err instanceof Error ? err.message : "API request failed.",
              }),
            );
          }
        }
      };

      server.middlewares.stack.unshift({ route: "", handle: middleware });
    },
  };
}
