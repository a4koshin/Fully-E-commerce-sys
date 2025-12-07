import Drawer from './Drawer.jsx'
import Button from './Button.jsx'
import FormField from './FormField.jsx'

export default function AdvancedFilterDrawer({
  open,
  onClose,
  title = 'Advanced filters',
  fields = [],
}) {
  return (
    <Drawer open={open} onClose={onClose} title={title}>
      <div className="grid gap-4 md:grid-cols-2">
        {fields.map((field) => (
          <FormField
            key={field.label}
            className={field.fullWidth ? 'md:col-span-2' : ''}
            {...field}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <Button variant="secondary" className="flex-1">
          Reset
        </Button>
        <Button className="flex-1">Apply filters</Button>
      </div>
    </Drawer>
  )
}

