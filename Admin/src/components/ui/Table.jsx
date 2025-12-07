export default function Table({ columns = [], data = [], footer }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100 text-sm">
          <thead className="bg-slate-50 text-left uppercase tracking-wide text-xs text-slate-500">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className={`px-5 py-3 ${column.className || ''}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white text-slate-700">
            {data.map((row, rowIndex) => (
              <tr
                key={row.id || row.sku || rowIndex}
                className="odd:bg-white even:bg-slate-50/50 transition-colors hover:bg-primary/5"
              >
                {columns.map((column) => (
                  <td key={column.key} className={`px-5 py-4 ${column.className || ''}`}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footer ? <div className="border-t border-slate-100 bg-slate-50 px-5 py-3">{footer}</div> : null}
    </div>
  )
}

