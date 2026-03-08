import { NextResponse } from "next/server";
import { z } from "zod";
import { PageContentSchema, SectionTypeSchema } from "@/lib/schema";

const GenerateRequestSchema = z.object({
    prompt: z.string().min(3),
    sectionType: SectionTypeSchema.optional(),
});

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { prompt, sectionType } = GenerateRequestSchema.parse(body);

        const apiKey = process.env.OPENAI_API_KEY;

        if (!apiKey) {
            return NextResponse.json({
                success: false,
                error: "AI Generation is not configured. Missing OPENAI_API_KEY."
            }, { status: 503 });
        }

        // Prepare robust system instructions to ensure pure JSON output matching our Zod schema
        const systemInstruction = `You are an expert SaaS landing page copywriter and structured data generator. 
Your task is to generate high-converting landing page content based on the user's prompt.
You MUST respond with ONLY valid JSON. Do not use markdown blocks like \`\`\`json. Just raw parsable JSON.

The JSON structure depends on the request:
If sectionType is provided, generate data for just that block.
If NO sectionType is provided, generate an entire PageContent object containing a hero, features, pricing, and FAQ section.

Schema definition guidelines:
- hero: { headline: string, subheadline?: string, ctaText: string, ctaUrl: string }
- features: { items: [{ id: string(unique), title: string, description: string }] }
- pricing: { items: [{ id: string(unique), tierName: string, price: string, features: string[], ctaText: string, ctaUrl: string, isPopular: boolean }] }
- faq: { items: [{ id: string(unique), question: string, answer: string }] }
- lead_form: { heading: string, description: string, submitText: string }
- testimonials: { items: [{ id: string(unique), name: string, role: string, quote: string }] }

For a full page, return: { sections: [{ id: string, type: string, data: object }] }`;

        const userMessage = sectionType
            ? `Generate a "${sectionType}" section for an app about: ${prompt}`
            : `Generate a full SaaS landing page for an app about: ${prompt}`;

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemInstruction },
                    { role: "user", content: userMessage }
                ],
                temperature: 0.7,
                response_format: { type: "json_object" }
            }),
        });

        if (!response.ok) {
            throw new Error(`OpenAI API Error: ${response.status}`);
        }

        const aiData = await response.json();
        const generatedJson = JSON.parse(aiData.choices[0].message.content);

        // Provide some validation or fallback mapping if needed here before returning
        // For now we assume the prompt engineering ensures schema alignment due to response_format=json_object

        return NextResponse.json({ success: true, data: generatedJson });
    } catch (error) {
        console.error("[AI Generate Error]", error);
        if (error instanceof z.ZodError) {
            return NextResponse.json({ success: false, error: "Invalid request payload" }, { status: 400 });
        }
        return NextResponse.json({ success: false, error: "Failed to generate content" }, { status: 500 });
    }
}
