import { useState } from "react";
import { UserPlus, SendHorizontal, FileSpreadsheet } from "lucide-react";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Table from "../components/ui/Table.jsx";
import Badge from "../components/ui/Badge.jsx";
import TableToolbar from "../components/ui/TableToolbar.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import AdvancedFilterDrawer from "../components/ui/AdvancedFilterDrawer.jsx";
import EntityModal from "../components/ui/EntityModal.jsx";
import { brandHealth } from "../data/mockData.js";

const brandColumns = [
  { key: "name", label: "Brand" },
  { key: "collections", label: "Collections" },
  {
    key: "status",
    label: "Tier",
    render: (value) => (
      <Badge
        variant={
          value === "Preferred"
            ? "success"
            : value === "Strategic"
            ? "neutral"
            : "warning"
        }
      >
        {value}
      </Badge>
    ),
  },
];

export default function BrandsPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Partnerships</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Brand enablement
          </h1>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" leadingIcon={SendHorizontal}>
            Share brief
          </Button>
          <Button leadingIcon={UserPlus} onClick={() => setModalOpen(true)}>
            Add partner
          </Button>
        </div>
      </header>
      <Card title="Brand health" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search partner brands"
          onFilterClick={() => setFiltersOpen(true)}
          actions={
            <Button variant="secondary" leadingIcon={FileSpreadsheet}>
              Export
            </Button>
          }
        />
        <Table
          columns={brandColumns}
          data={brandHealth}
          footer={<Pagination page={1} total={4} />}
        />
      </Card>
      <EntityModal
        entityKey={modalOpen ? "brand" : null}
        onClose={() => setModalOpen(false)}
      />
      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Brand filters"
        fields={[
          {
            label: "Tier",
            component: "select",
            options: [
              { value: "preferred", label: "Preferred" },
              { value: "strategic", label: "Strategic" },
              { value: "emerging", label: "Emerging" },
            ],
          },
          {
            label: "Collections",
            component: "select",
            options: [
              { value: " all", label: "All" },
              { value: "10+", label: "10+ collections" },
              { value: "25+", label: "25+ collections" },
            ],
          },
        ]}
      />
    </div>
  );
}
