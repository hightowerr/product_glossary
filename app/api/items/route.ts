import { NextRequest, NextResponse } from "next/server";
import { firestore } from "../utils/admin";

// GET Request: Fetch all items from Firestore
export async function GET() {
  try {
    const snapshot = await firestore.collection("terms").get();
    const items: any[] = [];

    snapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });

    return NextResponse.json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}

// POST Request: Add a new item to Firestore
export async function POST(request: NextRequest) {
  try {
    const body = await request.json(); // Parse the request body
    const { Term, Definition, Examples, "Real-Life Analogy": RealLifeAnalogy } = body;

    if (!Term || !Definition || !Examples || !RealLifeAnalogy) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const docRef = await firestore.collection("terms").add({
      Term,
      Definition,
      Examples,
      "Real-Life Analogy": RealLifeAnalogy,
    });

    return NextResponse.json({ message: "Item added successfully", id: docRef.id });
  } catch (error) {
    console.error("Error adding item:", error);
    return NextResponse.json({ error: "Failed to add item" }, { status: 500 });
  }
}
