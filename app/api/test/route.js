import { db } from "@/firebase";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (request.cookies.get("loggedIn").value) {
    const testId = new URL(request.url).searchParams.get("id");

    try {
      const snap = await getDoc(doc(db, "tests", testId));
      const test = snap.data();

      return NextResponse.json({ data: { ...test, id: testId } });
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

export async function POST(request) {
  if (request.cookies.get("loggedIn").value) {
    const body = await request.json();
    const testId = new URL(request.url).searchParams.get("id");

    try {
      if (testId) {
        await setDoc(doc(db, "tests", testId), body);
      } else {
        await addDoc(collection(db, "tests"), body);
      }
      return NextResponse.json({ message: "Test saved successfully..." });
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

export async function DELETE(request) {
  if (request.cookies.get("loggedIn").value) {
    const testId = new URL(request.url).searchParams.get("id");
    try {
      if (testId) {
        await deleteDoc(doc(db, "tests", testId));
      }
      return NextResponse.json({ message: "Test deleted successfully..." });
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
