/// <reference types="@cloudflare/workers-types" />

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

// Cloudflare Workers entry point — serves static assets from ./dist
export default {
  async fetch(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
    // The [assets] binding serves files from ./dist automatically.
    // This handler provides SPA fallback: any unmatched path gets index.html.
    const url = new URL(request.url);
    if (url.pathname.includes(".")) {
      // Let assets binding handle static files
      return env.ASSETS.fetch(request);
    }
    // SPA fallback: serve index.html for all other routes
    return env.ASSETS.fetch(new Request(new URL("/index.html", url.origin), request));
  },
} satisfies ExportedHandler<Env>;
