import { useState } from 'react'
import { GitBranch, Tags, FileSpreadsheet } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Table from '../components/ui/Table.jsx'
import Button from '../components/ui/Button.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import EntityModal from '../components/ui/EntityModal.jsx'
import { subCategoryList, brandHealth } from '../data/mockData.js'

const subColumns = [
  { key: 'name', label: 'Sub category' },
  { key: 'parent', label: 'Parent' },
  { key: 'sku', label: 'SKU count' },
  {
    key: 'active',
    label: 'Status',
    render: (value) => <Badge variant={value ? 'success' : 'neutral'}>{value ? 'Active' : 'Inactive'}</Badge>,
  },
]

const brandColumns = [
  { key: 'name', label: 'Brand' },
  { key: 'collections', label: 'Collections' },
  {
    key: 'status',
    label: 'Tier',
    render: (value) => (
      <Badge variant={value === 'Preferred' ? 'success' : value === 'Strategic' ? 'neutral' : 'warning'}>
        {value}
      </Badge>
    ),
  },
]

export default function SubCategoriesPage() {
  const [activeFilters, setActiveFilters] = useState(null)
  const [activeModal, setActiveModal] = useState(null)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Taxonomy</p>
          <h1 className="text-3xl font-semibold text-slate-900">Sub-categories & brand tiers</h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leadingIcon={GitBranch} onClick={() => setActiveModal('subCategory')}>
            Add sub-category
          </Button>
          <Button leadingIcon={Tags} onClick={() => setActiveModal('brand')}>
            Invite brand
          </Button>
        </div>
      </header>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Sub-category catalog" className="p-0" noPadding>
          <TableToolbar
            placeholder="Search sub-categories"
            onFilterClick={() => setActiveFilters('sub')}
            actions={
              <Button variant="secondary" leadingIcon={FileSpreadsheet}>
                Export
              </Button>
            }
          />
          <Table
            columns={subColumns}
            data={subCategoryList}
            footer={<Pagination page={1} total={6} />}
          />
        </Card>
        <Card title="Brand partnerships" className="p-0" noPadding>
          <TableToolbar
            placeholder="Search brands"
            onFilterClick={() => setActiveFilters('brand')}
          />
          <Table
            columns={brandColumns}
            data={brandHealth}
            footer={<Pagination page={1} total={4} />}
          />
        </Card>
      </div>
      <EntityModal entityKey={activeModal} onClose={() => setActiveModal(null)} />
      <AdvancedFilterDrawer
        open={Boolean(activeFilters)}
        onClose={() => setActiveFilters(null)}
        title={
          activeFilters === 'sub' ? 'Sub-category filters' : 'Brand filters'
        }
        fields={
          activeFilters === 'sub'
            ? [
                {
                  label: 'Parent category',
                  component: 'select',
                  options: [
                    { value: 'electronics', label: 'Electronics' },
                    { value: 'fashion', label: 'Fashion' },
                  ],
                },
                {
                  label: 'Status',
                  component: 'select',
                  options: [
                    { value: 'active', label: 'Active' },
                    { value: 'inactive', label: 'Inactive' },
                  ],
                },
              ]
            : [
                {
                  label: 'Tier',
                  component: 'select',
                  options: [
                    { value: 'preferred', label: 'Preferred' },
                    { value: 'strategic', label: 'Strategic' },
                    { value: 'emerging', label: 'Emerging' },
                  ],
                },
                { label: 'Collections min', type: 'number' },
              ]
        }
      />
    </div>
  )
}

