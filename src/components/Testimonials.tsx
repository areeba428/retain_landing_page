import { Highlight, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal } from './Reveal'

const quotes = [
  {
    quote:
      'I stopped keeping a revision timetable. Retain decides what is fragile today and I trust it — I walked into Step 1 without a single all-nighter.',
    name: 'Amara Osei',
    role: 'MD candidate, Year 3',
    initials: 'AO',
    tone: 'from-coral to-sun',
  },
  {
    quote:
      'Case law used to blur together after a fortnight. It pairs the ones I keep mixing up, and that specific confusion just stopped happening.',
    name: 'Tomás Herrera',
    role: 'Bar exam candidate',
    initials: 'TH',
    tone: 'from-violet to-azure',
  },
  {
    quote:
      'I fed it two semesters of linear algebra notes. It found the twelve ideas everything else rested on and made me prove I knew them.',
    name: 'Wei Lin',
    role: 'MSc Computer Science',
    initials: 'WL',
    tone: 'from-mint to-azure',
  },
]

function Stars() {
  return (
    <span className="flex gap-0.5" aria-label="Five out of five">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 24 24" className="h-3.5 w-3.5 text-sun" fill="currentColor" aria-hidden="true">
          <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5Z" />
        </svg>
      ))}
    </span>
  )
}

export function Testimonials() {
  return (
    <section id="cases" className="relative overflow-hidden bg-[#f4faff] py-24 lg:py-32">
      <div className="shell relative">
        <div className="flex flex-col items-center">
          <Reveal>
            <Pill>
              <Sparkle className="h-3.5 w-3.5 text-blush" />
              Field notes
            </Pill>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading className="mt-6 max-w-3xl">
              From people who had to
              <br />
              <Highlight tone="sun">remember it for real</Highlight>
            </SectionHeading>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          {quotes.map((item, i) => (
            <Reveal key={item.name} delay={i * 110}>
              <figure className="panel lift flex h-full flex-col justify-between p-7">
                <div>
                  <Stars />
                  <blockquote className="mt-4 text-[15px] leading-relaxed font-medium text-ink-soft">
                    {item.quote}
                  </blockquote>
                </div>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-line pt-6">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-[13px] font-extrabold text-white ${item.tone}`}
                  >
                    {item.initials}
                  </span>
                  <span>
                    <span className="block text-[14px] font-extrabold text-ink">{item.name}</span>
                    <span className="block text-[12px] font-semibold text-slate-soft">{item.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
