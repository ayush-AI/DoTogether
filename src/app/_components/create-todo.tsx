"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "~/trpc/react";

export function CreateTodo() {
  const router = useRouter();
  const [name, setName] = useState("");

  const createPost = api.todo.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        createPost.mutate(name);
      }}
      className="flex flex-col gap-2"
    >
      <input
        type="text"
        placeholder="your todo"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1 w-full rounded-full px-4 py-2 text-black"
      />
      <button
        type="submit"
        className="mt-1 rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
        disabled={!name || createPost.isLoading}
      >
        {createPost.isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
