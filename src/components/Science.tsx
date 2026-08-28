import { Highlight, Lede, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal, useInView } from './Reveal'

const PLOT = { left: 62, right: 690, top: 34, bottom: 268 }
const DAYS = 60
const REVIEWS = [0, 1, 3, 8, 20, 45]

const x = (day: number) => PLOT.left + (day / DAYS) * (PLOT.right - PLOT.left)
const y = (recall: number) => PLOT.bottom - recall * (PLOT.bottom - PLOT.top)

/** Single-exposure decay: fast at first, then a shallow floor of whatever stuck. */
const cramRecall = (day: number) => 0.94 * Math.exp(-day / 8) + 0.06

/** Each successful review resets recall to 1 and multiplies the memory's stability. */
function spacedRecall(day: number) {
  let index = 0
  for (let i = 0; i < REVIEWS.length; i++) if (day >= REVIEWS[i]) index = i
  const stability = 2.4 * Math.pow(2.35, index)
  return Math.exp(-(day - REVIEWS[index]) / stability)
}

function line(fn: (day: number) => number) {
  const points: string[] = []
  for (let day = 0; day <= DAYS; day += 0.25) {
    points.push(`${x(day).toFixed(2)} ${y(fn(day)).toFixed(2)}`)
  }
  return `M ${points.join(' L ')}`
}

const cramPath = line(cramRecall)
const spacedPath = line(spacedRecall)
const dayTicks = [0, 7, 14, 30, 45, 60]

function RetentionChart() {
  const { ref, inView } = useInView<SVGSVGElement>(0.3)

  return (
    <svg
      ref={ref}
      viewBox="0 0 720 310"
      className="w-full"
      role="img"
      aria-label="Recall over 60 days: cramming decays to 9 percent while spaced review stays above 90 percent"
    >
      <defs>
        <linearGradient id="spaced-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6c5cff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6c5cff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="spaced-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b8cff" />
          <stop offset="100%" stopColor="#6c5cff" />
        </linearGradient>
      </defs>

      {[0, 0.25, 0.5, 0.75, 1].map((level) => (
        <g key={level}>
          <line
            x1={PLOT.left}
            x2={PLOT.right}
            y1={y(level)}
            y2={y(level)}
            stroke="#e4edf8"
            strokeWidth={level === 0 ? 1.6 : 1}
          />
          <text x={PLOT.left - 14} y={y(level) + 4} textAnchor="end" fill="#8fa0b8" fontSize="11" fontWeight="700">
            {level * 100}
          </text>
        </g>
      ))}

      {dayTicks.map((day) => (
        <text key={day} x={x(day)} y={PLOT.bottom + 24} textAnchor="middle" fill="#8fa0b8" fontSize="11" fontWeight="700">
          {day === 0 ? 'Day 0' : `${day}d`}
        </text>
      ))}

      <path
        d={`${spacedPath} L ${PLOT.right} ${PLOT.bottom} L ${PLOT.left} ${PLOT.bottom} Z`}
        fill="url(#spaced-fill)"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 1400ms ease 900ms' }}
      />

      <path
        d={cramPath}
        fill="none"
        stroke="#ff7a59"
        strokeWidth="2.6"
        strokeDasharray="7 6"
        strokeLinecap="round"
        style={{ opacity: inView ? 1 : 0, transition: 'opacity 1200ms ease' }}
      />

      <path
        d={spacedPath}
        fill="none"
        stroke="url(#spaced-stroke)"
        strokeWidth="3.2"
        strokeLinejoin="round"
        pathLength={1}
        style={{
          strokeDasharray: 1,
          strokeDashoffset: inView ? 0 : 1,
          transition: 'stroke-dashoffset 2200ms var(--ease-out-quint) 350ms',
        }}
      />

      {REVIEWS.map((day, i) => (
        <g key={day} style={{ opacity: inView ? 1 : 0, transition: `opacity 500ms ease ${700 + i * 200}ms` }}>
          <line
            x1={x(day)}
            x2={x(day)}
            y1={y(1)}
            y2={PLOT.bottom}
            stroke="#c9d8ec"
            strokeWidth="1.4"
            strokeDasharray="3 5"
          />
          <circle cx={x(day)} cy={y(1)} r="6.5" fill="#fff" stroke="#6c5cff" strokeWidth="3" />
        </g>
      ))}

      <g style={{ opacity: inView ? 1 : 0, transition: 'opacity 700ms ease 2400ms' }}>
        <line x1={PLOT.right} x2={PLOT.right} y1={PLOT.top - 12} y2={PLOT.bottom} stroke="#0d1526" strokeWidth="1.6" />
        <text x={PLOT.right - 6} y={PLOT.top - 18} textAnchor="end" fill="#0d1526" fontSize="11" fontWeight="800">
          EXAM DAY
        </text>

        <g>
          <rect x={PLOT.right - 84} y={y(spacedRecall(60)) - 34} width="78" height="26" rx="13" fill="#6c5cff" />
          <text
            x={PLOT.right - 45}
            y={y(spacedRecall(60)) - 16}
            textAnchor="middle"
            fill="#fff"
            fontSize="12"
            fontWeight="800"
          >
            {Math.round(spacedRecall(60) * 100)}% recall
          </text>
        </g>

        <g>
          <rect x={PLOT.right - 84} y={y(cramRecall(60)) - 34} width="78" height="26" rx="13" fill="#ff7a59" />
          <text
            x={PLOT.right - 45}
            y={y(cramRecall(60)) - 16}
            textAnchor="middle"
            fill="#fff"
            fontSize="12"
            fontWeight="800"
          >
            {Math.round(cramRecall(60) * 100)}% recall
          </text>
        </g>
      </g>
    </svg>
  )
}

