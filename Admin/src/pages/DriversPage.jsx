import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import Button from '../components/ui/Button.jsx'
import FormField from '../components/ui/FormField.jsx'
import { driversBoard } from '../data/mockData.js'

export default function DriversPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase text-slate-500">Fleet</p>
        <h1 className="text-3xl font-semibold text-slate-900">Drivers</h1>
      </header>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {driversBoard.map((driver) => (
          <Card key={driver.name} className="p-5">
            <p className="text-lg font-semibold text-slate-900">{driver.name}</p>
            <p className="text-sm text-slate-500">{driver.vehicle}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{driver.capacity}</p>
            <Badge
              variant={
                driver.status === 'On route'
                  ? 'success'
                  : driver.status === 'On standby'
                    ? 'neutral'
                    : 'warning'
              }
            >
              {driver.status}
            </Badge>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="Create driver profile">
          <div className="space-y-4">
            <FormField label="Full name" placeholder="Mason Doyle" />
            <FormField label="Phone number" placeholder="+1 (555) 123-8844" />
            <FormField label="License number" placeholder="CA-458933" />
            <FormField
              label="Route preference"
              component="select"
              options={[
                { value: 'metro', label: 'Metro' },
                { value: 'regional', label: 'Regional' },
                { value: 'b2b', label: 'B2B' },
              ]}
            />
            <FormField component="textarea" label="Notes" placeholder="Any compliance notes or availability details" />
            <div className="flex justify-end">
              <Button>Save driver</Button>
            </div>
          </div>
        </Card>
        <Card title="Register vehicle">
          <div className="space-y-4">
            <FormField label="Vehicle type" placeholder="Sprinter Van" />
            <FormField label="License plate" placeholder="8JZ-431" />
            <FormField label="Capacity (%)" type="number" placeholder="100" />
            <FormField label="Assigned driver" placeholder="Select driver" />
            <FormField component="textarea" label="Maintenance notes" placeholder="Recent service history" />
            <div className="flex justify-end">
              <Button>Save vehicle</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

