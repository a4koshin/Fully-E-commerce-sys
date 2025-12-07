import { useState } from "react";
import {
  ArrowUpRight,
  ArrowDownRight,
  CalendarDays,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Badge from "../components/ui/Badge.jsx";
import Table from "../components/ui/Table.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import Tabs from "../components/ui/Tabs.jsx";
import TableToolbar from "../components/ui/TableToolbar.jsx";
import AdvancedFilterDrawer from "../components/ui/AdvancedFilterDrawer.jsx";
import AreaTrend from "../components/charts/AreaTrend.jsx";
import BarPerformance from "../components/charts/BarPerformance.jsx";
import DonutBreakdown from "../components/charts/DonutBreakdown.jsx";
import { kpiCards, recentOrders } from "../data/mockData.js";

const orderColumns = [
  { key: "id", label: "Order ID" },
  { key: "customer", label: "Customer" },
  {
    key: "status",
    label: "Status",
    render: (value) => {
      const normalized = value.toLowerCase();
      const variant =
        normalized.includes("deliver") || normalized.includes("out")
          ? "success"
          : normalized.includes("await")
          ? "warning"
          : "neutral";
      return <Badge variant={variant}>{value}</Badge>;
    },
  },
  { key: "value", label: "Value" },
  { key: "date", label: "Date" },
];

export default function DashboardOverview() {
  const [insightTab, setInsightTab] = useState("performance");
  const [orderFiltersOpen, setOrderFiltersOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-primary/60">
            Operations cockpit
          </p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Executive Overview
          </h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary" leadingIcon={CalendarDays}>
            Schedule report
          </Button>
          <Button leadingIcon={Download}>Export snapshot</Button>
        </div>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {kpiCards.map((card) => {
          const Icon = card.trend === "down" ? ArrowDownRight : ArrowUpRight;
          const trendColor =
            card.trend === "down"
              ? "text-rose-500 bg-rose-50"
              : card.trend === "neutral"
              ? "text-slate-500 bg-slate-100"
              : "text-primary bg-primary/10";
          return (
            <Card key={card.label} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {card.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-900">
                    {card.value}
                  </p>
                </div>
                <span
                  className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${trendColor}`}
                >
                  <Icon className="h-4 w-4" />
                  {card.change}
                </span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-primary/80"
                  style={{ width: card.trend === "down" ? "56%" : "82%" }}
                />
              </div>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="col-span-1 lg:col-span-2">
          <AreaTrend />
        </Card>
        <Card>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Alerts
              </p>
              <h3 className="text-xl font-semibold text-slate-900">
                Fulfillment pulse
              </h3>
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-center justify-between">
                <span>Warehouses operating</span>
                <Badge variant="success">5 / 5</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Orders SLA risk</span>
                <Badge variant="warning">3 flagged</Badge>
              </li>
              <li className="flex items-center justify-between">
                <span>Returns awaiting QA</span>
                <Badge>48 units</Badge>
              </li>
            </ul>
          </div>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
        <Card>
          <Tabs
            tabs={[
              { label: "Performance", value: "performance" },
              { label: "Fulfillment", value: "fulfillment" },
              { label: "Customers", value: "customers" },
            ]}
            current={insightTab}
            onChange={setInsightTab}
          />
          <div className="mt-6 text-sm text-slate-500">
            {insightTab === "performance"
              ? "Revenue pacing is 12% ahead of forecast. High-value segments continue to grow week over week."
              : insightTab === "fulfillment"
              ? "Pick-pack cycle time improved by 8%. SLA risk limited to same-day orders in the metro hub."
              : "Net promoter score sits at 72 with repeat purchase rate at 41%."}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase text-slate-400">
                Conversion rate
              </p>
              <p className="text-3xl font-semibold text-slate-900">4.7%</p>
              <p className="text-xs text-primary">+0.6% vs last week</p>
            </div>
            <div className="rounded-2xl border border-slate-100 p-4">
              <p className="text-xs uppercase text-slate-400">
                Returning buyers
              </p>
              <p className="text-3xl font-semibold text-slate-900">41%</p>
              <p className="text-xs text-primary">+2.1% vs last month</p>
            </div>
          </div>
        </Card>
        <Card className="col-span-1 lg:col-span-1">
          <BarPerformance />
        </Card>
        <Card className="col-span-1">
          <DonutBreakdown />
        </Card>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Pipeline
            </p>
            <h3 className="text-2xl font-semibold text-slate-900">
              Recent orders
            </h3>
          </div>
          <Button variant="secondary" leadingIcon={FileSpreadsheet}>
            Download CSV
          </Button>
        </div>
        <Card className="p-0" noPadding>
          <TableToolbar
            placeholder="Search orders"
            onFilterClick={() => setOrderFiltersOpen(true)}
          />
          <Table
            columns={orderColumns}
            data={recentOrders}
            footer={<Pagination page={1} total={42} />}
          />
        </Card>
      </section>
      <AdvancedFilterDrawer
        open={orderFiltersOpen}
        onClose={() => setOrderFiltersOpen(false)}
        title="Order filters"
        fields={[
          {
            label: "Status",
            component: "select",
            options: [
              { value: "processing", label: "Processing" },
              { value: "delivered", label: "Delivered" },
              { value: "delayed", label: "Delayed" },
            ],
          },
          {
            label: "Channel",
            component: "select",
            options: [
              { value: "web", label: "Web" },
              { value: "marketplace", label: "Marketplace" },
              { value: "b2b", label: "B2B" },
            ],
          },
          { label: "Date from", type: "date" },
          { label: "Date to", type: "date" },
        ]}
      />
    </div>
  );
}
