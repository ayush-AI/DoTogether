import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { CreateTodo } from "./create-todo";
import SingleTodo from "./todo";
import Auth from "./Auth";

export async function TodoList() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.todo.getAll.query();

  return (
    <div className="w-full max-w-xs">
      {latestPost.length === 0 ? (
        <p className="text-center text-gray-400">No todos yet</p>
      ) : (
        <div className="m-2 flex flex-col gap-4 p-5">
          {latestPost.map((todo) => (
            <SingleTodo session={session} key={todo.id} todo={todo} />
          ))}
        </div>
      )}
      <CreateTodo />

      <div className="absolute right-0 top-0 p-5">
        {session ? <Auth session={session} /> : null}
      </div>
    </div>
  );
}
