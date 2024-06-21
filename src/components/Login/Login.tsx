"use client";
// import { login } from "@/lib/lib";
import { useFormState } from "react-dom";
import loginAction from "./loginAction";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Login(){
  const router = useRouter()
  const [error, formAction] = useFormState(loginAction, undefined);

  return (
    <div className="flex items-center justify-center">
      <form
        action={formAction}
        className="p-[50px] rounded-[10px] w-[500px] h-[500px] flex flex-col items-center justify-center gap-[30px] my-0 mx-auto"
      >
        <h1 className="text-white text-xl">Login</h1>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="w-full p-[30px] border-[2px] border-[solid] border-[#2e374a] rounded-[5px] text-white bg-transparent"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          className="w-full p-[30px] border-[2px] border-[solid] border-[#2e374a] rounded-[5px] bg-transparent text-white"
        />
        <button
          type="submit"
          className="w-full p-[30px] bg-[#7b5ef8] text-white rounded-[5px] border-0 cursor-pointer text-sm"
        >
          Login
        </button>

        {error && <p className="text-[red]">{error}</p>}
      </form>
    </div>
  );
};

