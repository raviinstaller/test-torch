import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    if (
      request.cookies.get("loggedIn").value &&
      request.cookies.get("userId").value
    ) {
      const docSnap = await getDoc(
        doc(db, "users", request.cookies.get("userId").value)
      );
      if (docSnap.exists()) {
        return NextResponse.json({ data: docSnap.data() });
      } else {
        return NextResponse.json(
          { message: "User not found" },
          { status: 404 }
        );
      }
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong..." },
      { status: 404 }
    );
  }
}
