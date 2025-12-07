import { Search, SlidersHorizontal } from 'lucide-react'
import Button from './Button.jsx'

export default function TableToolbar({
  placeholder = 'Search records',
  onFilterClick = () => {},
  actions,
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4">
      <div className="relative flex-1 min-w-[200px] max-w-xl">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          placeholder={placeholder}
          className="h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-600 placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {actions}
        <Button
          variant="outline"
          leadingIcon={SlidersHorizontal}
          onClick={onFilterClick}
        >
          Advanced filters
        </Button>
      </div>
    </div>
  )
}

