import type { ReactNode } from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <a href="#top" className={`group flex items-center gap-2 ${className}`} aria-label="Retain home">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-violet to-azure shadow-[0_8px_18px_-8px_rgba(108,92,255,0.9)] transition-transform duration-500 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <path
            d="M12 3.2c.9 2.6 1.9 3.6 4.5 4.5-2.6.9-3.6 1.9-4.5 4.5-.9-2.6-1.9-3.6-4.5-4.5 2.6-.9 3.6-1.9 4.5-4.5Z"
            fill="#fff"
          />
          <path d="M17.6 13.4c.5 1.4 1 1.9 2.4 2.4-1.4.5-1.9 1-2.4 2.4-.5-1.4-1-1.9-2.4-2.4 1.4-.5 1.9-1 2.4-2.4Z" fill="#fff" opacity="0.85" />
          <path d="M8.4 14.6c.4 1.1.8 1.5 1.9 1.9-1.1.4-1.5.8-1.9 1.9-.4-1.1-.8-1.5-1.9-1.9 1.1-.4 1.5-.8 1.9-1.9Z" fill="#fff" opacity="0.7" />
        </svg>
      </span>
      <span className="text-[19px] font-extrabold tracking-tight text-ink">Retain</span>
    </a>
  )
}

type ButtonProps = {
  children: ReactNode
  href?: string
  variant?: 'dark' | 'white' | 'violet'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Button({ children, href = '#start', variant = 'dark', size = 'md', className = '' }: ButtonProps) {
  const sizes = {
    sm: 'h-10 px-5 text-[13.5px]',
    md: 'h-12 px-7 text-[14.5px]',
    lg: 'h-14 px-8 text-[15.5px]',
  }

  const variants = {
    dark: 'bg-ink text-white hover:bg-[#1b2740] shadow-[0_10px_24px_-10px_rgba(13,21,38,0.7)]',
    white: 'bg-white text-ink hover:bg-[#f4f9ff] shadow-[0_8px_20px_-10px_rgba(16,42,76,0.35)]',
    violet:
      'bg-gradient-to-r from-violet to-azure text-white hover:brightness-110 shadow-[0_12px_28px_-10px_rgba(108,92,255,0.85)]',
  }

  return (
    <a
      href={href}
      className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold tracking-tight transition-all duration-300 hover:-translate-y-0.5 ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </a>
  )
}

/** Small white capsule used above headings, as in the reference's "Why does it matter?" label. */
export function Pill({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full bg-white/85 px-4 py-2 text-[12.5px] font-bold text-ink-soft shadow-[0_6px_16px_-8px_rgba(16,42,76,0.4)] ring-1 ring-white/70 backdrop-blur ${className}`}
    >
      {children}
    </span>
  )
}

/** Sky-blue marker behind a run of heading text. */
export function Highlight({ children, tone = 'sky' }: { children: ReactNode; tone?: 'sky' | 'sun' | 'mint' | 'blush' }) {
  const tones = {
    sky: 'bg-sky-deep/70',
    sun: 'bg-sun/45',
    mint: 'bg-mint/25',
    blush: 'bg-blush/30',
  }

  return (
    <span className="relative inline-block">
      <span aria-hidden="true" className={`absolute inset-x-[-0.3em] inset-y-[0.1em] rounded-2xl ${tones[tone]}`} />
      <span className="relative">{children}</span>
    </span>
  )
}

export function SectionHeading({
  children,
  className = '',
  align = 'center',
}: {
  children: ReactNode
  className?: string
  align?: 'center' | 'left'
}) {
  return (
    <h2
      className={`text-[clamp(2rem,4.6vw,3.4rem)] text-ink ${
        align === 'center' ? 'mx-auto text-center' : 'text-left'
      } ${className}`}
    >
      {children}
    </h2>
  )
}

export function Lede({
  children,
  align = 'center',
  className = '',
}: {
  children: ReactNode
  align?: 'center' | 'left'
  className?: string
}) {
  return (
    <p
      className={`text-[15.5px] leading-relaxed text-slate ${
        align === 'center' ? 'mx-auto max-w-xl text-center' : 'max-w-xl'
      } ${className}`}
    >
      {children}
    </p>
  )
}

export function Sparkle({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.5c1.1 3.2 2.3 4.4 5.5 5.5-3.2 1.1-4.4 2.3-5.5 5.5-1.1-3.2-2.3-4.4-5.5-5.5 3.2-1.1 4.4-2.3 5.5-5.5Z" />
      <path d="M18.5 14c.5 1.6 1.1 2.2 2.7 2.7-1.6.5-2.2 1.1-2.7 2.7-.5-1.6-1.1-2.2-2.7-2.7 1.6-.5 2.2-1.1 2.7-2.7Z" />
    </svg>
  )
}

/** Overlapping avatar cluster for the hero trust badge. */
export function AvatarStack() {
  const faces = [
    { initials: 'AO', from: 'from-coral', to: 'to-sun' },
    { initials: 'TH', from: 'from-violet', to: 'to-azure' },
    { initials: 'WL', from: 'from-mint', to: 'to-azure' },
    { initials: 'JK', from: 'from-blush', to: 'to-violet' },
  ]

  return (
    <span className="flex -space-x-2">
      {faces.map((face) => (
        <span
          key={face.initials}
          className={`flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br ${face.from} ${face.to} text-[8.5px] font-extrabold text-white ring-2 ring-white`}
        >
          {face.initials}
        </span>
      ))}
    </span>
  )
}
