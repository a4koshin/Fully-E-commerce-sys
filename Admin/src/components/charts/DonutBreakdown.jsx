export default function DonutBreakdown() {
  const segments = [
    { label: 'Subscribers', value: 42, color: '#06be5f' },
    { label: 'Marketplace', value: 28, color: '#0f172a' },
    { label: 'Wholesale', value: 18, color: '#a5b4fc' },
    { label: 'In-store', value: 12, color: '#d9f99d' },
  ]

  return (
    <div className="flex h-60 flex-col gap-6 rounded-2xl bg-gradient-to-br from-white to-primary/10 p-6">
      <div className="text-sm uppercase tracking-wider text-primary/70">Donut chart</div>
      <div className="text-2xl font-semibold text-slate-800">Revenue sources</div>
      <div className="flex flex-1 items-center gap-8">
        <div className="relative h-36 w-36">
          <div className="absolute inset-0 rounded-full border-[14px] border-primary/20" />
          <div className="absolute inset-2 rounded-full border-[12px] border-primary/60" />
          <div className="absolute inset-6 rounded-full border-[10px] border-slate-900/80" />
          <div className="absolute inset-10 rounded-full bg-white" />
          <div className="absolute inset-14 flex flex-col items-center justify-center text-center">
            <span className="text-xs uppercase text-slate-400">Contribution</span>
            <span className="text-xl font-semibold text-slate-800">100%</span>
          </div>
        </div>
        <ul className="space-y-2 text-sm">
          {segments.map((segment) => (
            <li key={segment.label} className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: segment.color }}
              />
              <span className="text-slate-600">{segment.label}</span>
              <span className="font-semibold text-slate-900">{segment.value}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

