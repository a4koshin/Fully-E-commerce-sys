export default function AreaTrend() {
  const points = [20, 45, 32, 62, 58, 80, 70, 92, 86, 110]
  const maxPoint = Math.max(...points)

  return (
    <div className="relative h-60 overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-white to-white p-6">
      <div className="text-sm uppercase tracking-wide text-primary/70">Area chart</div>
      <div className="text-2xl font-semibold text-slate-800">Revenue trend</div>
      <div className="absolute inset-x-6 bottom-4 flex h-40 items-end gap-2">
        {points.map((value, index) => (
          <span
            key={index}
            className="flex-1 rounded-full bg-primary/70"
            style={{ height: `${(value / maxPoint) * 100}%`, opacity: 0.3 + index * 0.05 }}
          />
        ))}
      </div>
      <div className="absolute inset-x-6 bottom-0 h-20 rounded-t-[100%] bg-gradient-to-t from-primary/30 via-primary/5 to-transparent" />
    </div>
  )
}

