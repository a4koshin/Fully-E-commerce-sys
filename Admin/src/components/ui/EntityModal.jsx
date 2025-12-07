import Modal from './Modal.jsx'
import Button from './Button.jsx'
import FormField from './FormField.jsx'
import { catalogModals } from '../../data/catalogEntities.js'

export default function EntityModal({ entityKey, onClose }) {
  if (!entityKey) return null
  const config = catalogModals[entityKey]

  if (!config) return null

  return (
    <Modal
      open
      onClose={onClose}
      title={config.title}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button>Save {config.actionLabel}</Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {config.fields.map((field) => (
          <FormField
            key={field.label}
            className={field.fullWidth ? 'md:col-span-2' : ''}
            {...field}
          />
        ))}
      </div>
    </Modal>
  )
}

