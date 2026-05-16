export default function Footer() {
  return (
    <footer className="border-t border-surface-border bg-surface/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-purple">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 text-white">
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
              </div>
              <span className="font-display text-lg font-bold text-white">
                Gasflow
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-primary-400/60">
              Gasless NFT certificates on Base Sepolia.
              <br />
              Powered by UGF.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-300">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-primary-400/60">
              <li>
                <a
                  href="https://sepolia.basescan.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-300"
                >
                  Base Sepolia Explorer ↗
                </a>
              </li>
              <li>
                <a
                  href="https://universalgasframework.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-300"
                >
                  UGF Documentation ↗
                </a>
              </li>
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-primary-300"
                >
                  GitHub Repository ↗
                </a>
              </li>
            </ul>
          </div>

          {/* Tech */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary-300">
              Built With
            </h4>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "Solidity", "Base", "UGF", "Wagmi", "RainbowKit"].map(
                (tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-surface-border bg-surface-card/50 px-3 py-1 text-xs text-primary-400/60"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-surface-border pt-6 text-center">
          <p className="text-xs text-primary-400/40">
            © {new Date().getFullYear()} Gasflow. Built for HackWithMumbai.
          </p>
        </div>
      </div>
    </footer>
  );
}
