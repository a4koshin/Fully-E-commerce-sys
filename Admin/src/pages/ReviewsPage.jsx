import { useState } from 'react'
import { FileSpreadsheet } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Table from '../components/ui/Table.jsx'
import Button from '../components/ui/Button.jsx'
import TableToolbar from '../components/ui/TableToolbar.jsx'
import Pagination from '../components/ui/Pagination.jsx'
import AdvancedFilterDrawer from '../components/ui/AdvancedFilterDrawer.jsx'
import { reviewList } from '../data/mockData.js'

const reviewColumns = [
  { key: 'product', label: 'Product' },
  { key: 'rating', label: 'Rating' },
  { key: 'reviews', label: 'Reviews' },
  {
    key: 'sentiment',
    label: 'Sentiment',
    render: (value) => (
      <Badge variant={value === 'Positive' ? 'success' : value === 'Mixed' ? 'warning' : 'neutral'}>
        {value}
      </Badge>
    ),
  },
]

export default function ReviewsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Experience</p>
          <h1 className="text-3xl font-semibold text-slate-900">Product reviews</h1>
        </div>
        <Button variant="secondary" leadingIcon={FileSpreadsheet}>
          Export insights
        </Button>
      </header>
      <Card title="Voice of customer" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search reviews"
          onFilterClick={() => setFiltersOpen(true)}
        />
        <Table columns={reviewColumns} data={reviewList} footer={<Pagination page={1} total={12} />} />
      </Card>
      <Card>
        <p className="text-sm text-slate-500">
          Insights: Shipping experience drives 63% of negative feedback while product quality contributes only 18%. Automated alerts target SKUs that drop
          below a 4.0 rating, ensuring proactive outreach to the brand managers.
        </p>
      </Card>
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Review filters"
        fields={[
          {
            label: 'Sentiment',
            component: 'select',
            options: [
              { value: 'positive', label: 'Positive' },
              { value: 'mixed', label: 'Mixed' },
              { value: 'negative', label: 'Negative' },
            ],
          },
          { label: 'Rating from', type: 'number' },
          { label: 'Rating to', type: 'number' },
        ]}
      />
    </div>
  )
}

