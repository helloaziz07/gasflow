"use client";

const steps = [
  {
    number: "01",
    title: "Connect Wallet",
    description:
      "Click the connect button and link your MetaMask wallet. Switch to Base Sepolia testnet automatically.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    color: "from-accent-cyan to-primary-400",
  },
  {
    number: "02",
    title: "Enter Details",
    description:
      "Fill in your name, certificate title, and achievement. Preview your NFT certificate in real-time.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    color: "from-accent-purple to-accent-pink",
  },
  {
    number: "03",
    title: "Mint Gaslessly",
    description:
      "Click mint and UGF handles everything. Pay with Mock USD instead of ETH — no gas tokens needed!",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    color: "from-accent-emerald to-accent-cyan",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative">
      <div className="section-container">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary-400">
            Simple & Seamless
          </p>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            How It Works
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-primary-300/70">
            Three simple steps to mint your NFT certificate — no crypto
            experience required.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="group glass-card p-8 transition-all duration-300 hover:border-primary-500/30 hover:shadow-glow-sm"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Step Number */}
              <div className="mb-6 flex items-center justify-between">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.color} text-white transition-transform duration-300 group-hover:scale-110`}
                >
                  {step.icon}
                </div>
                <span className="font-mono text-3xl font-bold text-surface-border">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="mb-3 font-display text-xl font-semibold text-white">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-primary-300/70">
                {step.description}
              </p>

              {/* Connector line (not on last) */}
              {index < steps.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-6 bg-gradient-to-r from-primary-500/30 to-transparent md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
