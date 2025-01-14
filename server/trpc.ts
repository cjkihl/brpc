import { TRPCError, initTRPC } from "@trpc/server";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { ZodError } from "zod";

/**
 * Here you create a context object that is passed to every procedure.
 * Use this to store session data, user data, or any other data you need
 * In this example, we parse the Bearer token from the request headers
 */
export const createContext = async ({ req }: FetchCreateContextFnOptions) => {
	// Example of how to use context. Here we parse the Bearer token
	const token = req.headers.get("authorization")?.replace("Bearer ", "");
	return { token };
};

type Context = Awaited<ReturnType<typeof createContext>>;

/**
 * Initialize tRPC with a custom error formatter for zod errors
 */
export const trpc = initTRPC.context<Context>().create({
	errorFormatter(opts) {
		const { shape, error } = opts;
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === "BAD_REQUEST" && error.cause instanceof ZodError
						? error.cause?.flatten()
						: null,
			},
		};
	},
});

/**
 * Example TRPC middlewar that enforces a valid bearer token.
 * In a real application, you would use a more secure method to verify tokens
 */
const enforceValidToken = trpc.middleware(({ ctx, next }) => {
	if (!ctx.token) {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "You need a bearer token to use this feature",
		});
	}

	if (ctx.token !== "secret") {
		throw new TRPCError({
			code: "UNAUTHORIZED",
			message: "Invalid token",
		});
	}

	return next({
		ctx,
	});
});

/**
 * Example TRPC middleware that logs the time taken to run a procedure
 * Useful for debugging performance issues
 */
const logTime = trpc.middleware(async ({ ctx, next, path, type }) => {
	const start = performance.now(); // get start time
	const response = next({ ctx }); // call the next middleware or procedure
	const end = performance.now(); // get end time
	const timeTaken = Number(end - start) / 1e6; // calculate time taken in milliseconds
	console.log(`Procedure ${type} ${path} took ${timeTaken} ms`);
	return response;
});

/**
 * Public (unauthed) procedure
 *
 * This is the base piece you use to build new queries and mutations on your
 * tRPC API. It does not guarantee that a user querying is authorized, but you
 * can still access user session data if they are logged in
 *
 * @see https://trpc.io/docs/procedures
 */
export const publicProcedure = trpc.procedure.use(logTime);

/**
 * Protected (authed) procedure
 *
 * If you want a query or mutation to ONLY be accessible to logged in users, use
 * this. It verifies the session is valid and guarantees ctx.session.user is not
 * null
 *
 * @see https://trpc.io/docs/procedures
 */
export const protectedProcedure = publicProcedure.use(enforceValidToken);
