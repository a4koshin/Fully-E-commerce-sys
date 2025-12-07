export default function Tabs({ tabs = [], current, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 border-b border-slate-100">
      {tabs.map((tab) => {
        const active = tab.value === current
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={[
              'rounded-full px-4 py-2 text-sm font-medium transition-all duration-200',
              active
                ? 'bg-primary text-white shadow-soft'
                : 'text-slate-500 hover:text-primary hover:bg-primary/10',
            ].join(' ')}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

