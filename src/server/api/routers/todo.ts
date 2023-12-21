import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

import { todoInput } from "~/types/todo";

export const todoRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: protectedProcedure
    .input(todoInput)
    .mutation(async ({ ctx, input }) => {

      return ctx.db.todo.create({
        data: {
          name: input,
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

    delete: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.todo.delete({
        where: {
          id: input,
        },
      });
    }),

    toggle: protectedProcedure
    .input(z.object({ id: z.string(), done: z.boolean() }))
    .mutation(async ({ ctx, input: {id, done} }) => {

      return ctx.db.todo.update({
      where: {
        id: id,
      },
      data: {
        done: done,
      },
      });
    }),

  getAll: protectedProcedure.query(({ ctx }) => {
    const todos = ctx.db.todo.findMany({
        where:  { userId: ctx.session.user.id },
      });
    return todos;
  }),

});
