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
        orderBy: { createdAt: "desc" },
        where:  { id: ctx.session.user.id },
      });
    console.log(todos);
    return [
        {
            id: 1,
            name: "test",
            createdAt: new Date(),
            updatedAt: new Date(),
            done: false,
        },
        {
            id: 2,
            name: "test2",
            createdAt: new Date(),
            updatedAt: new Date(),
            done: true,
        }
    ]
  }),

});
