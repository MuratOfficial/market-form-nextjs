import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const forms = await prismadb.form.findMany();

    return NextResponse.json(forms);
  } catch (error) {
    console.log("[FORMS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(req: Request, id: string) {
  try {
    const form = await prismadb.form.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(form);
  } catch (error) {
    console.log("[FORM_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
