import { X } from 'lucide-react'
import Button from './Button.jsx'

export default function Modal({ open, onClose, title, children, actions }) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/30 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-primary/70">
              Modal
            </p>
            <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
          </div>
          <Button variant="outline" leadingIcon={X} onClick={onClose}>
            Close
          </Button>
        </div>
        <div className="space-y-4 text-sm text-slate-600">{children}</div>
        {actions ? <div className="mt-6 flex justify-end gap-3">{actions}</div> : null}
      </div>
    </div>
  )
}

