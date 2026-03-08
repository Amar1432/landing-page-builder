import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return NextResponse.json({ success: false, error: "Prompt is required" }, { status: 400 });
    }

    // In a real implementation, you would call OpenAI/Gemini API here.
    // For this demo, we'll return a structured template based on the prompt.
    
    const sections = [
      {
        id: "ai-hero",
        type: "hero",
        data: {
          headline: `Welcome to ${prompt.split(' ').slice(0, 3).join(' ')}`,
          subheadline: `The intelligent solution for ${prompt}. Scale your business faster with our automated platform.`,
          ctaText: "Get Started",
          ctaUrl: "#",
          imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
        },
      },
      {
        id: "ai-features",
        type: "features",
        data: [
          { id: "f1", title: "Automated Workflow", description: "Streamline your processes with our advanced AI-driven automation tools." },
          { id: "f2", title: "Real-time Analytics", description: "Monitor your growth with deep insights and live data visualization." },
          { id: "f3", title: "Global Scale", description: "Deploy your solution worldwide with our distributed edge infrastructure." },
        ],
      },
      {
        id: "ai-testimonials",
        type: "testimonials",
        data: [
          { id: "t1", author: "Alex Rivera", role: "Early Adopter", quote: "This platform is exactly what I needed. The AI generation is a game changer.", imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" },
        ],
      },
      {
        id: "ai-lead",
        type: "lead-form",
        data: {
          title: "Want to Learn More?",
          description: `Enter your details to get a personalized demo of ${prompt}.`,
          ctaText: "Request Demo",
          requireEmail: true,
          requirePhone: true,
          requireMessage: false,
        },
      },
    ];

    return NextResponse.json({ success: true, data: { sections } });
  } catch (err) {
    console.error("AI Generation error:", err);
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
  }
}
