const variants = {
  primary:
    'bg-primary text-white shadow-soft hover:bg-[#05a552] focus:ring-2 focus:ring-primary/30',
  secondary:
    'bg-white text-primary border border-primary/20 hover:border-primary hover:bg-primary/5',
  outline:
    'border border-slate-200 text-slate-700 hover:border-primary hover:text-primary',
}

export default function Button({
  children,
  variant = 'primary',
  leadingIcon: LeadingIcon,
  trailingIcon: TrailingIcon,
  className = '',
  type = 'button',
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none',
        variants[variant],
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {LeadingIcon ? <LeadingIcon className="h-4 w-4" /> : null}
      {children}
      {TrailingIcon ? <TrailingIcon className="h-4 w-4" /> : null}
    </button>
  )
}

