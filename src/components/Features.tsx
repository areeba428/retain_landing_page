import { Highlight, Lede, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal } from './Reveal'

function CaptureArt() {
  return (
    <div className="relative h-full w-full">
      {[
        { rotate: -8, tone: 'from-azure to-violet', top: 22, left: 12 },
        { rotate: 5, tone: 'from-sun to-coral', top: 14, left: 34 },
        { rotate: -3, tone: 'from-mint to-azure', top: 30, left: 56 },
      ].map((card) => (
        <div
          key={card.left}
          className={`absolute h-24 w-16 rounded-xl bg-gradient-to-br ${card.tone} p-2 shadow-lg`}
          style={{ top: `${card.top}%`, left: `${card.left}%`, transform: `rotate(${card.rotate}deg)` }}
        >
          <span className="block h-1.5 w-8 rounded-full bg-white/80" />
          <span className="mt-1.5 block h-1.5 w-10 rounded-full bg-white/50" />
          <span className="mt-1.5 block h-1.5 w-6 rounded-full bg-white/40" />
        </div>
      ))}
      <div className="absolute right-4 bottom-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 shadow-md">
        <span className="h-2 w-2 rounded-full bg-mint" />
        <span className="text-[10.5px] font-extrabold text-ink">68 cards</span>
      </div>
    </div>
  )
}

function RecallArt() {
  return (
    <div className="relative flex h-full w-full flex-col justify-center gap-2 px-5">
      <div className="rounded-xl bg-white px-3 py-2.5 shadow-md">
        <span className="block h-1.5 w-20 rounded-full bg-ink/15" />
        <span className="mt-1.5 block h-1.5 w-14 rounded-full bg-ink/10" />
      </div>
      <div className="flex gap-1.5">
        {[
          { label: 'Again', tone: 'bg-coral' },
          { label: 'Hard', tone: 'bg-sun' },
          { label: 'Good', tone: 'bg-mint' },
          { label: 'Easy', tone: 'bg-violet' },
        ].map((chip) => (
          <span
            key={chip.label}
            className={`flex-1 rounded-lg py-1.5 text-center text-[9.5px] font-extrabold text-white shadow-sm ${chip.tone}`}
          >
            {chip.label}
          </span>
        ))}
      </div>
    </div>
  )
}

function ScheduleArt() {
  const marked = [2, 4, 9, 15, 22]
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="grid grid-cols-7 gap-1.5 rounded-2xl bg-white p-3 shadow-md">
        {Array.from({ length: 28 }, (_, i) => (
          <span
            key={i}
            className={`h-3.5 w-3.5 rounded-[5px] ${
              marked.includes(i) ? 'bg-gradient-to-br from-violet to-azure' : 'bg-[#eaf1fa]'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function MasteryArt() {
  return (
    <div className="flex h-full w-full items-end justify-center gap-2 pb-6">
      {[30, 46, 38, 62, 80, 96].map((height, i) => (
        <span
          key={height}
          className="w-4 rounded-full bg-gradient-to-t from-blush to-violet"
          style={{ height: `${height * 0.6}px`, opacity: 0.5 + i * 0.1 }}
        />
      ))}
      <span className="absolute top-5 right-5 flex h-8 w-8 items-center justify-center rounded-full bg-mint text-white shadow-md">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
          <path d="M4 13.5 9 18 20 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </div>
  )
}

const cards = [
  {
    kicker: 'Everything you own',
    title: 'Capture',
    body: 'Slides, PDFs, lecture audio and photos of the whiteboard become one connected set of cards.',
    art: <CaptureArt />,
    bg: 'bg-[#eef3ff]',
  },
  {
    kicker: 'Effortful, not passive',
    title: 'Recall',
    body: 'Questions written from your material make you retrieve the answer instead of recognising it.',
    art: <RecallArt />,
    bg: 'bg-[#fff5ec]',
  },
  {
    kicker: 'Timed to your memory',
    title: 'Schedule',
    body: 'Each card returns on the day it is about to fade, so nothing is reviewed sooner than it needs to be.',
    art: <ScheduleArt />,
    bg: 'bg-[#eafaf4]',
  },
  {
    kicker: 'Proof before the exam',
    title: 'Mastery',
    body: 'A live forecast of what you will remember on exam day, with weak topics surfaced early.',
    art: <MasteryArt />,
    bg: 'bg-[#fdeef6]',
  },
]

export function Features() {
  return (
    <section id="product" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="shell relative">
        <div className="flex flex-col items-center">
          <Reveal>
            <Pill>
              <Sparkle className="h-3.5 w-3.5 text-violet" />
              Why it works
            </Pill>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading className="mt-6 max-w-3xl">
              Built for <Highlight tone="sky">real retention,</Highlight> not another streak you lose
            </SectionHeading>
          </Reveal>

          <Reveal delay={140}>
            <Lede className="mt-6">
              Four things happen between the lecture you sat through and the answer you can still give
              a month later. Retain owns all four.
            </Lede>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card, i) => (
            <Reveal key={card.title} delay={i * 100}>
              <article className="panel lift flex h-full flex-col p-5">
                <span className="text-[11.5px] font-bold text-slate-soft">{card.kicker}</span>
                <h3 className="mt-1 text-[20px] font-extrabold text-ink">{card.title}</h3>
                <div className={`relative mt-4 h-44 overflow-hidden rounded-2xl ${card.bg}`}>{card.art}</div>
                <p className="mt-4 text-[13.5px] leading-relaxed text-slate">{card.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
