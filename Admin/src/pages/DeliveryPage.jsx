import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Table from '../components/ui/Table.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import { deliveryMatrix } from '../data/mockData.js'

const deliveryColumns = [
  { key: 'route', label: 'Route' },
  { key: 'stops', label: 'Stops' },
  { key: 'avgTime', label: 'Avg time' },
  {
    key: 'compliance',
    label: 'SLA compliance',
    render: (value) => <Badge variant="success">{value}</Badge>,
  },
]

export default function DeliveryPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Logistics</p>
          <h1 className="text-3xl font-semibold text-slate-900">Delivery management</h1>
        </div>
        <Button variant="secondary" leadingIcon={RefreshCcw}>
          Optimize routing
        </Button>
      </header>
      <Card title="Route performance" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search routes"
          onFilterClick={() => setFiltersOpen(true)}
        />
        <Table
          columns={deliveryColumns}
          data={deliveryMatrix}
          footer={<Pagination page={1} total={5} />}
        />
      </Card>
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Route filters"
        fields={[
          {
            label: 'Compliance',
            component: 'select',
            options: [
              { value: '90+', label: '90%+' },
              { value: '95+', label: '95%+' },
            ],
          },
          {
            label: 'Max stops',
            type: 'number',
          },
        ]}
      />
    </div>
  )
}

