"use client";

import { createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, average } from "firebase/firestore";
import { auth, db } from "@/firebase";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const router = useRouter();

  const googleSignIn = async (redirect) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const authuser = result.user;

      Cookies.set("loggedIn", true);
      Cookies.set("userId", authuser.uid);

      setUser(authuser, "authuser");

      router.push(redirect ? `/user/test/${redirect}` : "/creator/");

      setDoc(
        doc(db, "users", authuser.uid),
        JSON.parse(JSON.stringify(authuser))
      );
    });
  };

  const googleSignOut = () => {
    signOut(auth);
    Cookies.set("loggedIn", "");
    Cookies.set("userId", "");
    router.push("/");
  };

  useEffect(() => {
    const getData = async () => {
      if (Cookies.get("loggedIn")) {
        await fetch("/api/user")
          .then((res) => res.json())
          .then((data) => setUser(data.data))
          .catch((err) => console.log(err));
      }
    };
    getData();
  }, []);

  return (
    <AuthContext.Provider value={{ user, googleSignIn, googleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
};
