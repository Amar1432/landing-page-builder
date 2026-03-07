import { PrismaClient } from '@prisma/client'
import { Pool } from 'pg'
import { PrismaPg } from '@prisma/adapter-pg'

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
const adapter = new PrismaPg(pool)

const prisma = new PrismaClient({ adapter })

async function main() {
    const user = await prisma.user.upsert({
        where: { email: 'test@example.com' },
        update: {},
        create: {
            email: 'test@example.com',
            name: 'Amarjeet',
        },
    })

    await prisma.page.upsert({
        where: { slug: 'awesome-saas' },
        update: {},
        create: {
            userId: user.id,
            title: 'My Awesome SaaS',
            slug: 'awesome-saas',
            themeId: 'modern',
            isPublished: true,
            content: {
                hero: {
                    headline: "Build Faster with SaaS Builder",
                    subheadline: "The easiest way to create and manage your landing pages without writing code.",
                    ctaText: "Get Started Free",
                    ctaUrl: "#pricing"
                },
                features: [
                    { id: "f1", title: "Visual Editor", description: "See your changes in real-time." },
                    { id: "f2", title: "Theme Engine", description: "Switch between gorgeous themes instantly." },
                    { id: "f3", title: "Fast Performance", description: "Next.js routing edge-ready out of the box." },
                ],
                pricing: [
                    { id: "p1", tierName: "Starter", price: "Free", features: ["1 Page", "Basic Theme"], isPopular: false, ctaText: "Start Free", ctaUrl: "#" },
                    { id: "p2", tierName: "Pro", price: "$29/mo", features: ["Unlimited Pages", "Premium Themes", "Custom Domain"], isPopular: true, ctaText: "Upgrade to Pro", ctaUrl: "#" },
                ],
                faq: [
                    { id: "q1", question: "Can I use my own domain?", answer: "Yes, on the Pro plan you can connect any custom domain." }
                ],
                footer: {
                    copyrightText: "© 2026 SaaS Builder Inc. All rights reserved."
                }
            }
        }
    })

    await prisma.page.upsert({
        where: { slug: 'portfolio' },
        update: {},
        create: {
            userId: user.id,
            title: 'Minimal Portfolio',
            slug: 'portfolio',
            themeId: 'minimalist',
            isPublished: false,
            content: {
                hero: {
                    headline: "Jane Doe.",
                    subheadline: "Designer & Developer based in New York.",
                    ctaText: "View Work",
                    ctaUrl: "#work"
                },
                features: [
                    { id: "f1", title: "UX Design", description: "Crafting beautiful and functional user experiences." },
                    { id: "f2", title: "Frontend", description: "Building robust applications with React and Next.js." },
                ],
                pricing: [],
                faq: [],
                footer: {
                    copyrightText: "© 2026 Jane Doe."
                }
            }
        }
    })

    console.log('Database seeded successfully!')
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
