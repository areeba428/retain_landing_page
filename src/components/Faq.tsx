import { useState } from 'react'
import { Highlight, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal } from './Reveal'

const faqs = [
  {
    q: 'How is this different from Anki?',
    a: 'Anki gives you an interval algorithm and expects you to write every card yourself. Retain writes the cards from your own material, judges answers you type in your own words, and models each concept in relation to the others rather than as an isolated pair of sides.',
  },
  {
    q: 'Does it just generate generic AI questions?',
    a: 'No. Every question is grounded in a specific line, slide or timestamp of something you uploaded, and the source stays attached to the card. If a card is wrong or awkward, you edit it once and the change carries to related cards.',
  },
  {
    q: 'What if I fall behind for two weeks?',
    a: 'Retain rebuilds the queue instead of dumping 400 overdue cards on you. It prioritises the concepts nearest their forgetting threshold and the ones other material depends on, then eases the backlog over several sessions.',
  },
  {
    q: 'Can I use it for languages?',
    a: 'Yes — vocabulary, grammar patterns and audio prompts all work. Pronunciation cards play recorded audio on the front and accept spoken or typed answers.',
  },
  {
    q: 'Where does my material live?',
    a: 'Encrypted at rest, private to your account, never used to train shared models. You can export everything as markdown and CSV, or delete a source and every card derived from it, at any time.',
  },
  {
    q: 'Does it work offline?',
    a: 'Review sessions do. The mobile app caches the next few days of due cards and syncs your grades when you are back online, which is the whole point of a commute.',
  },
]

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f2f9ff_100%)] py-24 lg:py-32">
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <Pill>
                <Sparkle className="h-3.5 w-3.5 text-sun" />
                FAQ
              </Pill>
              <SectionHeading align="left" className="mt-6 text-[clamp(1.9rem,3.8vw,2.7rem)]">
                Reasonable
                <br />
                <Highlight tone="sky">doubts</Highlight>
              </SectionHeading>
              <p className="mt-5 max-w-xs text-[14.5px] leading-relaxed text-slate">
                Still unsure? Write to{' '}
                <a href="#start" className="font-bold text-violet underline decoration-violet/30 underline-offset-4">
                  hello@retain.study
                </a>{' '}
                and a human answers.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="space-y-3">
              {faqs.map((faq, i) => {
                const isOpen = open === i
                return (
                  <div
                    key={faq.q}
                    className={`rounded-3xl transition-all duration-500 ${
                      isOpen ? 'bg-white shadow-[0_18px_44px_-24px_rgba(16,42,76,0.32)]' : 'bg-white/70 hover:bg-white'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 p-6 text-left"
                    >
                      <span className="text-[15.5px] font-extrabold text-ink">{faq.q}</span>
                      <span
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                          isOpen ? 'rotate-45 bg-violet text-white' : 'bg-[#f1f6ff] text-slate'
                        }`}
                      >
                        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                          <path d="M7 2v10M2 7h10" strokeLinecap="round" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className="grid transition-all duration-500 ease-out"
                      style={{ gridTemplateRows: isOpen ? '1fr' : '0fr', opacity: isOpen ? 1 : 0 }}
                    >
                      <p className="overflow-hidden text-[14px] leading-relaxed text-slate">
                        <span className="block px-6 pb-6">{faq.a}</span>
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
