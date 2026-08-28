/** Soft cloud and colour-blob decoration used behind the bright sections. */

type CloudsProps = {
  className?: string
}

/** A single cloud built from overlapping soft puffs, so it reads as a shape rather than a haze. */
function Cloud({
  className,
  scale = 1,
  opacity = 0.9,
}: {
  className: string
  scale?: number
  opacity?: number
}) {
  return (
    <div className={`absolute ${className}`} style={{ transform: `scale(${scale})`, opacity }}>
      <div className="relative h-24 w-72">
        <span className="absolute bottom-0 left-0 h-16 w-72 rounded-full bg-white blur-[10px]" />
        <span className="absolute bottom-5 left-8 h-20 w-32 rounded-full bg-white blur-[10px]" />
        <span className="absolute bottom-8 left-28 h-16 w-28 rounded-full bg-white blur-[12px]" />
        <span className="absolute bottom-3 left-48 h-14 w-24 rounded-full bg-white blur-[10px]" />
      </div>
    </div>
  )
}

export function Clouds({ className = '' }: CloudsProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <Cloud className="animate-drift top-8 -left-16" scale={1.3} opacity={0.95} />
      <Cloud className="animate-float-slow top-32 left-[26%]" scale={0.8} opacity={0.7} />
      <Cloud className="animate-drift top-4 right-[-4%]" scale={1.45} opacity={0.9} />
      <Cloud className="animate-float top-[38%] right-[22%]" scale={0.7} opacity={0.55} />
      <Cloud className="animate-drift top-[52%] -left-24" scale={1.1} opacity={0.6} />
    </div>
  )
}

export function Blobs({ className = '' }: CloudsProps) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div className="animate-float-slow absolute top-[12%] left-[8%] h-56 w-56 rounded-full bg-violet/25 blur-3xl" />
      <div className="animate-float absolute top-[30%] right-[10%] h-64 w-64 rounded-full bg-coral/25 blur-3xl" />
      <div className="animate-float-slow absolute bottom-[6%] left-[38%] h-52 w-52 rounded-full bg-mint/25 blur-3xl" />
      <div className="animate-float absolute top-[6%] right-[34%] h-40 w-40 rounded-full bg-sun/30 blur-3xl" />
    </div>
  )
}

/** Twinkling star field for playful accents around the hero. */
export function Stars({ className = '' }: CloudsProps) {
  const stars = [
    { top: '14%', left: '7%', size: 18, delay: 0, color: 'text-sun' },
    { top: '26%', left: '90%', size: 14, delay: 700, color: 'text-violet' },
    { top: '62%', left: '4%', size: 12, delay: 1400, color: 'text-coral' },
    { top: '8%', left: '62%', size: 12, delay: 2100, color: 'text-azure' },
    { top: '72%', left: '93%', size: 16, delay: 900, color: 'text-blush' },
  ]

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      {stars.map((star) => (
        <svg
          key={`${star.top}-${star.left}`}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`animate-twinkle absolute ${star.color}`}
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDelay: `${star.delay}ms`,
          }}
        >
          <path d="M12 1.8c1.2 3.6 2.6 5 6.2 6.2-3.6 1.2-5 2.6-6.2 6.2-1.2-3.6-2.6-5-6.2-6.2 3.6-1.2 5-2.6 6.2-6.2Z" />
        </svg>
      ))}
    </div>
  )
}
