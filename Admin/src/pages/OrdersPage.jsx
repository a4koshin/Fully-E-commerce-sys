import { useState } from 'react'
import { MapPinned, CheckCircle2, FileSpreadsheet } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Table from '../components/ui/Table.jsx'
import Badge from '../components/ui/Badge.jsx'
import Drawer from '../components/ui/Drawer.jsx'
import FormField from '../components/ui/FormField.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import { orderPipeline } from '../data/mockData.js'

const orderColumns = [
  { key: 'id', label: 'Order' },
  { key: 'channel', label: 'Channel' },
  { key: 'items', label: 'Items' },
  { key: 'total', label: 'Total' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'Dispatched' ? 'success' : value === 'Awaiting pickup' ? 'warning' : 'neutral'}>
        {value}
      </Badge>
    ),
  },
]

export default function OrdersPage() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Fulfillment</p>
          <h1 className="text-3xl font-semibold text-slate-900">Orders pipeline</h1>
        </div>
        <Button leadingIcon={MapPinned} onClick={() => setDrawerOpen(true)}>
          Assign order
        </Button>
      </header>
      <Card title="Active orders" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search orders"
          onFilterClick={() => setFiltersOpen(true)}
          actions={
            <Button variant="secondary" leadingIcon={FileSpreadsheet}>
              Export queue
            </Button>
          }
        />
        <Table columns={orderColumns} data={orderPipeline} footer={<Pagination page={1} total={9} />} />
      </Card>
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Assign delivery partner">
        <FormField label="Order number" placeholder="#2298" />
        <FormField
          label="Courier"
          component="select"
          options={[
            { value: 'metro', label: 'Metro Express' },
            { value: 'northwind', label: 'Northwind Logistics' },
            { value: 'internal', label: 'Internal Fleet' },
          ]}
        />
        <FormField label="Priority notes" component="textarea" placeholder="Leave instructions for the driver" />
        <Button className="w-full justify-center" leadingIcon={CheckCircle2}>
          Confirm assignment
        </Button>
      </Drawer>
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Order filters"
        fields={[
          {
            label: 'Status',
            component: 'select',
            options: [
              { value: 'processing', label: 'Processing' },
              { value: 'dispatched', label: 'Dispatched' },
              { value: 'packed', label: 'Packed' },
            ],
          },
          {
            label: 'Channel',
            component: 'select',
            options: [
              { value: 'web', label: 'Web' },
              { value: 'marketplace', label: 'Marketplace' },
              { value: 'b2b', label: 'B2B' },
            ],
          },
          { label: 'Created from', type: 'date' },
          { label: 'Created to', type: 'date' },
        ]}
      />
    </div>
  )
}

