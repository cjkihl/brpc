type Handler = (req: Request) => Promise<Response>;

interface CorsOptions {
  origin?: string | string[];
  methods?: string[];
  headers?: string[];
  maxAge?: number;
  credentials?: boolean;
}

const defaultOptions: CorsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  headers: ["Content-Type", "Authorization"],
  maxAge: 3600,
  credentials: false,
};

function createCorsHeaders(options: CorsOptions): Headers {
  const headers = new Headers();
  const origin = Array.isArray(options.origin)
    ? options.origin.join(",")
    : options.origin;
  const methods = Array.isArray(options.methods)
    ? options.methods.join(",")
    : "*";
  const allowHeaders = Array.isArray(options.headers)
    ? options.headers.join(",")
    : "*";

  headers.set("Access-Control-Allow-Origin", origin || "*");
  headers.set("Access-Control-Allow-Methods", methods);
  headers.set("Access-Control-Allow-Headers", allowHeaders);
  headers.set("Access-Control-Max-Age", options.maxAge?.toString() || "3600");

  if (options.credentials) {
    headers.set("Access-Control-Allow-Credentials", "true");
  }

  return headers;
}

/**
 * CORS middleware for Bun server
 * @param handler - Request handler function
 * @param options - CORS configuration options
 */
export function cors(handler: Handler, options: CorsOptions = defaultOptions) {
  return async (req: Request): Promise<Response> => {
    const corsHeaders = createCorsHeaders(options);

    if (req.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      });
    }

    const response = await handler(req);
    const headers = new Headers(response.headers);

    corsHeaders.forEach((value, key) => {
      headers.set(key, value);
    });

    return new Response(response.body, {
      status: response.status,
      headers,
    });
  };
}
