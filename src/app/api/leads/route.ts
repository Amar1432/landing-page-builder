import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { pageId, name, email, phone, message, data } = body;

    if (!pageId || !name || !phone) {
      return NextResponse.json({ success: false, error: "Missing required fields: Page ID, Name, and Phone are mandatory." }, { status: 400 });
    }

    const lead = await prisma.lead.create({
      data: {
        pageId,
        name,
        email,
        phone,
        message,
        data: data || {},
      },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
