import { useState } from 'react'
import { Plus, SlidersHorizontal, Save, X, FileSpreadsheet } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Button from '../components/ui/Button.jsx'
import Table from '../components/ui/Table.jsx'
import Badge from '../components/ui/Badge.jsx'
import Modal from '../components/ui/Modal.jsx'
import FormField from '../components/ui/FormField.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import { productCatalog } from '../data/mockData.js'

const productColumns = [
  { key: 'sku', label: 'SKU' },
  { key: 'product', label: 'Product' },
  { key: 'inventory', label: 'Inventory' },
  { key: 'price', label: 'Price' },
  {
    key: 'status',
    label: 'Status',
    render: (value) => (
      <Badge
        variant={
          value === 'Active' ? 'success' : value === 'Low stock' ? 'warning' : 'danger'
        }
      >
        {value}
      </Badge>
    ),
  },
]

export default function ProductsPage() {
  const [openModal, setOpenModal] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Catalog</p>
          <h1 className="text-3xl font-semibold text-slate-900">Products</h1>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leadingIcon={SlidersHorizontal}>
            Bulk actions
          </Button>
          <Button leadingIcon={Plus} onClick={() => setOpenModal(true)}>
            Add product
          </Button>
        </div>
      </header>
      <Card title="Product list" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search products"
          onFilterClick={() => setFiltersOpen(true)}
          actions={
            <Button variant="secondary" leadingIcon={FileSpreadsheet}>
              Export list
            </Button>
          }
        />
        <Table
          columns={productColumns}
          data={productCatalog}
          footer={<Pagination page={2} total={12} />}
        />
      </Card>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title="Create product"
        actions={
          <>
            <Button variant="secondary" leadingIcon={X} onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
            <Button leadingIcon={Save}>Publish</Button>
          </>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <FormField label="Product name" placeholder="Quantum Smartwatch S4" />
          <FormField label="SKU" placeholder="SKU-5001" />
          <FormField label="Price" placeholder="$349" />
          <FormField label="Inventory" placeholder="0" type="number" />
          <FormField component="textarea" label="Description" placeholder="High-level product summary" className="md:col-span-2" />
          <FormField label="Category" component="select" options={[{ value: 'wearables', label: 'Wearables' }, { value: 'audio', label: 'Audio' }]} />
          <FormField label="Upload media" component="file" className="md:col-span-2" />
        </div>
      </Modal>
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Product filters"
        fields={[
          {
            label: 'Status',
            component: 'select',
            options: [
              { value: 'active', label: 'Active' },
              { value: 'low-stock', label: 'Low stock' },
              { value: 'backorder', label: 'Backorder' },
            ],
          },
          {
            label: 'Category',
            component: 'select',
            options: [
              { value: 'wearables', label: 'Wearables' },
              { value: 'audio', label: 'Audio' },
              { value: 'home', label: 'Home' },
            ],
          },
          { label: 'Price from', type: 'number' },
          { label: 'Price to', type: 'number' },
        ]}
      />
    </div>
  )
}

