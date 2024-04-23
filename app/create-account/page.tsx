"use client";

import Button from "@/components/button";
import Input from "@/components/input";
// import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { createAccount } from "@/app/lib/actions";
import Link from "next/link";

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);
  return (
    <div className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to join!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="Password"
          minLength={4}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="Confirm Password"
          required
          minLength={4}
          errors={state?.fieldErrors.confirm_password}
        />
        <Input
          name="name"
          type="text"
          placeholder="name"
          required
          errors={state?.fieldErrors.name}
          minLength={3}
          maxLength={10}
        />        
        <Button text="Create account" />
      </form>
      <div className="flex flex-col items-center gap-3 w-full">
        <span>이미 계정이 있다면</span>
        <Link href="/log-in" className="primary-btn text-lg py-2.5">
          로그인
        </Link>
      </div>
    </div>
  );
}