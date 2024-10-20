"use server";

import { authedProcedure } from "@/lib/procedures";
import { userSchema } from "@/app/(private)/usuarios/_schemas/user-schema";

export const createUser = authedProcedure
  .createServerAction()
  .input(userSchema)
  .handler(({ ctx, input }) => {
    console.log(ctx, input);
  });
