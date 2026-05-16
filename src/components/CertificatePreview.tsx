"use client";

interface CertificatePreviewProps {
  recipientName: string;
  title: string;
  achievement: string;
}

export default function CertificatePreview({
  recipientName,
  title,
  achievement,
}: CertificatePreviewProps) {
  const hasContent = recipientName || title || achievement;

  return (
    <div className="group relative">
      {/* Gradient border glow */}
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-primary-500/50 via-accent-purple/50 to-accent-cyan/50 opacity-60 blur-sm transition-opacity duration-300 group-hover:opacity-100" />

      {/* Certificate Card */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#1e1b4b] to-[#312e81] p-8 sm:p-10">
        {/* Header */}
        <div className="mb-6 text-center">
          <div className="mb-1 font-mono text-xs uppercase tracking-[0.3em] text-primary-400/60">
            Gasflow Certificate
          </div>
          <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
        </div>

        {/* Title */}
        <div className="mb-8 text-center">
          <h3 className="font-display text-2xl font-bold text-white sm:text-3xl">
            {title || (
              <span className="text-primary-500/30">Certificate Title</span>
            )}
          </h3>
        </div>

        {/* Awarded To */}
        <div className="mb-6 text-center">
          <p className="mb-2 text-sm text-primary-300/50">Awarded to</p>
          <p className="font-display text-xl font-semibold text-white">
            {recipientName || (
              <span className="text-primary-500/30">Your Name</span>
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="mx-auto mb-6 h-px w-3/4 bg-gradient-to-r from-transparent via-primary-500/20 to-transparent" />

        {/* Achievement */}
        <div className="mb-8 text-center">
          <p className="text-sm leading-relaxed text-primary-200/60">
            {achievement || (
              <span className="text-primary-500/20">Achievement description</span>
            )}
          </p>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between text-[10px] text-primary-400/40">
          <span>Base Sepolia</span>
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3 w-3">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Powered by UGF
          </span>
          <span>{new Date().toLocaleDateString()}</span>
        </div>

        {/* Empty state overlay */}
        {!hasContent && (
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-surface/30 backdrop-blur-[1px]">
            <p className="text-sm text-primary-400/50">
              Fill in the form to preview your certificate
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
