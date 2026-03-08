import { ThemeComponents } from '../types';

export const ModernTheme: ThemeComponents = {
  Layout: ({ children, settings }) => {
    const fontClass = settings?.fontFamily === 'serif' ? 'font-serif' : settings?.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
    return (
      <div className={`min-h-screen bg-white text-slate-900 ${fontClass} shadow-lg`} style={{ '--accent': settings?.accentColor || '#3b82f6' } as any}>
        <main>{children}</main>
      </div>
    );
  },
  Header: ({ logoText, links, settings }) => (
    <nav className="p-4 bg-white/90 backdrop-blur-md border-b flex justify-between items-center text-sm font-semibold sticky top-0 z-50">
      <span style={{ color: settings?.accentColor || 'var(--accent)' }}>{logoText}</span>
      <div className="flex gap-6">
        {links.map((link, i) => (
          <a key={i} href={link.url} className="text-slate-600 hover:text-slate-900 transition-colors">{link.label}</a>
        ))}
      </div>
    </nav>
  ),
  blocks: {
    hero: ({ headline, subheadline, ctaText, ctaUrl, imageUrl }) => (
      <section className="py-24 px-6 text-center bg-gradient-to-b from-blue-50/50 to-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl font-extrabold tracking-tight mb-6" style={{ color: 'var(--accent)' }}>{headline}</h1>
          {subheadline && <p className="text-xl text-slate-600 mb-10">{subheadline}</p>}
          <a href={ctaUrl} className="inline-block text-white font-medium px-8 py-4 rounded-full shadow-md transition hover:opacity-90" style={{ backgroundColor: 'var(--accent)' }}>
            {ctaText}
          </a>
          {imageUrl && (
            <div className="mt-16 rounded-2xl overflow-hidden shadow-2xl border border-slate-200">
              <img src={imageUrl} alt={headline} className="w-full h-auto" />
            </div>
          )}
        </div>
      </section>
    ),
    features: ({ items }) => (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          {items.map((item) => (
            <div key={item.id} className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition text-center">
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
            <div key={item.id} className={`p-8 rounded-3xl ${item.isPopular ? 'ring-4 ring-offset-4 ring-offset-slate-900 transform scale-105' : 'bg-slate-800'}`} style={item.isPopular ? { backgroundColor: 'var(--accent)', ringColor: 'var(--accent)' } as any : {}}>
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
    testimonials: ({ items }) => (
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item) => (
            <div key={item.id} className="p-8 rounded-2xl bg-white border border-slate-100 shadow-sm italic text-slate-700 relative">
              <span className="text-6xl absolute top-4 left-4 opacity-10 pointer-events-none" style={{ color: 'var(--accent)' }}>"</span>
              <p className="relative z-10 mb-6 leading-relaxed">
                {item.quote}
              </p>
              <div className="flex items-center gap-4">
                {item.imageUrl && <img src={item.imageUrl} alt={item.author} className="w-12 h-12 rounded-full object-cover" />}
                <div>
                  <h4 className="font-bold text-slate-900 not-italic">{item.author}</h4>
                  {item.role && <p className="text-xs text-slate-500 not-italic">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    'lead-form': ({ title, description, ctaText, requireEmail, requirePhone, requireMessage, pageId }) => (
      <section className="py-20 px-6 bg-slate-50">
        <div className="max-w-xl mx-auto bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
          <h2 className="text-3xl font-bold mb-4 text-center" style={{ color: 'var(--accent)' }}>{title}</h2>
          {description && <p className="text-slate-600 mb-8 text-center">{description}</p>}
          
          <form className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
              <input type="text" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="John Doe" required />
            </div>
            
            {requireEmail && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
                <input type="email" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="john@example.com" required />
              </div>
            )}

            {requirePhone && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</label>
                <input type="tel" className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20" placeholder="+1 (555) 000-0000" required />
              </div>
            )}

            {requireMessage && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Message</label>
                <textarea className="w-full p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 min-h-[100px]" placeholder="How can we help?" required></textarea>
              </div>
            )}

            <button type="button" className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-lg hover:opacity-90 transition-opacity" style={{ backgroundColor: 'var(--accent)' }}>
              {ctaText}
            </button>
            <p className="text-[10px] text-center text-slate-400 mt-4">
              By submitting, you agree to our terms and privacy policy.
            </p>
          </form>
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
