import { useState } from 'react'
import { Button, Highlight, Lede, Pill, SectionHeading, Sparkle } from './primitives'
import { Reveal } from './Reveal'

const tiers = [
  {
    name: 'Starter',
    price: { monthly: 0, yearly: 0 },
    tagline: 'Enough to prove it works on your own material.',
    cta: 'Start free',
    features: ['300 active cards', '5 sources per month', 'Adaptive scheduling', 'Web and mobile review'],
  },
  {
    name: 'Pro',
    price: { monthly: 12, yearly: 8 },
    tagline: 'For a full degree, a licence exam, or a language.',
    cta: 'Start 14-day trial',
    featured: true,
    features: [
      'Unlimited cards and sources',
      'Lecture audio and image capture',
      'Mastery forecast and exam planner',
      'Interference detection drills',
      'Anki and Notion import',
      'Offline sessions',
    ],
  },
  {
    name: 'Campus',
    price: null,
    tagline: 'Cohorts, shared decks and outcome reporting.',
    cta: 'Talk to us',
    features: [
      'Everything in Pro',
      'Shared department decks',
      'Cohort retention dashboards',
      'SSO and LMS integration',
      'Dedicated onboarding',
    ],
  },
]

export function Pricing() {
  const [yearly, setYearly] = useState(true)

  return (
    <section id="pricing" className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div className="shell relative">
        <div className="flex flex-col items-center">
          <Reveal>
            <Pill>
              <Sparkle className="h-3.5 w-3.5 text-azure" />
              Pricing
            </Pill>
          </Reveal>

          <Reveal delay={80}>
            <SectionHeading className="mt-6 max-w-3xl">
              Cheaper than the textbook
              <br />
              you would have <Highlight tone="blush">reread</Highlight>
            </SectionHeading>
          </Reveal>

          <Reveal delay={140}>
            <Lede className="mt-6">
              Students get 40% off Pro with a .edu address. Cancel any time and your cards export as
              plain files.
            </Lede>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 inline-flex items-center gap-1 rounded-full bg-[#f1f6ff] p-1.5">
              {[
                { label: 'Monthly', value: false },
                { label: 'Yearly · save 33%', value: true },
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => setYearly(option.value)}
                  className={`rounded-full px-5 py-2.5 text-[13px] font-extrabold transition-all duration-300 ${
                    yearly === option.value
                      ? 'bg-white text-ink shadow-[0_6px_16px_-8px_rgba(16,42,76,0.4)]'
                      : 'text-slate-soft hover:text-ink'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid items-start gap-6 lg:grid-cols-3">
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 110}>
              <div
                className={`relative flex h-full flex-col rounded-[1.75rem] p-7 lg:p-8 ${
                  tier.featured
                    ? 'bg-gradient-to-br from-violet to-azure text-white shadow-[0_30px_70px_-30px_rgba(108,92,255,0.85)] lg:-mt-4 lg:pb-12'
                    : 'panel lift'
                }`}
              >
                {tier.featured && (
                  <span className="absolute -top-3.5 left-8 rounded-full bg-sun px-3.5 py-1.5 text-[10.5px] font-extrabold tracking-wide text-ink uppercase shadow-md">
                    Most chosen
                  </span>
                )}

                <h3 className={`text-[17px] font-extrabold ${tier.featured ? 'text-white' : 'text-ink'}`}>
                  {tier.name}
                </h3>
                <p className={`mt-2 text-[13px] leading-relaxed ${tier.featured ? 'text-white/80' : 'text-slate'}`}>
                  {tier.tagline}
                </p>

                <div className="mt-7 flex items-baseline gap-1.5">
                  {tier.price ? (
                    <>
                      <span
                        className={`text-[2.8rem] leading-none font-extrabold tracking-tight tabular-nums ${
                          tier.featured ? 'text-white' : 'text-ink'
                        }`}
                      >
                        ${yearly ? tier.price.yearly : tier.price.monthly}
                      </span>
                      <span className={`text-[13px] font-bold ${tier.featured ? 'text-white/70' : 'text-slate-soft'}`}>
                        / month
                      </span>
                    </>
                  ) : (
                    <span className="text-[2.8rem] leading-none font-extrabold tracking-tight text-ink">Custom</span>
                  )}
                </div>
                <p className={`mt-2 h-4 text-[11.5px] font-semibold ${tier.featured ? 'text-white/70' : 'text-slate-soft'}`}>
                  {tier.price && tier.price.yearly > 0 && yearly ? 'Billed annually at $96' : ''}
                  {tier.price && tier.price.yearly === 0 ? 'Free forever' : ''}
                </p>

                <div className="mt-7">
                  <Button variant={tier.featured ? 'white' : 'dark'} className="w-full">
                    {tier.cta}
                  </Button>
                </div>

                <ul className={`mt-8 space-y-3.5 border-t pt-7 ${tier.featured ? 'border-white/25' : 'border-line'}`}>
                  {tier.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-3 text-[13.5px] font-semibold ${
                        tier.featured ? 'text-white/90' : 'text-slate'
                      }`}
                    >
                      <span
                        className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full ${
                          tier.featured ? 'bg-white/25 text-white' : 'bg-mint/15 text-mint'
                        }`}
                      >
                        <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.6" aria-hidden="true">
                          <path d="M2.5 7.4l3 3L11.5 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
