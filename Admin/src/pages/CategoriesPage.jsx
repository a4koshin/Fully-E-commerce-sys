import { useState } from "react";
import {
  Upload,
  Plus,
  FolderPlus,
  GitBranch,
  Tags,
  Ruler,
  Palette,
  PackagePlus,
  FileSpreadsheet,
} from "lucide-react";

import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Table from "../components/ui/Table.jsx";
import TableToolbar from "../components/ui/TableToolbar.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import AdvancedFilterDrawer from "../components/ui/AdvancedFilterDrawer.jsx";
import EntityModal from "../components/ui/EntityModal.jsx";
import { categorySnapshot } from "../data/mockData.js";

const snapshotColumns = [
  { key: "title", label: "Category" },
  { key: "products", label: "Listed products" },
  { key: "growth", label: "Growth" },
];

export default function CategoriesPage() {
  const [activeModal, setActiveModal] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const quickActions = [
    { key: "category", label: "Category", icon: FolderPlus },
    { key: "subCategory", label: "Sub-category", icon: GitBranch },
    { key: "brand", label: "Brand", icon: Tags },
    { key: "unit", label: "Unit", icon: Ruler },
    { key: "color", label: "Color", icon: Palette },
    { key: "size", label: "Size", icon: PackagePlus },
  ];

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase text-slate-500">Catalog</p>
          <h1 className="text-3xl font-semibold text-slate-900">
            Category management
          </h1>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" leadingIcon={Upload}>
            Import categories
          </Button>

          {/* OPEN CATEGORY MODAL */}
          <Button leadingIcon={Plus} onClick={() => setActiveModal("category")}>
            Add category
          </Button>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {categorySnapshot.map((category) => (
          <Card key={category.title} className="p-5">
            <p className="text-xs uppercase tracking-wide text-slate-500">
              {category.title}
            </p>
            <p className="mt-3 text-3xl font-semibold text-slate-900">
              {category.products.toLocaleString()}
            </p>
            <p className="text-sm text-primary">{category.growth} QoQ</p>
          </Card>
        ))}
      </section>

      <Card>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Workflow</p>
            <h3 className="text-xl font-semibold text-slate-900">
              Quick forms
            </h3>
          </div>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {quickActions.map(({ key, label, icon: Icon }) => (
            <Button
              key={key}
              variant="outline"
              className="justify-start"
              leadingIcon={Icon}
              onClick={() => setActiveModal(key)}
            >
              {label}
            </Button>
          ))}
        </div>
      </Card>

      <Card title="Category snapshot" className="p-0" noPadding>
        <TableToolbar
          placeholder="Search categories"
          onFilterClick={() => setFiltersOpen(true)}
          actions={
            <Button variant="secondary" leadingIcon={FileSpreadsheet}>
              Export view
            </Button>
          }
        />

        <Table
          columns={snapshotColumns}
          data={categorySnapshot}
          footer={<Pagination page={1} total={4} />}
        />
      </Card>

      {/* CORRECT MODAL USAGE */}
      <EntityModal
        entityKey={activeModal}
        onClose={() => setActiveModal(null)}
      />

      <AdvancedFilterDrawer
        open={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        title="Category filters"
        fields={[
          {
            label: "Growth band",
            component: "select",
            options: [
              { value: "all", label: "All" },
              { value: "high", label: "High growth" },
              { value: "stable", label: "Stable" },
            ],
          },
          {
            label: "Inventory health",
            component: "select",
            options: [
              { value: "healthy", label: "Healthy" },
              { value: "watchlist", label: "Watchlist" },
              { value: "critical", label: "Critical" },
            ],
          },
        ]}
      />
    </div>
  );
}