const notes = [
  {
    stat: '6',
    label: 'reviews',
    body: 'The whole cost of holding one concept for a term — spread over two months, not one night.',
    tone: 'from-violet to-azure',
  },
  {
    stat: '18h',
    label: 'saved per course',
    body: 'Hours that would have gone into rereading chapters you already knew cold.',
    tone: 'from-mint to-azure',
  },
  {
    stat: '±1d',
    label: 'precision',
    body: 'Every card is modelled on its own, so an easy definition never shares a schedule with a brutal proof.',
    tone: 'from-coral to-sun',
  },
]

export function Science() {
  return (
    <section
      id="science"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#eef6ff_30%,#e6f2ff_100%)] py-24 lg:py-32"
    >
      <div className="shell relative">
        <div className="flex flex-col items-center">
          <Reveal>
            <Pill>
              <Sparkle className="h-3.5 w-3.5 text-coral" />
              The science
            </Pill>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading className="mt-6 max-w-3xl">
              Your memory already has a schedule.
              <br />
              Most study apps <Highlight tone="blush">ignore it.</Highlight>
            </SectionHeading>
          </Reveal>

          <Reveal delay={140}>
            <Lede className="mt-6">
              Memory fades on a curve. Pull something back just as it starts to slip and it returns
              stronger, fading slower each time — which makes the last possible moment the best one to
              review.
            </Lede>
          </Reveal>
        </div>

        <Reveal delay={120} distance={26}>
          <div className="panel mt-14 p-5 sm:p-8">
            <div className="mb-6 flex flex-wrap items-center gap-x-7 gap-y-3">
              <span className="flex items-center gap-2 text-[13px] font-bold text-ink">
                <span className="h-1 w-7 rounded-full bg-gradient-to-r from-azure to-violet" />
                With Retain
              </span>
              <span className="flex items-center gap-2 text-[13px] font-bold text-slate-soft">
                <span className="h-1 w-7 rounded-full bg-coral" />
                Cramming once
              </span>
              <span className="ml-auto flex items-center gap-2 text-[13px] font-bold text-slate-soft">
                <span className="h-3 w-3 rounded-full border-[3px] border-violet bg-white" />
                Scheduled review
              </span>
            </div>
            <RetentionChart />
          </div>
        </Reveal>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {notes.map((note, i) => (
            <Reveal key={note.label} delay={i * 110}>
              <div className="panel lift flex h-full items-start gap-4 p-6">
                <span
                  className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center rounded-2xl bg-gradient-to-br ${note.tone} text-white`}
                >
                  <span className="text-[17px] leading-none font-extrabold">{note.stat}</span>
                </span>
                <div>
                  <h3 className="text-[13.5px] font-extrabold text-ink">{note.label}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-slate">{note.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
