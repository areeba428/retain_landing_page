import { Logo } from './primitives'

const columns = [
  { heading: 'Product', links: ['Overview', 'Recall sessions', 'Mastery forecast', 'Mobile app', 'Changelog'] },
  { heading: 'Use cases', links: ['Medical exams', 'Law and bar prep', 'Languages', 'Engineering', 'Certifications'] },
  { heading: 'Resources', links: ['The spacing effect', 'Retrieval practice', 'Import from Anki', 'Docs', 'Status'] },
  { heading: 'Company', links: ['About', 'Research', 'Privacy', 'Terms', 'Contact'] },
]

const socials = [
  { label: 'X', path: 'M3 3l6 6M9 3L3 9', tone: 'hover:bg-ink' },
  {
    label: 'GitHub',
    path: 'M6 1.5a4.5 4.5 0 0 0-1.4 8.8c0-.6 0-1.2.3-1.6-1.7-.3-2-1.5-2-2.4 0-.6.2-1 .5-1.4-.2-.5 0-1.2.1-1.4.5 0 1 .4 1.3.6a4 4 0 0 1 2.4 0c.4-.2.9-.6 1.3-.6.2.2.3.9.1 1.4.4.4.6.8.6 1.4 0 .9-.4 2.1-2.1 2.4.3.3.4.7.4 1.3v1.4A4.5 4.5 0 0 0 6 1.5z',
    tone: 'hover:bg-violet',
  },
  { label: 'Discord', path: 'M3 9c2 1 4 1 6 0M4.5 5.5h.01M7.5 5.5h.01', tone: 'hover:bg-azure' },
]

export function Footer() {
  return (
    <footer className="bg-white pt-16 pb-10 lg:pt-20">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_2fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-[13.5px] leading-relaxed text-slate">
              An AI study companion built around one measurement: what you can still recall a month
              from now.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((icon) => (
                <a
                  key={icon.label}
                  href="#start"
                  aria-label={icon.label}
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl bg-[#f1f6ff] text-slate transition-all duration-300 hover:-translate-y-0.5 hover:text-white ${icon.tone}`}
                >
                  <svg viewBox="0 0 12 12" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d={icon.path} stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[12.5px] font-extrabold tracking-wide text-ink uppercase">{column.heading}</h3>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#start"
                        className="text-[13.5px] font-semibold text-slate transition-colors duration-300 hover:text-violet"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] font-semibold text-slate-soft">
            © {new Date().getFullYear()} Retain Labs. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-[12.5px] font-semibold text-slate-soft">
            <span className="h-2 w-2 rounded-full bg-mint" />
            All systems operational
          </p>
        </div>
      </div>
    </footer>
  )
}
