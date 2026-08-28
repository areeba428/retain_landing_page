import { Highlight, Pill } from './primitives'
import { Reveal } from './Reveal'

function InlineChip({ tone, children }: { tone: string; children: React.ReactNode }) {
  return (
    <span
      className={`mx-1 inline-flex h-[0.95em] w-[1.35em] translate-y-[0.08em] items-center justify-center rounded-[0.3em] align-middle text-white ${tone}`}
    >
      {children}
    </span>
  )
}

const stats = [
  {
    value: '2.4×',
    label: 'faster to mastery',
    body: 'Retrieval practice moves a concept into long-term memory in a fraction of the sittings that rereading needs.',
  },
  {
    value: '92%',
    label: 'recall at 30 days',
    body: 'Measured across 1.4M graded reviews, against 31% for students who studied the same material in one block.',
  },
]

const forecast = [
  { name: 'Renal physiology', value: 94, tone: 'from-mint to-azure' },
  { name: 'Acid–base balance', value: 81, tone: 'from-violet to-azure' },
  { name: 'Pharmacokinetics', value: 58, tone: 'from-coral to-sun', risk: true },
  { name: 'Cardiac conduction', value: 76, tone: 'from-blush to-violet' },
]

export function Statement() {
  return (
    <section className="relative overflow-hidden py-24 lg:py-32">
      <div className="shell relative">
        <Reveal>
          <h2 className="max-w-4xl text-[clamp(1.9rem,4.4vw,3.2rem)] text-ink">
            A companion that helps
            <InlineChip tone="bg-gradient-to-br from-violet to-azure">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <circle cx="9" cy="8" r="3.2" />
                <circle cx="16.5" cy="9.5" r="2.4" />
                <path d="M3.5 19c.6-3.2 3-4.8 5.5-4.8s4.9 1.6 5.5 4.8Z" />
                <path d="M16.2 13.6c2 .2 3.6 1.7 4.1 4.2h-3.6Z" />
              </svg>
            </InlineChip>
            curious minds learn faster,
            <InlineChip tone="bg-gradient-to-br from-sun to-coral">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="currentColor" aria-hidden="true">
                <path d="M12 2.4c1.1 3.3 2.3 4.5 5.6 5.6-3.3 1.1-4.5 2.3-5.6 5.6-1.1-3.3-2.3-4.5-5.6-5.6C9.7 6.9 10.9 5.7 12 2.4Z" />
              </svg>
            </InlineChip>
            <Highlight tone="sky">recall deeper</Highlight> and walk into the exam
            <InlineChip tone="bg-gradient-to-br from-mint to-azure">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                <path d="M4 13.5 9 18 20 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </InlineChip>
            already sure.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-20">
          <div className="space-y-10">
            {stats.map((stat, i) => (
              <Reveal key={stat.value} delay={i * 120}>
                <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row sm:gap-8">
                  <div className="sm:w-40 sm:shrink-0">
                    <div className="text-[clamp(2.2rem,4vw,3rem)] leading-none font-extrabold tracking-tight text-ink">
                      {stat.value}
                    </div>
                    <div className="mt-2 text-[12.5px] font-bold text-slate-soft">{stat.label}</div>
                  </div>
                  <p className="text-[14.5px] leading-relaxed text-slate">{stat.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} distance={26}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-6 -z-10">
                <div className="absolute top-0 right-6 h-40 w-40 rounded-full bg-sun/40 blur-3xl" />
                <div className="absolute bottom-0 left-4 h-44 w-44 rounded-full bg-violet/30 blur-3xl" />
              </div>

              <div className="panel p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <Pill className="shadow-none ring-0">Mastery forecast</Pill>
                  <span className="rounded-full bg-coral/12 px-3 py-1.5 text-[11.5px] font-extrabold text-coral">
                    Exam in 23 days
                  </span>
                </div>

                <div className="mt-7 space-y-5">
                  {forecast.map((topic) => (
                    <div key={topic.name}>
                      <div className="flex items-center justify-between text-[13px]">
                        <span className="flex items-center gap-2 font-bold text-ink">
                          {topic.risk && <span className="h-2 w-2 rounded-full bg-coral" />}
                          {topic.name}
                        </span>
                        <span className="font-bold text-slate-soft">{topic.value}%</span>
                      </div>
                      <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#eef4fc]">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${topic.tone}`}
                          style={{ width: `${topic.value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between rounded-2xl bg-[#f4f8ff] px-5 py-4">
                  <span className="text-[13px] font-bold text-slate">Projected recall on exam day</span>
                  <span className="text-[20px] font-extrabold text-mint">91%</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
