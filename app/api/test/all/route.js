import { db } from "@/firebase";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function GET(request) {
  if (
    request.cookies.get("loggedIn") &&
    request.cookies.get("loggedIn").value
  ) {
    const userId = request.cookies.get("userId").value;
    try {
      const docSnap = await getDocs(
        query(collection(db, "tests"), where("userId", "==", userId))
      );

      let arr = [];

      docSnap.forEach((doc) => {
        arr.push({
          ...doc.data(),
          id: doc.id,
          questionsCount: doc.data().questions.length,
        });
      });

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
