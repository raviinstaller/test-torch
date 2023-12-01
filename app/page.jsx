"use client";

import { AuthContext } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";
import Image from "next/image";
import { useContext } from "react";

export default function Home() {
  const { googleSignIn } = useContext(AuthContext);

  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4 flex-col gap-5">
      <Image
        src={"/logo.svg"}
        height={40}
        width={145}
        alt="logo"
        className="invert dark:invert-0"
      />

      <div className="card w-full max-w-lg bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Login</h2>
          <p>Click on button below to login with Google.</p>
          <div className="card-actions mt-4">
            <button onClick={handleSignIn} className="btn btn-primary">
              <Image src={"/google.png"} height={24} width={24} alt="google" />
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
