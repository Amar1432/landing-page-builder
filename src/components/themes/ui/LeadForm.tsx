"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  pageId: string;
  heading: string;
  description?: string;
  submitButtonText: string;
  themeStyle: "modern" | "minimalist" | "bold";
}

export function LeadForm({ pageId, heading, description, submitButtonText, themeStyle }: LeadFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    
    const formData = new FormData(e.currentTarget);
    const data = {
      pageId,
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Theme-specific styling mappings
  const inputStyles = {
    modern: "w-full border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow",
    minimalist: "w-full border-b border-gray-300 bg-transparent px-0 py-3 focus:border-black focus:outline-none focus:ring-0 transition-colors rounded-none placeholder:text-gray-400",
    bold: "w-full border-2 border-white bg-black text-white px-4 py-3 focus:outline-none focus:ring-0 placeholder:text-gray-500 rounded-none",
  };

  const buttonStyles = {
    modern: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex justify-center items-center shadow-md",
    minimalist: "w-full bg-black hover:bg-gray-800 text-white font-medium py-3 px-6 transition-colors flex justify-center items-center",
    bold: "w-full bg-orange-600 hover:bg-orange-500 text-white font-black uppercase tracking-wider py-4 px-6 border-2 border-white shadow-[4px_4px_0_0_#fff] hover:shadow-[2px_2px_0_0_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all flex justify-center items-center",
  };

  const labelStyles = {
    modern: "block text-sm font-medium text-gray-700 mb-1",
    minimalist: "hidden", // Labels are often hidden in minimalist, relying on placeholders
    bold: "block text-sm font-black uppercase tracking-wider text-white mb-2",
  };

  if (status === "success") {
    return (
      <div className={`text-center py-12 px-6 flex flex-col items-center ${themeStyle === "bold" ? "bg-black border-2 border-white p-8" : themeStyle === "modern" ? "bg-white rounded-2xl shadow-xl border border-gray-100" : ""}`}>
        <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 mx-auto ${themeStyle === "bold" ? "bg-orange-600 text-white" : themeStyle === "modern" ? "bg-green-100 text-green-600" : "bg-black text-white"}`}>
          <CheckCircle2 size={32} />
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${themeStyle === "bold" ? "text-white uppercase" : "text-gray-900"}`}>Thank You!</h3>
        <p className={themeStyle === "bold" ? "text-gray-400" : "text-gray-600"}>Your message has been received. We'll be in touch shortly.</p>
        <button 
          onClick={() => setStatus("idle")}
          className={`mt-8 font-medium ${themeStyle === "bold" ? "text-orange-500 hover:text-white uppercase tracking-widest text-sm" : themeStyle === "modern" ? "text-blue-600 hover:text-blue-700" : "text-black underline underline-offset-4"}`}
        >
          Submit another response
        </button>
      </div>
    );
  }

  return (
    <div className={`w-full max-w-xl mx-auto ${themeStyle === "bold" ? "bg-black border-2 border-white p-8 md:p-12 box-shadow-solid relative overflow-hidden" : themeStyle === "modern" ? "bg-white p-8 md:p-10 border border-gray-100/50 rounded-2xl shadow-xl space-y-8" : ""}`}>
      
      {themeStyle === "bold" && <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-600 rounded-full blur-3xl opacity-20"></div>}

      <div className="text-center mb-10 relative z-10">
        <h2 className={`font-bold ${themeStyle === "bold" ? "text-3xl md:text-5xl uppercase text-white mb-4 leading-tight tracking-tight" : themeStyle === "modern" ? "text-3xl font-extrabold text-slate-900 mb-3" : "text-3xl font-medium tracking-tight text-black mb-4"}`}>
          {heading}
        </h2>
        {description && (
          <p className={themeStyle === "bold" ? "text-gray-400 text-lg font-medium" : themeStyle === "modern" ? "text-slate-500 text-lg" : "text-gray-500 text-lg leading-relaxed"}>
            {description}
          </p>
        )}
      </div>

      <form onSubmit={handleSubmit} className={`space-y-6 relative z-10 ${themeStyle === "minimalist" ? "space-y-8" : ""}`}>
        {status === "error" && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium border border-red-100 text-center">
            Something went wrong. Please try again.
          </div>
        )}

        <div className={themeStyle === "modern" ? "grid grid-cols-1 sm:grid-cols-2 gap-6" : "space-y-6"}>
          <div className={themeStyle === "minimalist" ? "" : "space-y-1"}>
            <label htmlFor="name" className={labelStyles[themeStyle]}>Full Name <span className="text-red-500">*</span></label>
            <input 
              type="text" 
              id="name"
              name="name" 
              required 
              placeholder={themeStyle === "minimalist" ? "Full Name *" : "Jane Doe"} 
              className={inputStyles[themeStyle]} 
            />
          </div>
          <div className={themeStyle === "minimalist" ? "" : "space-y-1"}>
            <label htmlFor="phone" className={labelStyles[themeStyle]}>Phone Number</label>
            <input 
              type="tel"
              id="phone" 
              name="phone" 
              placeholder={themeStyle === "minimalist" ? "Phone Number" : "+1 (555) 000-0000"} 
              className={inputStyles[themeStyle]} 
            />
          </div>
        </div>

        <div className={themeStyle === "minimalist" ? "" : "space-y-1"}>
          <label htmlFor="email" className={labelStyles[themeStyle]}>Email Address</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            placeholder={themeStyle === "minimalist" ? "Email Address" : "jane@example.com"} 
            className={inputStyles[themeStyle]} 
          />
        </div>

        <div className={themeStyle === "minimalist" ? "" : "space-y-1"}>
          <label htmlFor="message" className={labelStyles[themeStyle]}>Message</label>
          <textarea 
            id="message"
            name="message" 
            rows={4} 
            placeholder={themeStyle === "minimalist" ? "How can we help?" : "Tell us about your project..."} 
            className={`${inputStyles[themeStyle]} resize-none`}
            style={themeStyle === "bold" ? { minHeight: '120px' } : {}}
          ></textarea>
        </div>

        <div className={themeStyle === "modern" ? "pt-2" : "pt-4"}>
          <button 
            type="submit" 
            disabled={status === "loading"}
            className={buttonStyles[themeStyle]}
          >
            {status === "loading" ? <Loader2 className="animate-spin" size={20} /> : submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
