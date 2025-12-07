import { X } from 'lucide-react'

export default function Drawer({ open, onClose, title, children }) {
  return (
    <>
      <div
        className={[
          'fixed inset-0 z-30 bg-slate-900/20 transition-opacity duration-300',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        ].join(' ')}
        onClick={onClose}
      />
      <aside
        className={[
          'fixed inset-y-0 right-0 z-40 w-full max-w-md transform border-l border-slate-100 bg-white p-6 shadow-2xl transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-primary/70">Drawer</p>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          </div>
          <button
            className="rounded-full border border-slate-200 p-2 text-slate-500 transition hover:border-primary hover:text-primary"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="mt-6 space-y-4 text-sm text-slate-600">{children}</div>
      </aside>
    </>
  )
}

