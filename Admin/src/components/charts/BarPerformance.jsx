export default function BarPerformance() {
  const bars = [
    { label: 'Mon', primary: 72, secondary: 28 },
    { label: 'Tue', primary: 60, secondary: 40 },
    { label: 'Wed', primary: 86, secondary: 14 },
    { label: 'Thu', primary: 54, secondary: 46 },
    { label: 'Fri', primary: 74, secondary: 26 },
    { label: 'Sat', primary: 64, secondary: 36 },
    { label: 'Sun', primary: 80, secondary: 20 },
  ]

  return (
    <div className="h-60 rounded-2xl bg-white p-6">
      <div className="text-sm uppercase tracking-wide text-primary/70">Bar chart</div>
      <div className="text-2xl font-semibold text-slate-800">Channel mix</div>
      <div className="mt-6 flex items-end justify-between gap-3">
        {bars.map((bar) => (
          <div key={bar.label} className="flex w-full flex-col items-center gap-3">
            <div className="flex h-36 w-6 flex-col-reverse overflow-hidden rounded-full bg-slate-100">
              <span
                className="block bg-primary transition-all duration-500"
                style={{ height: `${bar.primary}%` }}
              />
              <span
                className="block bg-primary/20 transition-all duration-500"
                style={{ height: `${bar.secondary}%` }}
              />
            </div>
            <span className="text-xs font-semibold text-slate-500">{bar.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

