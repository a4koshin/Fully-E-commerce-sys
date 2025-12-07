import {
  LayoutDashboard,
  FolderTree,
  Layers,
  Tag,
  Boxes,
  ShoppingBag,
  TicketPercent,
  Star,
  Truck,
  HardHat,
  Bell,
  Settings,
} from 'lucide-react'

export const navigation = [
  { label: 'Dashboard', path: '/', icon: LayoutDashboard },
  { label: 'Categories', path: '/categories', icon: FolderTree },
  { label: 'Sub Categories', path: '/sub-categories', icon: Layers },
  { label: 'Brands', path: '/brands', icon: Tag },
  { label: 'Products', path: '/products', icon: Boxes },
  { label: 'Orders', path: '/orders', icon: ShoppingBag },
  { label: 'Coupons', path: '/coupons', icon: TicketPercent },
  { label: 'Reviews', path: '/reviews', icon: Star },
  { label: 'Delivery Management', path: '/delivery', icon: Truck },
  { label: 'Drivers', path: '/drivers', icon: HardHat },
  { label: 'Notifications', path: '/notifications', icon: Bell },
  { label: 'Settings', path: '/settings', icon: Settings },
]

