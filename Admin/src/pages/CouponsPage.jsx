import { useState } from 'react'
import { TicketPlus, Save, X } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Table from '../components/ui/Table.jsx'
import Badge from '../components/ui/Badge.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import Modal from '../components/ui/Modal.jsx'
import FormField from '../components/ui/FormField.jsx'
import { couponCampaigns } from '../data/mockData.js'

const couponColumns = [
  { key: 'code', label: 'Code' },
  { key: 'segment', label: 'Segment' },
  { key: 'usage', label: 'Usage' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge variant={value === 'Active' ? 'success' : value === 'Expiring' ? 'warning' : 'neutral'}>{value}</Badge>
    ),
  },
]

export default function CouponsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Revenue</p>
          <h1 className="text-3xl font-semibold text-slate-900">Coupons</h1>
        </div>
        <Button leadingIcon={TicketPlus} onClick={() => setModalOpen(true)}>
          Create coupon
        </Button>
      </header>
      <Card title="Active campaigns" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search coupons"
          onFilterClick={() => setFiltersOpen(true)}
        />
        <Table
          columns={couponColumns}
          data={couponCampaigns}
          footer={<Pagination page={1} total={6} />}
        />
      </Card>
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Coupon filters"
        fields={[
          {
            label: 'Status',
            component: 'select',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'expiring', label: 'Expiring' },
              { value: 'draft', label: 'Draft' },
            ],
          },
          {
            label: 'Segment',
            component: 'select',
            options: [
              { value: 'vip', label: 'VIP' },
              { value: 'all', label: 'All users' },
              { value: 'new', label: 'New customers' },
            ],
          },
        ]}
      />
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Create coupon code"
        actions={
          <>
            <Button variant="secondary" leadingIcon={X} onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button leadingIcon={Save}>Save coupon</Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Coupon code" placeholder="Q4-GROW" />
          <FormField
            label="Segment"
            component="select"
            options={[
              { value: 'vip', label: 'VIP' },
              { value: 'all', label: 'All users' },
              { value: 'new', label: 'New customers' },
            ]}
          />
          <FormField
            label="Discount type"
            component="select"
            options={[
              { value: 'percentage', label: 'Percentage' },
              { value: 'amount', label: 'Fixed amount' },
            ]}
          />
          <FormField label="Value" placeholder="15%" />
          <FormField label="Start date" type="date" />
          <FormField label="Expiration date" type="date" />
          <FormField label="Usage limit" type="number" placeholder="500" />
          <FormField component="textarea" label="Internal notes" placeholder="Stackable rules, partner details..." className="md:col-span-2" />
        </div>
      </Modal>
    </div>
  )
}

