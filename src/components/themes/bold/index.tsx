import { ThemeComponents } from '../types';

export const BoldTheme: ThemeComponents = {
  Layout: ({ children, settings }) => {
    const fontClass = settings?.fontFamily === 'serif' ? 'font-serif' : settings?.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
    const accent = settings?.accentColor || '#f97316'; // orange default for bold
    return (
      <div className={`min-h-screen bg-zinc-950 text-white ${fontClass} selection:bg-orange-500/30`} style={{ '--accent': accent } as React.CSSProperties}>
        <nav className="p-6 border-b border-zinc-900 flex justify-between items-center text-xs font-black uppercase tracking-[0.2em] sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md">
          <span style={{ color: 'var(--accent)' }}>{settings?.siteName || '[BOLD_THEME]'}</span>
        </nav>
        <main className="relative overflow-hidden">{children}</main>
      </div>
    );
  },
  blocks: {
    hero: ({ headline, subheadline, ctaText, ctaUrl }) => (
      <section className="relative py-32 px-6 flex flex-col items-center text-center overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-orange-600/10 blur-[120px] rounded-full -z-10"></div>
        
        <h1 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9] max-w-4xl mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-12 font-medium tracking-tight leading-relaxed">
            {subheadline}
          </p>
        )}
        <a 
          href={ctaUrl} 
          className="group relative inline-flex items-center justify-center bg-white text-black font-black uppercase italic px-10 py-5 rounded-none hover:bg-orange-500 hover:text-white transition-all duration-300"
        >
          <span className="relative z-10">{ctaText}</span>
          <div className="absolute inset-0 translate-x-2 translate-y-2 border-2 border-white group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300"></div>
        </a>
      </section>
    ),
    features: ({ items }) => (
      <section className="py-32 px-6 max-w-7xl mx-auto border-y border-zinc-900">
        <div className="grid md:grid-cols-2 gap-16">
          {items.map((item, i) => (
            <div key={item.id} className="group flex gap-8 items-start">
              <span className="text-6xl font-black italic text-zinc-800 group-hover:text-orange-600 transition-colors duration-300 leading-none">
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
            <div key={item.id} className={`p-12 border border-zinc-800 ${item.isPopular ? 'bg-zinc-950 border-orange-500/50 relative z-10 shadow-2xl scale-105' : ''}`}>
              {item.isPopular && (
                <div className="absolute top-0 right-0 bg-orange-600 text-[10px] font-black uppercase tracking-widest px-4 py-1 translate-x-1/2 -translate-y-1/2">
                  Best Value
                </div>
              )}
              <h3 className="text-xl font-black uppercase italic mb-2 tracking-widest">{item.tierName}</h3>
              <div className="text-5xl font-black italic mb-10 tracking-tighter">{item.price}</div>
              <ul className="space-y-5 mb-12">
                {item.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-bold text-zinc-400">
                    <div className="w-1.5 h-1.5 bg-orange-600"></div> {feature}
                  </li>
                ))}
              </ul>
              <a 
                href={item.ctaUrl} 
                className={`block w-full text-center py-4 font-black uppercase italic transition-all duration-300 ${
                  item.isPopular 
                    ? 'bg-orange-600 text-white hover:bg-orange-500' 
                    : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white'
                }`}
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
              <h4 className="text-2xl font-black uppercase italic mb-4 group-hover:text-orange-500 transition-colors">
                {item.question}
              </h4>
              <p className="text-zinc-500 text-lg leading-relaxed font-medium border-l-4 border-zinc-800 pl-8 group-hover:border-orange-500 transition-all">
                {item.answer}
              </p>
            </div>
          ))}
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
                <a key={i} href={link.url} className="text-xs font-black uppercase tracking-[0.25em] text-zinc-600 hover:text-orange-500 transition-colors">
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
