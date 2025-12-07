export default function Card({ title, action, children, className = '', noPadding = false }) {
  return (
    <section
      className={[
        'rounded-2xl border border-slate-100 bg-white shadow-sm transition-shadow duration-200 hover:shadow-md',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {title ? (
        <header className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              {title}
            </p>
          </div>
          {action}
        </header>
      ) : null}
      <div className={noPadding ? '' : 'px-6 py-5'}>{children}</div>
    </section>
  )
}

