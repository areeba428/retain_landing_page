import { useState } from 'react'
import { AvatarStack } from './primitives'
import { Reveal } from './Reveal'

type Status = 'idle' | 'sending' | 'sent' | 'error'

export function FinalCta() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function submit(event: React.FormEvent) {
    event.preventDefault()
    if (!email.trim() || status === 'sending') return

    setStatus('sending')
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = (await response.json()) as { detail?: unknown; message?: string }

      if (!response.ok) {
        setStatus('error')
        setMessage(typeof data.detail === 'string' ? data.detail : 'Something went wrong. Try again in a moment.')
        return
      }

      setStatus('sent')
      setMessage(data.message ?? 'Magic link sent — it expires in 15 minutes.')
    } catch {
      setStatus('error')
      setMessage('Could not reach the server. Check your connection and try again.')
    }
  }

  const labels: Record<Status, string> = {
    idle: 'Get started free',
    sending: 'Sending…',
    sent: 'Check your inbox',
    error: 'Try again',
  }

  return (
    <section id="start" className="relative bg-[#f2f9ff] px-5 pt-8 pb-20 lg:px-10 lg:pb-28">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[linear-gradient(135deg,#6c5cff_0%,#3b8cff_52%,#22c99b_100%)] px-6 py-20 text-center lg:px-16 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute -top-16 -left-10 h-64 w-[28rem] rounded-full bg-white/20 blur-3xl" />
          <div className="absolute -right-16 bottom-[-20%] h-72 w-[30rem] rounded-full bg-white/20 blur-3xl" />
          <div className="animate-float absolute top-12 right-[14%] h-16 w-16 rounded-3xl bg-white/20" />
          <div className="animate-float-slow absolute bottom-16 left-[12%] h-20 w-20 rounded-full bg-white/15" />
        </div>

        <div className="relative">
          <Reveal>
            <h2 className="mx-auto max-w-3xl text-[clamp(2rem,5vw,3.5rem)] text-white">
              Start remembering what
              <br />
              you already studied
            </h2>
          </Reveal>

          <Reveal delay={100}>
            <p className="mx-auto mt-6 max-w-lg text-[16px] leading-relaxed font-medium text-white/85">
              Upload one lecture and run a single seven-minute session. You will know within a week
              whether it works, because you will remember it.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <form onSubmit={submit} className="mx-auto mt-10 flex w-full max-w-lg flex-col gap-3 sm:flex-row">
              <label className="sr-only" htmlFor="cta-email">
                Email address
              </label>
              <input
                id="cta-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@university.edu"
                className="h-14 flex-1 rounded-full bg-white/95 px-6 text-[15px] font-semibold text-ink placeholder:font-medium placeholder:text-slate-soft focus:bg-white focus:outline-none focus:ring-4 focus:ring-white/40"
              />
              <button
                type="submit"
                disabled={status === 'sending'}
                className="h-14 shrink-0 rounded-full bg-ink px-8 text-[15px] font-extrabold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1b2740] disabled:opacity-70"
              >
                {labels[status]}
              </button>
            </form>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-7 flex flex-col items-center gap-3">
              <span className="flex items-center gap-2.5 rounded-full bg-white/15 py-2 pr-4 pl-2 backdrop-blur">
                <AvatarStack />
                <span className="text-[12.5px] font-bold text-white">14,000+ students already studying</span>
              </span>
              <p className={`text-[12.5px] font-semibold ${status === 'error' ? 'text-[#fff0b3]' : 'text-white/75'}`}>
                {message || 'Free for your first 300 cards · No credit card · 2 minutes to first session'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
