import { HeroShowcase } from './HeroShowcase'
import { AvatarStack, Button, Sparkle } from './primitives'
import { Reveal } from './Reveal'
import { Clouds, Stars } from './Sky'

const schools = [
  'Johns Hopkins',
  'UCL Medical',
  'IIT Bombay',
  'Karolinska',
  'NUS Law',
  'ETH Zürich',
  'UT Austin',
  'McGill',
]

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden bg-[linear-gradient(180deg,#a8d5ff_0%,#c4e3ff_26%,#dcecff_58%,#cfe7ff_100%)] pt-[104px]"
      >
        {/* Clouds and stars stay in the upper sky, fading out before they reach the photo. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[680px] [mask-image:linear-gradient(180deg,#000_30%,transparent)]"
        >
          <Clouds />
          <Stars />
        </div>

        <div className="shell relative">
          <div className="flex flex-col items-center text-center">
            <Reveal>
              <span className="inline-flex items-center gap-2.5 rounded-full bg-white/90 py-2 pr-4 pl-2 shadow-[0_8px_22px_-10px_rgba(16,42,76,0.45)] ring-1 ring-white">
                <AvatarStack />
                <span className="text-[12.5px] font-bold text-ink-soft">Trusted by 14,000+ students</span>
              </span>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 max-w-4xl text-[clamp(2.4rem,5.9vw,4.15rem)] text-ink">
                Study Smarter. Recall Faster.
                <br />
                Forget Nothing.
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-slate">
                Retain turns your notes, lectures and PDFs into recall practice, then schedules every
                review for the exact moment you were about to forget.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button size="lg">
                  Get started free
                  <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path
                      d="M2.5 8h10M9 4.5 12.5 8 9 11.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </Button>
                <Button href="#how" variant="white" size="lg">
                  <Sparkle className="h-4 w-4 text-violet" />
                  See how it works
                </Button>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <p className="mt-5 text-[12.5px] font-semibold text-slate-soft">
                Free for your first 300 cards · No credit card · Imports your Anki decks
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={160} distance={26}>
          <div className="relative mx-auto mt-12 w-full max-w-5xl lg:mt-14">
            <picture>
              <source media="(max-width: 640px)" srcSet="/students-900.jpg" />
              <img
                src="/students-1600.jpg"
                alt="A group of students crowded into a selfie, laughing and pointing at the camera"
                width={1600}
                height={1067}
                fetchPriority="high"
                /* Masked on three sides so the photo dissolves into the sky instead of sitting in a hard rectangle. */
                className="aspect-[3/2] max-h-[620px] w-full object-cover object-top [mask-composite:intersect] [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent),linear-gradient(180deg,transparent,#000_30%)]"
              />
            </picture>
          </div>
        </Reveal>
      </section>

      <section className="relative overflow-hidden bg-white pt-20 pb-4 lg:pt-24">
        <div className="shell relative">
          <Reveal distance={30}>
            <HeroShowcase />
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-24 lg:mt-28">
              <div className="panel flex flex-col gap-5 px-6 py-6 sm:flex-row sm:items-center sm:gap-10">
                <p className="shrink-0 text-[12px] font-extrabold tracking-[0.12em] text-slate-soft uppercase">
                  Loved by students at
                </p>
                <div className="relative flex-1 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_7%,#000_93%,transparent)]">
                  <div className="animate-marquee flex w-max items-center gap-10">
                    {[...schools, ...schools].map((school, i) => (
                      <span key={`${school}-${i}`} className="text-[15px] font-bold whitespace-nowrap text-ink-soft/55">
                        {school}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
