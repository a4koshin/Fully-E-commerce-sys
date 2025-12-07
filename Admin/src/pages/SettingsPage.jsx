import { useState } from 'react'
import { Save } from 'lucide-react'
import Card from '../components/ui/Card.jsx'
import Tabs from '../components/ui/Tabs.jsx'
import FormField from '../components/ui/FormField.jsx'
import Button from '../components/ui/Button.jsx'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase text-slate-500">Workspace</p>
        <h1 className="text-3xl font-semibold text-slate-900">Settings</h1>
      </header>
      <Card>
        <Tabs
          tabs={[
            { value: 'profile', label: 'Profile' },
            { value: 'team', label: 'Team' },
            { value: 'security', label: 'Security' },
          ]}
          current={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <FormField label="Full name" placeholder="Elena Cruz" />
          <FormField label="Job title" placeholder="Operations Lead" />
          <FormField label="Work email" type="email" placeholder="elena@mycart.com" />
          <FormField label="Workspace" placeholder="myCart HQ" />
        </div>
        <div className="mt-6 flex justify-end">
          <Button leadingIcon={Save}>Save changes</Button>
        </div>
      </Card>
    </div>
  )
}

