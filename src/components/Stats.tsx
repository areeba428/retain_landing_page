import { useEffect, useState } from 'react'
import { useInView } from './Reveal'

const stats = [
  { value: 92, suffix: '%', label: 'average recall at 30 days', tone: 'from-violet to-azure' },
  { value: 3.4, suffix: '×', label: 'less time spent rereading', tone: 'from-mint to-azure' },
  { value: 7, suffix: ' min', label: 'median daily session', tone: 'from-sun to-coral' },
  { value: 14, suffix: 'k', label: 'students studying daily', tone: 'from-blush to-violet' },
]

function useCountUp(target: number, run: boolean, duration = 1400) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!run) return
    let frame = 0
    const start = performance.now()

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      setValue(target * (1 - Math.pow(1 - t, 3)))
      if (t < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [target, run, duration])

  return value
}

function Stat({ stat, index }: { stat: (typeof stats)[number]; index: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.4)
  const value = useCountUp(stat.value, inView)
  const decimals = stat.value % 1 !== 0 ? 1 : 0

  return (
    <div
      ref={ref}
      className="panel lift p-6 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'none' : 'translateY(16px)',
        transition: `opacity 800ms var(--ease-out-quint) ${index * 90}ms, transform 800ms var(--ease-out-quint) ${index * 90}ms`,
      }}
    >
      <div
        className={`mx-auto bg-gradient-to-r bg-clip-text text-[clamp(2.1rem,4vw,2.9rem)] leading-none font-extrabold tracking-tight text-transparent tabular-nums ${stat.tone}`}
      >
        {value.toFixed(decimals)}
        {stat.suffix}
      </div>
      <p className="mt-3 text-[13px] font-bold text-slate">{stat.label}</p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative bg-[linear-gradient(180deg,#e6f2ff_0%,#f4faff_100%)] py-16 lg:py-20">
      <div className="shell">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <Stat key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
