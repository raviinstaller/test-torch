import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (
    request.cookies.get("loggedIn") &&
    request.cookies.get("loggedIn").value
  ) {
    const testId = new URL(request.url).searchParams.get("id");

    try {
      const docSnap = await getDocs(
        query(collection(db, "submissions"), where("testId", "==", testId))
      );

      let arr = [];

      docSnap.forEach((doc) => arr.push({ ...doc.data(), id: doc.id }));

      return NextResponse.json({ data: arr });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
  } else {
    return NextResponse.json(
      { message: "user not logged in" },
      { status: 400 }
    );
  }
}
