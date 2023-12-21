"use client";
import type { Todo } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";
import { api } from "~/trpc/react";

interface Props {
  todo: Todo;
}

export default function SingleTodo({ todo }: Props) {
  const router = useRouter();

  const deleteMutation = api.todo.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
  });

  const toggleMutation = api.todo.toggle.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <input
          className="focus:ring-3 h-4 w-4 cursor-pointer rounded border border-gray-300 bg-gray-50 focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
          type="checkbox"
          name="done"
          id={todo.id}
          checked={todo.done}
          onChange={(e) => {
            toggleMutation.mutate({ id: todo.id, done: e.target.checked });
          }}
        />
        <label
          htmlFor={todo.id}
          className={`cursor-pointer ${todo.done ? "line-through" : ""}`}
        >
          {todo.name}
        </label>
      </div>
      <button
        className="w-full rounded-lg bg-blue-700 px-2 py-1 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => {
          deleteMutation.mutate(todo.id);
        }}
      >
        Delete
      </button>
    </div>
  );
}
