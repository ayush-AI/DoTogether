import {z} from "zod";

export const todoInput = z.string({
    required_error: "Please enter a todo",
}).min(1)