export default function FormField({
  label,
  hint,
  component = 'input',
  options = [],
  className = '',
  ...props
}) {
  const baseStyles =
    'w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20'

  const control =
    component === 'textarea' ? (
      <textarea className={`${baseStyles} min-h-[120px]`} {...props} />
    ) : component === 'select' ? (
      <select className={baseStyles} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : component === 'file' ? (
      <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 px-4 py-8 text-center text-slate-500">
        <span className="text-sm font-semibold text-primary">Upload file</span>
        <span className="text-xs text-slate-400">PNG, JPG up to 2MB</span>
        <input type="file" className="hidden" {...props} />
      </label>
    ) : (
      <input className={baseStyles} {...props} />
    )

  return (
    <label className={['flex flex-col gap-2 text-sm font-medium text-slate-700', className].filter(Boolean).join(' ')}>
      {label}
      {control}
      {hint ? <span className="text-xs font-normal text-slate-400">{hint}</span> : null}
    </label>
  )
}

