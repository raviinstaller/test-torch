"use client";
import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "@/context/AuthContext";
import { ThemeContext } from "@/context/ThemeContext";

const Navbar = () => {
  const { user, googleSignOut } = useContext(AuthContext);
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="navbar border-b border-base-300">
        <div className="flex-1">
          <Link href={"/"}>
            <Image
              src={"/logo.svg"}
              height={40}
              width={145}
              alt="logo"
              className="invert dark:invert-0"
            />
          </Link>
        </div>
        <div className="flex-none">
          <button className="btn btn-circle btn-ghost" onClick={toggleTheme}>
            <Image
              src={"/moon.svg"}
              height={24}
              width={24}
              alt="moon icon"
              className="invert hidden dark:block"
            />

            <Image
              src={"/sun.svg"}
              height={24}
              width={24}
              alt="sun icon"
              className="dark:hidden"
            />
          </button>
          <div className="dropdown dropdown-hover dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost flex">
              <div className="avatar">
                <div className="w-8 rounded-full">
                  <Image
                    src={user ? user.photoURL : "/loading.gif"}
                    height={32}
                    width={32}
                    className="av"
                    alt="profile picture"
                  />
                </div>
              </div>

              {user ? user.displayName : "Loading..."}
            </div>
            <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
              <button onClick={() => googleSignOut()} className="btn">
                Logout
              </button>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
