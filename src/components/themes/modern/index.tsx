import { ThemeComponents } from '../types';

export const ModernTheme: ThemeComponents = {
  Layout: ({ children, settings }) => {
    const fontClass = settings?.fontFamily === 'serif' ? 'font-serif' : settings?.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
    return (
      <div className={`min-h-screen bg-white text-slate-900 ${fontClass} shadow-lg`} style={{ '--accent': settings?.accentColor || '#3b82f6' } as React.CSSProperties}>
        <nav className="p-4 bg-slate-50 border-b flex justify-between items-center text-sm font-semibold sticky top-0 z-50">
          <span style={{ color: 'var(--accent)' }}>{settings?.siteName || '[Modern Theme]'}</span>
        </nav>
        <main>{children}</main>
      </div>
    );
  },
  blocks: {
    hero: ({ headline, subheadline, ctaText, ctaUrl }) => (
      <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <h1 className="text-5xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--accent)' }}>{headline}</h1>
        {subheadline && <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">{subheadline}</p>}
        <a href={ctaUrl} className="inline-block text-white font-medium px-8 py-4 rounded-full shadow-md transition hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
          {ctaText}
        </a>
      </section>
    ),
    features: ({ items }) => (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item) => (
            <div key={item.id} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-4" style={{ color: 'var(--accent)' }}>{item.title}</h3>
              <p className="text-slate-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    pricing: ({ items }) => (
      <section className="py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className={`p-8 rounded-3xl ${item.isPopular ? 'ring-4 ring-offset-4 ring-offset-slate-900 transform scale-105' : 'bg-slate-800'}`} style={item.isPopular ? { backgroundColor: 'var(--accent)', ringColor: 'var(--accent)' } as React.CSSProperties : {}}>
              <h3 className="text-2xl font-bold mb-2">{item.tierName}</h3>
              <div className="text-4xl font-extrabold mb-8">{item.price}</div>
              <ul className="space-y-4 mb-8">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-slate-100">
                    <span className="opacity-70">✓</span> {feature}
                  </li>
                ))}
              </ul>
              <a href={item.ctaUrl} className="block w-full text-center py-3 rounded-full bg-white text-slate-900 font-bold hover:bg-slate-100 transition">
                {item.ctaText}
              </a>
            </div>
          ))}
        </div>
      </section>
    ),
    faq: ({ items }) => (
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {items.map((item) => (
            <div key={item.id} className="pb-6 border-b border-slate-200">
              <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--accent)' }}>{item.question}</h4>
              <p className="text-slate-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    ),
  },
  Footer: ({ copyrightText, socialLinks }) => (
    <footer className="py-12 bg-slate-50 border-t text-center text-slate-500">
      <p className="mb-4">{copyrightText}</p>
      {socialLinks && socialLinks.length > 0 && (
        <div className="flex justify-center gap-6">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.url} className="hover:text-slate-900 transition">{link.platform}</a>
          ))}
        </div>
      )}
    </footer>
  ),
};
