import { ThemeComponents } from '../types';

export const MinimalistTheme: ThemeComponents = {
  Layout: ({ children }) => (
    <div className="min-h-screen bg-[#FDFDFD] text-stone-800 font-mono tracking-tight">
      <header className="py-8 px-10 border-b-2 border-stone-200 flex justify-between items-center text-xs uppercase font-bold tracking-widest">
        <span>MINIMALIST</span>
      </header>
      <main className="max-w-4xl mx-auto py-12 px-6">{children}</main>
    </div>
  ),
  Hero: ({ headline, subheadline, ctaText, ctaUrl }) => (
    <section className="py-32">
      <h1 className="text-4xl md:text-6xl font-light leading-tight mb-8 text-stone-900">{headline}</h1>
      {subheadline && <p className="text-lg text-stone-500 mb-12 border-l-2 border-stone-300 pl-6 py-2">{subheadline}</p>}
      <a href={ctaUrl} className="inline-block border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white px-6 py-3 text-sm font-bold uppercase transition-colors">
        {ctaText}
      </a>
    </section>
  ),
  Features: ({ items }) => (
    <section className="py-24 border-t border-stone-200">
      <div className="space-y-16">
        {items.map((item, index) => (
          <div key={item.id} className="flex flex-col md:flex-row gap-8 items-start">
            <div className="text-4xl font-light text-stone-300 w-16 shrink-0">{(index + 1).toString().padStart(2, '0')}</div>
            <div>
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-stone-500 leading-relaxed text-sm md:text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  ),
  Pricing: ({ items }) => (
    <section className="py-24 border-t border-stone-200">
      <h2 className="text-2xl font-light mb-16 uppercase tracking-widest text-center">Pricing Options</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className={`p-8 border-2 ${item.isPopular ? 'border-stone-900 bg-stone-50 text-stone-900' : 'border-stone-200'}`}>
            <h3 className="text-sm font-bold uppercase tracking-widest mb-6">{item.tierName}</h3>
            <div className="text-3xl font-light mb-8">{item.price}</div>
            <ul className="space-y-3 mb-10 text-sm">
              {item.features.map((feature, i) => (
                <li key={i} className="text-stone-500 border-b border-stone-100 pb-2">— {feature}</li>
              ))}
            </ul>
            <a href={item.ctaUrl} className="block w-full text-center py-4 border border-stone-300 text-xs font-bold uppercase hover:bg-stone-100 transition">
              {item.ctaText}
            </a>
          </div>
        ))}
      </div>
    </section>
  ),
  FAQ: ({ items }) => (
    <section className="py-24 border-t border-stone-200">
      <div className="space-y-12">
        {items.map((item) => (
          <div key={item.id} className="max-w-2xl">
            <h4 className="text-lg font-medium mb-4">{item.question}</h4>
            <p className="text-stone-500 text-sm leading-loose">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  ),
  Footer: ({ copyrightText, socialLinks }) => (
    <footer className="py-16 mt-24 border-t-4 border-stone-900 text-xs uppercase font-bold tracking-widest flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-stone-500">{copyrightText}</p>
      {socialLinks && socialLinks.length > 0 && (
        <div className="flex gap-8">
          {socialLinks.map((link, i) => (
            <a key={i} href={link.url} className="hover:text-stone-400 transition">{link.platform}</a>
          ))}
        </div>
      )}
    </footer>
  ),
};
