import { ThemeComponents } from '../types';

export const BoldTheme: ThemeComponents = {
  Layout: ({ children, settings }) => {
    const fontClass = settings?.fontFamily === 'serif' ? 'font-serif' : settings?.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
    return (
      <div className={`min-h-screen bg-zinc-950 text-white ${fontClass} selection:bg-orange-500/30`} style={{ '--accent': settings?.accentColor || '#f97316' } as any}>
        <main className="relative overflow-hidden">{children}</main>
      </div>
    );
  },
  Header: ({ logoText, links, settings }) => (
    <nav className="p-6 border-b border-zinc-900 flex justify-between items-center text-xs font-black uppercase tracking-[0.2em] sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
      <span style={{ color: settings?.accentColor || 'var(--accent)' }}>{logoText}</span>
      <div className="flex gap-6">
        {links.map((link, i) => (
          <a key={i} href={link.url} className="text-zinc-500 hover:text-white transition-colors">{link.label}</a>
        ))}
      </div>
    </nav>
  ),
  blocks: {
    hero: ({ headline, subheadline, ctaText, ctaUrl, imageUrl }) => (
      <section className="relative py-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[var(--accent)] opacity-10 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] max-w-4xl mb-8">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-12 font-medium tracking-tight leading-relaxed">
            {subheadline}
          </p>
        )}
        <a 
          href={ctaUrl} 
          className="group relative inline-flex items-center justify-center bg-white text-black font-black uppercase italic px-10 py-5 rounded-none hover:text-white transition-all duration-300"
          style={{ '--hover-bg': 'var(--accent)' } as any}
        >
          <span className="relative z-10 group-hover:text-white transition-colors">{ctaText}</span>
          <div className="absolute inset-0 bg-[var(--accent)] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
          <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
        </a>
        {imageUrl && (
          <div className="mt-20 relative max-w-5xl mx-auto">
            <div className="absolute -inset-4 border border-zinc-800 -z-10"></div>
            <img src={imageUrl} alt={headline} className="w-full h-auto shadow-2xl" />
          </div>
        )}
      </section>
    ),
    features: ({ items }) => (
      <section className="py-32 px-6 max-w-7xl mx-auto border-y border-zinc-900">
        <div className="grid md:grid-cols-2 gap-16">
          {items.map((item, i) => (
            <div key={item.id} className="group flex gap-8 items-start">
              <span className="text-6xl font-black italic text-zinc-800 group-hover:text-[var(--accent)] transition-colors duration-300 leading-none">
                {(i + 1).toString().padStart(2, '0')}
              </span>
              <div className="pt-2">
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed font-medium">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    pricing: ({ items }) => (
      <section className="py-32 px-6 bg-zinc-900/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-0">
          {items.map((item) => (
            <div key={item.id} className={`p-12 border border-zinc-800 ${item.isPopular ? 'bg-zinc-950 relative z-10 shadow-2xl scale-105' : ''}`} style={item.isPopular ? { borderColor: 'var(--accent)' } : {}}>
              {item.isPopular && (
                <div className="absolute top-0 right-0 text-[10px] font-black uppercase tracking-widest px-4 py-1 translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'var(--accent)' }}>
                  Best Value
                </div>
              )}
              <h3 className="text-xl font-black uppercase italic mb-2 tracking-widest">{item.tierName}</h3>
              <div className="text-5xl font-black italic mb-10 tracking-tighter">{item.price}</div>
              <ul className="space-y-5 mb-12">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                    <div className="w-1.5 h-1.5" style={{ backgroundColor: 'var(--accent)' }}></div> {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={item.ctaUrl} 
                className={`block w-full text-center py-4 font-black uppercase italic transition-all duration-300 ${
                  item.isPopular 
                    ? 'text-white hover:opacity-90' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
                style={item.isPopular ? { backgroundColor: 'var(--accent)' } : {}}
              >
                {item.ctaText}
              </a>
            </div>
          ))}
        </div>
      </section>
    ),
    faq: ({ items }) => (
      <section className="py-32 px-6 max-w-4xl mx-auto">
        <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-20 text-center">Questions?</h2>
        <div className="grid gap-12">
          {items.map((item) => (
            <div key={item.id} className="group">
              <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-[var(--accent)] transition-colors">
                {item.question}
              </h4>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium border-l-4 border-zinc-800 pl-8 group-hover:border-[var(--accent)] transition-all">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    ),
    testimonials: ({ items }) => (
      <section className="py-32 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {items.map((item) => (
            <div key={item.id} className="bg-zinc-900 p-12 border border-zinc-800 relative group">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[var(--accent)] group-hover:h-full transition-all duration-500"></div>
              <p className="text-xl font-bold italic mb-10 leading-relaxed text-zinc-300">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                {item.imageUrl && <img src={item.imageUrl} alt={item.author} className="w-14 h-14 rounded-none object-cover grayscale group-hover:grayscale-0 transition-all" />}
                <div>
                  <h4 className="font-black uppercase italic text-[var(--accent)]">{item.author}</h4>
                  {item.role && <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mt-1">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    'lead-form': ({ title, description, ctaText, requireEmail, requirePhone, requireMessage, pageId }) => (
      <section className="py-32 px-6 border-y border-zinc-900">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black italic uppercase tracking-tighter mb-8 leading-[0.9]">{title}</h2>
            {description && <p className="text-zinc-500 text-xl font-medium leading-relaxed">{description}</p>}
          </div>
          
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Full Name</label>
              <input type="text" className="w-full bg-zinc-900 border border-zinc-800 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="REQUIRED" required />
            </div>
            
            {requireEmail && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Email Address</label>
                <input type="email" className="w-full bg-zinc-900 border border-zinc-800 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="EMAIL@EXAMPLE.COM" required />
              </div>
            )}

            {requirePhone && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Phone Number</label>
                <input type="tel" className="w-full bg-zinc-900 border border-zinc-800 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors" placeholder="+1 (555) 000-0000" required />
              </div>
            )}

            {requireMessage && (
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Message</label>
                <textarea className="w-full bg-zinc-900 border border-zinc-800 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors min-h-[120px]" placeholder="HOW CAN WE HELP?" required></textarea>
              </div>
            )}

            <button type="button" className="w-full py-5 font-black uppercase italic text-xl shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all" style={{ backgroundColor: 'var(--accent)' }}>
              {ctaText}
            </button>
          </form>
        </div>
      </section>
    ),
  },
  Footer: ({ copyrightText, socialLinks }) => (
    <footer className="py-20 px-6 border-t border-zinc-900 bg-zinc-950">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
        <div className="text-4xl font-black italic tracking-tighter">SAAS_BUILDER</div>
        <div className="flex flex-col items-center md:items-end gap-6">
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-10">
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600 hover:text-[var(--accent)] transition-colors">
                  {link.platform}
                </a>
              ))}
            </div>
          )}
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-800">
            {copyrightText}
          </p>
        </div>
      </div>
    </footer>
  ),
};
