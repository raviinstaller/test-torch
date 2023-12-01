import { db } from "@/firebase";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (request.cookies.get("loggedIn").value) {
    const userId = request.cookies.get("userId").value;

    const testId = new URL(request.url).searchParams.get("id");

    try {
      const snap = await getDoc(doc(db, "submissions", testId));
      const submission = snap.data();

      return NextResponse.json({ data: submission });
    } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 404 });
    }
  }
}

export async function POST(request) {
  if (request.cookies.get("loggedIn").value) {
    const body = await request.json();

    try {
      await addDoc(collection(db, "submissions"), body);
      return NextResponse.json({ message: "Submission saved successfully..." });
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
