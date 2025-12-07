import Button from './Button.jsx'

export default function Pagination({ page = 1, total = 12 }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm text-slate-500">
      <span>
        Showing page {page} of {total}
      </span>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="px-3 py-1 text-xs" disabled={page === 1}>
          Previous
        </Button>
        <div className="flex items-center gap-1">
          {[page, page + 1, page + 2].map((num) => (
            <span
              key={num}
              className={[
                'inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold',
                num === page ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500',
              ].join(' ')}
            >
              {num}
            </span>
          ))}
        </div>
        <Button
          variant="outline"
          className="px-3 py-1 text-xs"
          disabled={page >= total}
        >
          Next
        </Button>
      </div>
    </div>
  )
}

