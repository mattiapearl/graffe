import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const positionRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.position.findMany();
    }),
});
