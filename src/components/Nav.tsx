import { useEffect, useState } from 'react'
import { Button, Logo } from './primitives'

const links = [
  { label: 'Product', href: '#product' },
  { label: 'Science', href: '#science' },
  { label: 'How it works', href: '#how' },
  { label: 'Pricing', href: '#pricing' },
]

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3.5 lg:pt-5">
      <div className="shell">
        <nav
          className={`flex h-16 items-center justify-between rounded-full pr-2.5 pl-5 transition-all duration-500 ${
            scrolled
              ? 'bg-white/85 shadow-[0_10px_30px_-14px_rgba(16,42,76,0.35)] ring-1 ring-white/80 backdrop-blur-xl'
              : 'bg-white/55 ring-1 ring-white/60 backdrop-blur-md'
          }`}
        >
          <Logo />

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[14px] font-bold text-ink-soft/80 transition-colors duration-300 hover:bg-sky/70 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#start"
              className="px-3 text-[14px] font-bold text-ink-soft/80 transition-colors hover:text-ink"
            >
              Log in
            </a>
            <Button size="sm">Get started</Button>
          </div>

          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-[2px] w-4 rounded bg-current transition-all duration-300 ${
                  open ? 'top-1.5 rotate-45' : 'top-0.5'
                }`}
              />
              <span
                className={`absolute left-0 h-[2px] w-4 rounded bg-current transition-all duration-300 ${
                  open ? 'top-1.5 -rotate-45' : 'top-2.5'
                }`}
              />
            </span>
          </button>
        </nav>

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${open ? 'mt-2 max-h-96' : 'max-h-0'}`}
        >
          <div className="panel flex flex-col p-4">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-[15px] font-bold text-ink-soft active:bg-sky/60"
              >
                {link.label}
              </a>
            ))}
            <div className="mt-3 flex items-center gap-3">
              <Button className="flex-1">Get started</Button>
              <Button variant="white" className="flex-1 ring-1 ring-line">
                Log in
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
