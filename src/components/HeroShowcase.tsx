/** Bright product mock that anchors the hero, with playful stat chips floating around it. */

function Chip({
  className,
  tone,
  icon,
  label,
  value,
  delay = 0,
}: {
  className: string
  tone: string
  icon: React.ReactNode
  label: string
  value: string
  delay?: number
}) {
  return (
    <div
      className={`animate-float absolute hidden items-center gap-2.5 rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_14px_34px_-14px_rgba(16,42,76,0.45)] sm:flex ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <span className={`flex h-8 w-8 items-center justify-center rounded-xl text-white ${tone}`}>{icon}</span>
      <span className="text-left">
        <span className="block text-[13.5px] leading-none font-extrabold text-ink">{value}</span>
        <span className="mt-1 block text-[10.5px] leading-none font-semibold text-slate-soft">{label}</span>
      </span>
    </div>
  )
}

export function HeroShowcase() {
  const grades = [
    { label: 'Again', interval: '10m', tone: 'bg-coral/15 text-coral' },
    { label: 'Hard', interval: '2d', tone: 'bg-sun/20 text-[#b98200]' },
    { label: 'Good', interval: '6d', tone: 'bg-mint/15 text-mint' },
    { label: 'Easy', interval: '14d', tone: 'bg-violet/12 text-violet' },
  ]

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <div aria-hidden="true" className="absolute inset-0 -z-10 scale-110">
        <div className="absolute top-6 left-6 h-40 w-40 rounded-full bg-violet/30 blur-3xl" />
        <div className="absolute -top-4 right-10 h-44 w-44 rounded-full bg-sun/40 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-48 w-48 rounded-full bg-mint/30 blur-3xl" />
        <div className="absolute right-1/4 bottom-6 h-40 w-40 rounded-full bg-blush/30 blur-3xl" />
      </div>

      <div className="panel relative mx-auto max-w-xl p-5 sm:p-7">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet to-azure">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="currentColor" aria-hidden="true">
                <path d="M12 3c1 2.9 2.1 4 5 5-2.9 1-4 2.1-5 5-1-2.9-2.1-4-5-5 2.9-1 4-2.1 5-5Z" />
              </svg>
            </span>
            <span className="text-left">
              <span className="block text-[13.5px] font-extrabold text-ink">Today's session</span>
              <span className="block text-[11px] font-semibold text-slate-soft">Renal physiology · 12 cards</span>
            </span>
          </span>
          <span className="rounded-full bg-sky px-3 py-1.5 text-[11.5px] font-extrabold text-azure">04:12</span>
        </div>

        <div className="mt-5 flex gap-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < 7 ? 'bg-gradient-to-r from-violet to-azure' : 'bg-line'}`}
            />
          ))}
        </div>

        <p className="mt-6 text-left text-[17px] leading-snug font-extrabold text-ink">
          Why does hyperkalemia slow cardiac conduction?
        </p>

        <div className="mt-4 rounded-2xl bg-[#f4f7ff] p-4 text-left ring-1 ring-line">
          <span className="text-[10.5px] font-extrabold tracking-[0.12em] text-violet uppercase">Your answer</span>
          <p className="mt-2 text-[13px] leading-relaxed text-slate">
            Raised extracellular K⁺ depolarises the resting membrane, so more fast Na⁺ channels stay
            inactivated — the upstroke slows and conduction drops
            <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-blink bg-violet align-middle" />
          </p>
        </div>

        <div className="mt-5 grid grid-cols-4 gap-2">
          {grades.map((grade) => (
            <div
              key={grade.label}
              className={`rounded-xl px-2 py-2.5 text-center ${grade.tone} ${
                grade.label === 'Good' ? 'ring-2 ring-mint' : ''
              }`}
            >
              <span className="block text-[12.5px] font-extrabold">{grade.label}</span>
              <span className="mt-0.5 block text-[10.5px] font-semibold opacity-70">{grade.interval}</span>
            </div>
          ))}
        </div>
      </div>

      <Chip
        className="-top-4 -left-2 sm:-left-8 lg:-left-14"
        tone="bg-gradient-to-br from-coral to-sun"
        delay={0}
        value="21 days"
        label="Current streak"
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
            <path d="M13 2s1 4-2 6.5S8 13 8 15a4 4 0 0 0 8 0c0-1.5-.6-2.6-1.4-3.6.9.3 2.4 1.6 2.4 4A6 6 0 0 1 5 15c0-4 4-5.5 5-8.5.4-1.2.3-3 3-4.5Z" />
          </svg>
        }
      />

      <Chip
        className="top-16 -right-2 sm:-right-6 lg:-right-16"
        tone="bg-gradient-to-br from-mint to-azure"
        delay={900}
        value="92% recall"
        label="At 30 days"
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <path d="M4 15l4.5-5 3.5 3 7-8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        }
      />

      <Chip
        className="-bottom-6 -left-1 sm:-left-6 lg:-left-12"
        tone="bg-gradient-to-br from-violet to-blush"
        delay={1600}
        value="In 3 days"
        label="Next review"
        icon={
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
            <circle cx="12" cy="12" r="8.5" />
            <path d="M12 7.5V12l3 2" strokeLinecap="round" />
          </svg>
        }
      />

      <div
        className="animate-float-slow panel absolute -right-1 -bottom-8 hidden items-end gap-1.5 p-3.5 sm:flex sm:-right-4 lg:-right-10"
        style={{ animationDelay: '400ms' }}
      >
        {[38, 52, 30, 64, 78, 92].map((height, i) => (
          <span
            key={height}
            className="w-2.5 rounded-full bg-gradient-to-t from-azure to-violet"
            style={{ height: `${height * 0.5}px`, opacity: 0.45 + i * 0.11 }}
          />
        ))}
      </div>

      {/* The floating chips would sit on top of the card on a phone, so they become a row instead. */}
      <div className="mt-4 grid grid-cols-3 gap-2 sm:hidden">
        {[
          { value: '21 days', label: 'Streak', tone: 'from-coral to-sun' },
          { value: '92%', label: 'Recall', tone: 'from-mint to-azure' },
          { value: '3 days', label: 'Next up', tone: 'from-violet to-blush' },
        ].map((stat) => (
          <div key={stat.label} className="panel px-2 py-3 text-center">
            <span
              className={`block bg-gradient-to-r bg-clip-text text-[14px] leading-none font-extrabold text-transparent ${stat.tone}`}
            >
              {stat.value}
            </span>
            <span className="mt-1 block text-[10px] font-bold text-slate-soft">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
