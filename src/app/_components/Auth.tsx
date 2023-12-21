"use client";
import type { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import React from "react";

interface Props {
  session: Session | null;
}

export default function Auth({ session }: Props) {
  return (
    <button
      className="rounded-lg bg-black px-4 py-2 text-white"
      onClick={session ? () => signOut() : () => signIn()}
    >
      {session ? "Sign out" : "Sign in"}
    </button>
  );
}
