import { ThemeComponents } from '../types';

export const MinimalistTheme: ThemeComponents = {
  Layout: ({ children, settings }) => {
    const fontClass = settings?.fontFamily === 'serif' ? 'font-serif' : settings?.fontFamily === 'mono' ? 'font-mono' : 'font-sans';
    return (
      <div className={`min-h-screen bg-[#FDFDFD] text-[#1c1917] ${fontClass} selection:bg-black selection:text-white`} style={{ '--accent': settings?.accentColor || '#1c1917' } as any}>
        <main>{children}</main>
      </div>
    );
  },
  Header: ({ logoText, links }) => (
    <header className="p-8 flex justify-between items-center border-b border-black/5 bg-[#FDFDFD] sticky top-0 z-50">
      <span className="font-bold tracking-tight">{logoText}</span>
      <nav className="flex gap-8 text-sm font-medium text-neutral-500">
        {links.map((link, i) => (
          <a key={i} href={link.url} className="hover:text-black transition-colors">{link.label}</a>
        ))}
      </nav>
    </header>
  ),
  blocks: {
    hero: ({ headline, subheadline, ctaText, ctaUrl, imageUrl }) => (
      <section className="py-32 px-8 max-w-5xl">
        <h1 className="text-6xl font-medium tracking-tighter leading-none mb-8">{headline}</h1>
        {subheadline && <p className="text-xl text-neutral-500 max-w-2xl mb-12 leading-relaxed">{subheadline}</p>}
        <a href={ctaUrl} className="inline-block border-b-2 border-black pb-1 font-bold text-lg hover:text-neutral-500 hover:border-neutral-300 transition-all">
          {ctaText} →
        </a>
        {imageUrl && (
          <div className="mt-20 grayscale hover:grayscale-0 transition-all duration-700">
            <img src={imageUrl} alt={headline} className="w-full h-auto rounded-sm shadow-sm" />
          </div>
        )}
      </section>
    ),
    features: ({ items }) => (
      <section className="py-24 px-8 border-y border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-16">
          {items.map((item) => (
            <div key={item.id} className="max-w-md">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4 opacity-30 italic">0{items.indexOf(item) + 1}</h3>
              <h3 className="text-2xl font-medium mb-4 tracking-tight">{item.title}</h3>
              <p className="text-neutral-500 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    pricing: ({ items }) => (
      <section className="py-32 px-8 max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {items.map((item) => (
            <div key={item.id} className="flex flex-col">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 opacity-40">{item.tierName}</h3>
              <div className="text-4xl font-medium mb-8 tracking-tighter">{item.price}</div>
              <ul className="space-y-4 mb-12 flex-1">
                {item.features.map((feature, i) => (
                  <li key={i} className="text-sm text-neutral-500 border-b border-black/5 pb-2">
                    {feature}
                  </li>
                ))}
              </ul>
              <a href={item.ctaUrl} className={`inline-block py-3 px-6 text-center text-sm font-bold border ${item.isPopular ? 'bg-black text-white' : 'border-black hover:bg-black hover:text-white'} transition-all`}>
                {item.ctaText}
              </a>
            </div>
          ))}
        </div>
      </section>
    ),
    faq: ({ items }) => (
      <section className="py-32 px-8 max-w-4xl border-t border-black/5">
        <div className="space-y-16">
          {items.map((item) => (
            <div key={item.id}>
              <h4 className="text-2xl font-medium mb-6 tracking-tight">{item.question}</h4>
              <p className="text-neutral-500 max-w-2xl leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>
    ),
    testimonials: ({ items }) => (
      <section className="py-32 px-8 border-t border-black/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {items.map((item) => (
            <div key={item.id} className="border-l-2 border-black/10 pl-8 py-4">
              <p className="text-2xl font-light italic mb-8 leading-snug">
                "{item.quote}"
              </p>
              <div className="flex items-center gap-4">
                {item.imageUrl && <img src={item.imageUrl} alt={item.author} className="w-10 h-10 rounded-full grayscale" />}
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wider">{item.author}</h4>
                  {item.role && <p className="text-xs text-neutral-400">{item.role}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    ),
    'lead-form': ({ title, description, ctaText, requireEmail, requirePhone, requireMessage, pageId }) => (
      <section className="py-32 px-8 border-y border-black/5 bg-[#FAFAFA]">
        <div className="max-w-2xl">
          <h2 className="text-4xl font-medium mb-6 tracking-tight">{title}</h2>
          {description && <p className="text-neutral-500 mb-12 text-lg leading-relaxed">{description}</p>}
          
          <form className="space-y-8">
            <div className="border-b border-black pb-2">
              <input type="text" className="w-full bg-transparent p-0 text-xl focus:outline-none placeholder:text-neutral-300" placeholder="Full Name" required />
            </div>
            
            {requireEmail && (
              <div className="border-b border-black pb-2">
                <input type="email" className="w-full bg-transparent p-0 text-xl focus:outline-none placeholder:text-neutral-300" placeholder="Email Address" required />
              </div>
            )}

            {requirePhone && (
              <div className="border-b border-black pb-2">
                <input type="tel" className="w-full bg-transparent p-0 text-xl focus:outline-none placeholder:text-neutral-300" placeholder="Phone Number" required />
              </div>
            )}

            {requireMessage && (
              <div className="border-b border-black pb-2">
                <textarea className="w-full bg-transparent p-0 text-xl focus:outline-none placeholder:text-neutral-300 min-h-[40px] resize-none" placeholder="Message" required></textarea>
              </div>
            )}

            <button type="button" className="inline-block bg-black text-white px-10 py-4 font-bold uppercase tracking-widest text-xs hover:bg-neutral-800 transition-colors">
              {ctaText}
            </button>
          </form>
        </div>
      </section>
    ),
  },
  Footer: ({ copyrightText, socialLinks }) => (
    <footer className="p-8 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-xs font-bold uppercase tracking-widest opacity-40">{copyrightText}</p>
      {socialLinks && socialLinks.length > 0 && (
        <div className="flex gap-8">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.url} className="text-xs font-bold uppercase tracking-widest hover:opacity-100 transition-opacity">{link.platform}</a>
          ))}
        </div>
      )}
    </footer>
  ),
};
