"use client";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top glow */}
        <div className="absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary-600/20 blur-[120px]" />
        {/* Side glows */}
        <div className="absolute -left-40 top-40 h-72 w-72 rounded-full bg-accent-purple/10 blur-[100px]" />
        <div className="absolute -right-40 top-60 h-72 w-72 rounded-full bg-accent-cyan/10 blur-[100px]" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="section-container relative text-center">
        {/* Badge */}
        <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/10 px-4 py-1.5 text-sm text-primary-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-accent-emerald" />
          Live on Base Sepolia Testnet
        </div>

        {/* Title */}
        <h1 className="animate-slide-up font-display text-5xl font-extrabold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl">
          Mint NFTs
          <br />
          <span className="gradient-text">Without Gas Fees</span>
        </h1>

        {/* Subtitle */}
        <p className="animate-slide-up mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-300/80 [animation-delay:100ms]">
          Gasflow lets you mint blockchain certificates and achievement badges
          on Base Sepolia — <strong className="text-primary-200">no ETH required</strong>.
          Powered by the Universal Gas Framework (UGF).
        </p>

        {/* CTA Buttons */}
        <div className="animate-slide-up mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row [animation-delay:200ms]">
          <a href="#mint" className="btn-primary text-base">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-5 w-5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Start Minting
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center gap-2 rounded-xl border border-surface-border px-6 py-3 text-base font-medium text-primary-300 transition-all hover:border-primary-500/30 hover:text-white"
          >
            Learn How It Works
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="h-4 w-4"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>

        {/* Stats */}
        <div className="animate-fade-in mt-16 grid grid-cols-3 gap-8 [animation-delay:400ms]">
          {[
            { label: "Gas Fees", value: "$0", sub: "Always free" },
            { label: "Network", value: "Base", sub: "Sepolia Testnet" },
            { label: "Powered By", value: "UGF", sub: "Universal Gas Framework" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl font-bold text-white sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-primary-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
