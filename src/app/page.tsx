import { getServerAuthSession } from "~/server/auth";
import { TodoList } from "./_components/TodoList";
import Auth from "./_components/Auth";

export default async function Home() {
  const session = await getServerAuthSession();

  if (!session?.user)
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <h1 className="text-3xl font-bold">Welcome to the DoTogether App</h1>
        <p className="text-xl">You are not logged in.</p>
        <Auth session={session} />
      </div>
    );

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <TodoList />
    </main>
  );
}
