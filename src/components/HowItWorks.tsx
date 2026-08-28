import { useEffect, useState, type ReactNode } from 'react'
import { Highlight, Lede, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal } from './Reveal'

function Panel({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-line px-6 py-4">
        <span className="text-[13.5px] font-extrabold text-ink">{title}</span>
        <span className="rounded-full bg-sky px-3 py-1 text-[11px] font-extrabold text-azure">{meta}</span>
      </div>
      <div className="flex-1 p-6">{children}</div>
    </div>
  )
}

function SourcesMock() {
  const files = [
    { name: 'Lecture 12 — Renal Physiology.pdf', meta: '48 slides', progress: 100, tone: 'from-violet to-azure' },
    { name: 'Biochem — glycolysis notes.md', meta: '3,100 words', progress: 100, tone: 'from-mint to-azure' },
    { name: 'Seminar recording.m4a', meta: '52 min', progress: 64, tone: 'from-coral to-sun' },
  ]

  return (
    <Panel title="Your sources" meta="3 files">
      <div className="space-y-3">
        {files.map((file) => (
          <div key={file.name} className="rounded-2xl bg-[#f6f9ff] p-4">
            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${file.tone}`}>
                <svg viewBox="0 0 24 24" className="h-4 w-4 text-white" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M7 3h7l4 4v14H7z" />
                  <path d="M14 3v4h4" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[13px] font-bold text-ink">{file.name}</span>
                <span className="text-[11px] font-semibold text-slate-soft">{file.meta}</span>
              </span>
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${file.tone}`}
                  style={{ width: `${file.progress}%` }}
                />
              </div>
              <span className="text-[10.5px] font-bold text-slate-soft">
                {file.progress === 100 ? 'Ready' : 'Transcribing…'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] font-semibold text-slate-soft">
        142 concepts found · 68 cards drafted · 0 duplicates
      </p>
    </Panel>
  )
}

function CardsMock() {
  const drafts = [
    { tag: 'Cloze', tone: 'bg-violet/12 text-violet', q: 'Aldosterone increases sodium reabsorption in the ___ tubule.', src: 'Slide 21' },
    { tag: 'Free recall', tone: 'bg-mint/15 text-mint', q: 'Explain why a drop in GFR raises renin secretion.', src: 'Slide 30' },
    { tag: 'Applied', tone: 'bg-coral/12 text-coral', q: 'A patient on furosemide shows K⁺ 2.9. What is the mechanism?', src: 'Seminar 00:31' },
  ]

  return (
    <Panel title="Generated recall set" meta="68 cards">
      <div className="space-y-3">
        {drafts.map((card) => (
          <div key={card.q} className="rounded-2xl bg-[#f6f9ff] p-4">
            <div className="flex items-center gap-2.5">
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-extrabold tracking-wide uppercase ${card.tone}`}>
                {card.tag}
              </span>
              <span className="text-[10.5px] font-bold text-slate-soft">{card.src}</span>
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed font-semibold text-ink-soft">{card.q}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[12px] font-semibold text-slate-soft">
        Every card links back to the exact line it came from.
      </p>
    </Panel>
  )
}

function SessionMock() {
  const grades = [
    { label: 'Again', interval: '10 min', tone: 'bg-coral/12 text-coral' },
    { label: 'Hard', interval: '2 days', tone: 'bg-sun/20 text-[#b98200]' },
    { label: 'Good', interval: '6 days', tone: 'bg-mint text-white' },
    { label: 'Easy', interval: '14 days', tone: 'bg-violet/12 text-violet' },
  ]

  return (
    <Panel title="Today's session" meta="7 / 12">
      <div className="flex h-full flex-col">
        <div className="flex gap-1">
          {Array.from({ length: 12 }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i < 7 ? 'bg-gradient-to-r from-violet to-azure' : 'bg-line'}`}
            />
          ))}
        </div>

        <p className="mt-6 text-[16px] leading-snug font-extrabold text-ink">
          Why does hyperkalemia slow cardiac conduction?
        </p>

        <div className="mt-4 rounded-2xl bg-[#f4f7ff] p-4 ring-1 ring-line">
          <p className="text-[12.5px] leading-relaxed text-slate">
            Raised extracellular K⁺ depolarises the resting membrane, so more fast Na⁺ channels sit
            inactivated — phase 0 slows and conduction velocity drops.
          </p>
        </div>

        <div className="mt-auto grid grid-cols-4 gap-2 pt-6">
          {grades.map((grade) => (
            <div key={grade.label} className={`rounded-xl px-2 py-2.5 text-center ${grade.tone}`}>
              <span className="block text-[12px] font-extrabold">{grade.label}</span>
              <span className="mt-0.5 block text-[10px] font-bold opacity-75">{grade.interval}</span>
            </div>
          ))}
        </div>
      </div>
    </Panel>
  )
}

function MasteryMock() {
  const topics = [
    { name: 'Renal physiology', value: 94, next: 'in 12 days', tone: 'from-mint to-azure' },
    { name: 'Acid–base balance', value: 81, next: 'in 5 days', tone: 'from-violet to-azure' },
    { name: 'Pharmacokinetics', value: 58, next: 'tomorrow', tone: 'from-coral to-sun', risk: true },
    { name: 'Cardiac conduction', value: 76, next: 'in 3 days', tone: 'from-blush to-violet' },
  ]

  return (
    <Panel title="Mastery forecast" meta="Exam in 23 days">
      <div className="space-y-5">
        {topics.map((topic) => (
          <div key={topic.name}>
            <div className="flex items-center justify-between text-[12.5px]">
              <span className="flex items-center gap-2 font-bold text-ink">
                {topic.risk && <span className="h-2 w-2 rounded-full bg-coral" />}
                {topic.name}
              </span>
              <span className="font-bold text-slate-soft">
                {topic.value}% · {topic.next}
              </span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#eef4fc]">
              <div className={`h-full rounded-full bg-gradient-to-r ${topic.tone}`} style={{ width: `${topic.value}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 flex items-center justify-between rounded-2xl bg-[#f4f8ff] px-5 py-4">
        <span className="text-[12.5px] font-bold text-slate">Projected recall on exam day</span>
        <span className="text-[18px] font-extrabold text-mint">91%</span>
      </div>
    </Panel>
  )
}

const steps = [
  {
    title: 'Drop in your material',
    body: 'PDFs, slide decks, notes, lecture audio, photos of a whiteboard. Retain reads all of it.',
    tone: 'from-violet to-azure',
    mock: <SourcesMock />,
  },
  {
    title: 'Retain writes the recall set',
    body: 'It pulls out the testable ideas and phrases them as questions that demand retrieval.',
    tone: 'from-sun to-coral',
    mock: <CardsMock />,
  },
  {
    title: 'Review in short sessions',
    body: 'Seven minutes a day, only the cards due today. Grade yourself; the schedule adjusts instantly.',
    tone: 'from-mint to-azure',
    mock: <SessionMock />,
  },
  {
    title: 'Watch mastery compound',
    body: 'Intervals stretch as memories stabilise, and weak topics surface long before the exam.',
    tone: 'from-blush to-violet',
    mock: <MasteryMock />,
  },
]

export function HowItWorks() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused) return
    const timer = window.setInterval(() => setActive((v) => (v + 1) % steps.length), 5200)
    return () => window.clearInterval(timer)
  }, [paused, active])

  return (
    <section id="how" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="shell relative">
        <div className="flex flex-col items-center">
          <Reveal>
            <Pill>
              <Sparkle className="h-3.5 w-3.5 text-mint" />
              How it works
            </Pill>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading className="mt-6 max-w-3xl">
              Four steps from a lecture to
              <br />
              <Highlight tone="mint">long-term memory</Highlight>
            </SectionHeading>
          </Reveal>

          <Reveal delay={140}>
            <Lede className="mt-6">
              You do the seven minutes. Retain does the deciding — what to ask, and exactly when to ask
              it again.
            </Lede>
          </Reveal>
        </div>

        <div
          className="mt-16 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Reveal>
            <ol className="space-y-3">
              {steps.map((step, i) => {
                const isActive = i === active
                return (
                  <li key={step.title}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-current={isActive}
                      className={`flex w-full items-start gap-4 rounded-3xl p-5 text-left transition-all duration-500 ${
                        isActive ? 'bg-white shadow-[0_16px_40px_-20px_rgba(16,42,76,0.3)]' : 'bg-[#f6f9ff] hover:bg-[#eff5ff]'
                      }`}
                    >
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-[14px] font-extrabold transition-all duration-500 ${
                          isActive
                            ? `bg-gradient-to-br ${step.tone} text-white`
                            : 'bg-white text-slate-soft ring-1 ring-line'
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className={`block text-[16.5px] font-extrabold ${isActive ? 'text-ink' : 'text-ink-soft/70'}`}>
                          {step.title}
                        </span>
                        <span
                          className="grid transition-all duration-500 ease-out"
                          style={{ gridTemplateRows: isActive ? '1fr' : '0fr', opacity: isActive ? 1 : 0 }}
                        >
                          <span className="overflow-hidden">
                            <span className="mt-2 block text-[13.5px] leading-relaxed text-slate">{step.body}</span>
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </Reveal>

          <Reveal delay={120} distance={26}>
            <div className="relative">
              <div aria-hidden="true" className="absolute -inset-5 -z-10">
                <div className="absolute top-4 right-8 h-40 w-40 rounded-full bg-violet/25 blur-3xl" />
                <div className="absolute bottom-2 left-6 h-44 w-44 rounded-full bg-sun/30 blur-3xl" />
              </div>

              <div className="panel relative h-[470px] overflow-hidden">
                {steps.map((step, i) => (
                  <div
                    key={step.title}
                    aria-hidden={i !== active}
                    className="absolute inset-0 transition-all duration-700"
                    style={{
                      opacity: i === active ? 1 : 0,
                      transform: i === active ? 'none' : 'translateY(12px) scale(0.99)',
                      pointerEvents: i === active ? 'auto' : 'none',
                    }}
                  >
                    {step.mock}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
