import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    //   const { userId } = auth();

    const body = await req.json();

    const { items, items1, work, hurry, username, tel, email } = body;

    //   if (!userId) {
    //     return new NextResponse("Unauthenticated", { status: 403 });
    //   }

    if (!items) {
      return new NextResponse("Items is required", { status: 400 });
    }

    if (!items1) {
      return new NextResponse("Items1 is required", { status: 400 });
    }

    if (!work) {
      return new NextResponse("Work is required", { status: 400 });
    }

    if (!hurry) {
      return new NextResponse("Hurry is required", { status: 400 });
    }
    if (!username) {
      return new NextResponse("Username is required", { status: 400 });
    }

    const form = await prismadb.form.create({
      data: {
        items,
        items1,
        work,
        hurry,
        username,
        tel,
        email,
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.log("[FORMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
