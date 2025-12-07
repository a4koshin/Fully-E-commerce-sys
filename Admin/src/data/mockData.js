export const kpiCards = [
  { label: 'Total Sales', value: '$1.42M', change: '+12.4%', trend: 'up' },
  { label: 'Products', value: '8,940', change: '+3.1%', trend: 'up' },
  { label: 'Orders', value: '24,582', change: '-1.2%', trend: 'down' },
  { label: 'Customers', value: '18,306', change: '+6.9%', trend: 'up' },
  { label: 'Pending Deliveries', value: '146', change: '-4.3%', trend: 'down' },
  { label: 'Avg. Fulfillment', value: '1.8 days', change: '+0.4d', trend: 'neutral' },
]

export const recentOrders = [
  { id: '#ORD-2301', customer: 'Ella Sanders', status: 'Processing', value: '$426.00', date: 'Nov 24, 2025' },
  { id: '#ORD-2298', customer: 'Liam Powell', status: 'Delivered', value: '$198.40', date: 'Nov 24, 2025' },
  { id: '#ORD-2294', customer: 'Noah Patel', status: 'Out for delivery', value: '$764.10', date: 'Nov 23, 2025' },
  { id: '#ORD-2290', customer: 'Maya Chen', status: 'Delivered', value: '$54.90', date: 'Nov 23, 2025' },
  { id: '#ORD-2288', customer: 'Ava Brooks', status: 'Awaiting payment', value: '$1,204.00', date: 'Nov 22, 2025' },
]

export const categorySnapshot = [
  { title: 'Electronics', products: 1640, growth: '+8.4%' },
  { title: 'Home & Living', products: 1248, growth: '+3.8%' },
  { title: 'Beauty & Wellness', products: 982, growth: '+5.1%' },
  { title: 'Fashion', products: 2116, growth: '+6.0%' },
]

export const subCategoryList = [
  { name: 'Wearables', sku: 420, parent: 'Electronics', active: true },
  { name: 'Smart Home', sku: 318, parent: 'Home & Living', active: true },
  { name: 'Organic Skincare', sku: 188, parent: 'Beauty & Wellness', active: false },
  { name: 'Athleisure', sku: 266, parent: 'Fashion', active: true },
]

export const brandHealth = [
  { name: 'Auralux', collections: 24, status: 'Preferred' },
  { name: 'Northwind', collections: 18, status: 'Strategic' },
  { name: 'Kairo Labs', collections: 12, status: 'Emerging' },
  { name: 'NovaWave', collections: 30, status: 'Preferred' },
]

export const productCatalog = [
  { sku: 'SKU-4821', product: 'Quantum Smartwatch S4', inventory: 128, price: '$349', status: 'Active' },
  { sku: 'SKU-3804', product: 'NovaWave Earbuds Max', inventory: 62, price: '$219', status: 'Low stock' },
  { sku: 'SKU-5162', product: 'Lumina Desk Speaker', inventory: 402, price: '$129', status: 'Active' },
  { sku: 'SKU-2980', product: 'Auralux Air Purifier', inventory: 24, price: '$499', status: 'Backorder' },
]

export const orderPipeline = [
  { id: '#2298', channel: 'Web', items: 3, total: '$198.40', status: 'Packed' },
  { id: '#2295', channel: 'Marketplace', items: 9, total: '$972.10', status: 'Dispatched' },
  { id: '#2292', channel: 'B2B', items: 18, total: '$5,804.60', status: 'Awaiting pickup' },
  { id: '#2287', channel: 'Web', items: 1, total: '$64.90', status: 'Processing' },
]

export const reviewList = [
  { product: 'Quantum Smartwatch S4', rating: 4.8, reviews: 1246, sentiment: 'Positive' },
  { product: 'NovaWave Earbuds Max', rating: 4.6, reviews: 864, sentiment: 'Positive' },
  { product: 'Auralux Air Purifier', rating: 4.2, reviews: 312, sentiment: 'Mixed' },
  { product: 'Lumina Desk Speaker', rating: 4.9, reviews: 154, sentiment: 'Positive' },
]

export const couponCampaigns = [
  { code: 'Q4-GROW', segment: 'VIP', usage: '78%', status: 'Active' },
  { code: 'FREESHIP', segment: 'All users', usage: '63%', status: 'Expiring' },
  { code: 'WELCOME10', segment: 'New customers', usage: '41%', status: 'Active' },
  { code: 'BUNDLE25', segment: 'B2B', usage: '22%', status: 'Draft' },
]

export const notificationFeed = [
  { title: 'High priority order flagged', detail: 'Order #2288 requires manual review', time: 'Just now' },
  { title: 'Inventory alert', detail: 'NovaWave Earbuds Max dropped below 50 units', time: '18m ago' },
  { title: 'New review', detail: 'Customer rated Quantum Smartwatch S4 5 stars', time: '1h ago' },
  { title: 'Driver reassigned', detail: 'Route West-14 moved to driver Mason D.', time: '2h ago' },
]

export const deliveryMatrix = [
  { route: 'North Metro', stops: 18, avgTime: '2h 14m', compliance: '98%' },
  { route: 'City Express', stops: 12, avgTime: '1h 06m', compliance: '95%' },
  { route: 'Coastal Freight', stops: 9, avgTime: '3h 48m', compliance: '89%' },
  { route: 'Suburban Plus', stops: 24, avgTime: '2h 56m', compliance: '92%' },
]

export const driversBoard = [
  { name: 'Mason Doyle', vehicle: 'Sprinter Van', capacity: '92%', status: 'On route' },
  { name: 'Ivy Reyes', vehicle: 'Cargo Bike', capacity: '74%', status: 'On standby' },
  { name: 'Leon Vance', vehicle: 'Box Truck', capacity: '88%', status: 'Loading' },
  { name: 'Sara King', vehicle: 'EV Van', capacity: '63%', status: 'On route' },
]

