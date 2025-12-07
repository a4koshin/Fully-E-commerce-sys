const badgeStyles = {
  success: 'bg-primary/10 text-primary',
  neutral: 'bg-slate-100 text-slate-700',
  warning: 'bg-amber-100 text-amber-700',
  danger: 'bg-rose-100 text-rose-700',
}

export default function Badge({ variant = 'neutral', children }) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold',
        badgeStyles[variant],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  )
}

