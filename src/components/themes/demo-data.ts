import { PageContent } from "@/lib/schema";

export const DEMO_CONTENT: PageContent = {
    sections: [
        {
            id: "demo-hero",
            type: "hero",
            data: {
                headline: "Ship Faster With SaaS Builder",
                subheadline: "The complete toolkit for launching your next big idea. Drag, drop, and deploy in minutes.",
                ctaText: "Start Building Free",
                ctaUrl: "#pricing",
            },
        },
        {
            id: "demo-features",
            type: "features",
            data: {
                items: [
                    {
                        id: "f1",
                        title: "Drag & Drop",
                        description: "Build pages visually without writing a single line of code.",
                    },
                    {
                        id: "f2",
                        title: "Swappable Themes",
                        description: "Change the entire look and feel of your site with one click.",
                    },
                    {
                        id: "f3",
                        title: "Edge Delivery",
                        description: "Deployed globally on Vercel's Edge Network for sub-10ms loads.",
                    },
                ]
            } as any,
        },
        {
            id: "demo-pricing",
            type: "pricing",
            data: {
                items: [
                    {
                        id: "p1",
                        tierName: "Hobby",
                        price: "$0",
                        features: ["1 Project", "Basic Themes", "Community Support"],
                        isPopular: false,
                        ctaText: "Start Free",
                        ctaUrl: "#",
                    },
                    {
                        id: "p2",
                        tierName: "Pro",
                        price: "$29",
                        features: ["Unlimited Projects", "Premium Themes", "Custom Domains", "Analytics"],
                        isPopular: true,
                        ctaText: "Go Pro",
                        ctaUrl: "#",
                    },
                ]
            } as any,
        },
        {
            id: "demo-faq",
            type: "faq",
            data: {
                items: [
                    {
                        id: "q1",
                        question: "Can I use my own domain?",
                        answer: "Yes! Pro users can connect custom domains easily.",
                    },
                    {
                        id: "q2",
                        question: "Is there a free trial?",
                        answer: "You can use the Hobby tier for free forever. Upgrade when you need more power.",
                    },
                ]
            } as any,
        },
        {
            id: "demo-lead",
            type: "lead-form",
            data: {
                title: "Get Early Access",
                description: "Join the waitlist to be notified when we launch.",
                ctaText: "Join Waitlist",
            } as any,
        },
        {
            id: "demo-testimonials",
            type: "testimonials",
            data: {
                items: [
                    {
                        id: "t1",
                        author: "Sarah Jenkins",
                        role: "Founder, TechStart",

                        quote: "I built my entire SaaS landing page in under an hour. Incredible tool.",
                    },
                    {
                        id: "t2",
                        name: "David Chen",
                        role: "Marketing Director",
                        quote: "The visual editor is so intuitive, and the produced code is lightning fast.",
                    },
                ]
            } as any,
        },
    ],
    footer: {
        copyrightText: "© 2026 SaaS Builder Inc. All rights reserved.",
    },
};
