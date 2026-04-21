export default function Contact() {
  return (
    <section id="contact" className="mb-32 scroll-mt-24">
      <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
        <span className="h-1 w-12 bg-accent rounded-full"></span>
        Get in Touch
      </h2>
      <div className="grid lg:grid-cols-2 gap-16">
        <div className="space-y-8">
          <p className="text-foreground/60 text-lg leading-relaxed">
            I am currently looking for new opportunities. Whether you have a  
            question or just want to say hi, I will try my best to get back to
            you!
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />      
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Email</h4>
                <p className="text-foreground/50">contact@example.com</p>     
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-inner"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-inner"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
              Message
            </label>
            <textarea
              placeholder="How can I help you?"
              className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 h-40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none shadow-inner"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full sm:w-auto px-10 py-4 bg-accent text-background rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(57,255,20,0.2)]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
