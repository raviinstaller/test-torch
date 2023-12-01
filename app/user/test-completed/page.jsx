"use client";

import { AuthContext } from "@/context/AuthContext";
import Image from "next/image";
import { useContext } from "react";

export default function TestCompleted() {
  const { googleSignOut } = useContext(AuthContext);

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
          <h2 className="card-title">Test Completed</h2>
          <p>
            Thankyou for giving test. Your teacher will provide you your result.
          </p>
          <div className="card-actions mt-4">
            <button onClick={googleSignOut} className="btn btn-primary">
              Logout & close window
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
