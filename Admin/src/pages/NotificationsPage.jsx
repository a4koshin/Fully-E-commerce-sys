import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import { notificationFeed } from '../data/mockData.js'

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase text-slate-500">Communication</p>
        <h1 className="text-3xl font-semibold text-slate-900">Notifications</h1>
      </header>
      <Card title="System alerts">
        <ul className="space-y-4">
          {notificationFeed.map((alert) => (
            <li key={alert.title} className="rounded-2xl border border-slate-100 p-4">
              <div className="flex items-center justify-between">
                <p className="text-base font-semibold text-slate-900">{alert.title}</p>
                <Badge variant="neutral">{alert.time}</Badge>
              </div>
              <p className="text-sm text-slate-500">{alert.detail}</p>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}

