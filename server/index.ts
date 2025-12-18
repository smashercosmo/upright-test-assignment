/**
 * This is the API-handler of your app that contains all your API routes.
 * On a bigger app, you will probably want to split this file up into multiple files.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { z } from "zod";
import { Pool } from "pg";

export function createContext() {
  return {
    db: pool,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;

const t = initTRPC.context<Context>().create();
const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  getCompany: t.procedure
    .input(
      z.object({
        companyId: z.number(),
      })
    )
    .output(
      z.object({
        id: z.number(),
        name: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.query("SELECT * FROM company WHERE id = $1", [
        input.companyId,
      ]);
      if (!result.rows.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Company could not be found.",
        });
      }
      return result.rows[0];
    }),
  getSDGConfidence: t.procedure
    .output(
      z.array(
        z.object({
          company_id: z.number(),
          company_name: z.string(),
          sdg_code: z.string(),
          sdg_name: z.string(),
          raw_score: z.string(),
          normalized_score: z.string(),
          confidence_band: z.string(),
        })
      )
    )
    .query(async ({ ctx }) => {
      const result = await ctx.db.query("SELECT * FROM company_sdg_confidence");
      return result.rows;
    }),
  getSDGSummary: t.procedure
    .output(
      z.array(
        z.object({
          product_name: z.string(),
          sdg_name: z.string(),
          revenue_share: z.string(),
          alignment: z.string(),
          score: z.number(),
          weighted_contribution: z.string(),
        })
      )
    )
    .input(
      z.object({
        companyId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const result = await ctx.db.query(
        `
          SELECT product_name, sdg_name, revenue_share, alignment, score, weighted_contribution
          FROM product_sdg_contribution
          WHERE company_id = $1
          ORDER BY weighted_contribution DESC
    `,
        [input.companyId]
      );
      return result.rows;
    }),
});

export type AppRouter = typeof appRouter;

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://upright_user:upright_password@localhost:5432/upright_db",
});

// create server
createHTTPServer({
  middleware: cors(),
  router: appRouter,
  createContext,
}).listen(2022);
