import { PageContent, PageSettings } from "./schema";

export const DEMO_SETTINGS: PageSettings = {
  accentColor: "#3b82f6",
  fontFamily: "sans",
  siteName: "SaaS Demo",
};

export const DEMO_CONTENT: PageContent = {
  sections: [
    {
      id: "demo-hero",
      type: "hero",
      data: {
        headline: "The Future of Your Business Starts Here",
        subheadline: "Stop wasting time on repetitive tasks and start growing your revenue with our all-in-one platform.",
        ctaText: "Get Started Now",
        ctaUrl: "#",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426",
      },
    },
    {
      id: "demo-features",
      type: "features",
      data: [
        { id: "f1", title: "Blazing Fast", description: "Built on Next.js 15 for peak performance and SEO out of the box." },
        { id: "f2", title: "Theme Engine", description: "Switch between professional themes with a single click." },
        { id: "f3", title: "Drag & Drop", description: "Manage your content easily with our visual builder interface." },
      ],
    },
    {
      id: "demo-pricing",
      type: "pricing",
      data: [
        { id: "p1", tierName: "Starter", price: "$0", features: ["1 Landing Page", "Community Support", "Modern Theme"], isPopular: false, ctaText: "Free Forever", ctaUrl: "#" },
        { id: "p2", tierName: "Pro", price: "$49", features: ["Unlimited Pages", "Priority Support", "All Themes", "Custom Domain"], isPopular: true, ctaText: "Go Pro", ctaUrl: "#" },
        { id: "p3", tierName: "Enterprise", price: "Custom", features: ["Dedicated Account Manager", "SSO", "SLA"], isPopular: false, ctaText: "Contact Us", ctaUrl: "#" },
      ],
    },
    {
      id: "demo-testimonials",
      type: "testimonials",
      data: [
        { id: "t1", author: "Sarah Johnson", role: "Marketing Director", quote: "This tool has completely changed how we launch new products. We can now go from idea to live page in minutes.", imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400" },
        { id: "t2", author: "Mark Chen", role: "SaaS Founder", quote: "The theme engine is incredible. Our conversion rate increased by 20% after switching to the Bold theme.", imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" },
      ],
    },
    {
      id: "demo-faq",
      type: "faq",
      data: [
        { id: "q1", question: "Can I use my own domain?", answer: "Yes! On the Pro plan, you can connect as many custom domains as you want." },
        { id: "q2", question: "How many sections can I add?", answer: "There is no limit to the number of sections you can add to your landing page." },
      ],
    },
    {
      id: "demo-lead",
      type: "lead-form",
      data: {
        title: "Ready to Start?",
        description: "Join over 1,000 businesses growing with our platform.",
        ctaText: "Claim Your Discount",
        successMessage: "Thanks! We'll be in touch.",
        requireEmail: true,
        requirePhone: false,
        requireMessage: false,
      },
    },
  ],
  header: {
    logoText: "SaaSBuilder",
    links: [
      { label: "Features", url: "#demo-features" },
      { label: "Pricing", url: "#demo-pricing" },
      { label: "FAQ", url: "#demo-faq" },
    ],
  },
  footer: {
    copyrightText: "© 2026 SaaS Builder Inc. All rights reserved.",
    socialLinks: [
      { platform: "Twitter", url: "https://twitter.com" },
      { platform: "GitHub", url: "https://github.com" },
    ],
  },
};
