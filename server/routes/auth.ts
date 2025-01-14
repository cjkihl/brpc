import { z } from "zod";
import { publicProcedure, trpc } from "../trpc";

/**
 * Example tRPC sub-router with one public procedure (login)
 */
export const authRoute = trpc.router({
  login: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      // Mock login procedure that only accepts one email and password
      if (input.email === "foo.bar@gmail.com" && input.password === "1234") {
        return {
          success: true,
          message: "You are logged in!",
        };
      }
      return {
        success: false,
        message: "Invalid email or password",
      };
    }),
});
