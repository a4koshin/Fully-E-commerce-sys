import { useState, useEffect, useMemo } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import { catalogModals } from "../../data/catalogEntities.js";
import {
  useCreateFunctionMutation,
  useUpdateFunctionMutation,
} from "../../store/dynamicApi.js";
import Swal from "sweetalert2";

export default function EntityModal({ entityKey, onClose, editId = null }) {
  // 🟢 1. Hooks
  const [createItem] = useCreateFunctionMutation();
  const [updateItem] = useUpdateFunctionMutation();

  // 🟢 2. Initial state
  const initialState = useMemo(() => {
    if (!entityKey) return {};
    const config = catalogModals[entityKey];
    if (!config) return {};
    const obj = {};
    config.fields.forEach((field) => {
      obj[field.label] = "";
    });
    return obj;
  }, [entityKey]);

  // 🟢 3. State
  const [formData, setFormData] = useState(initialState);

  // 🟢 4. Reset form on entity change
  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  // 🟢 5. Guard
  if (!entityKey) return null;

  const config = catalogModals[entityKey];
  if (!config) return null;

  const updateField = (label, value) => {
    setFormData((prev) => ({ ...prev, [label]: value }));
  };

  const resolveUpdateUrl = () => config.updateUrl?.replace(":id", editId);

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateItem({
          url: resolveUpdateUrl(),
          id: editId,
          formData,
        }).unwrap();

        await Swal.fire({
          icon: "success",
          title: "Updated",
          text: `${config.actionLabel} updated successfully`,
          timer: 1500,
          showConfirmButton: false,
        });
      } else {
        await createItem({
          url: config.url,
          formData,
        }).unwrap();

        await Swal.fire({
          icon: "success",
          title: "Created",
          text: `${config.actionLabel} created successfully`,
          timer: 1500,
          showConfirmButton: false,
        });
      }

      onClose();
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: err?.data?.message || "Please try again later",
      });
    }
  };

  const renderField = (field) => {
    const { label, placeholder, type, component, options, fullWidth } = field;
    const span = fullWidth ? "md:col-span-2" : "";

    if (component === "textarea") {
      return (
        <div key={label} className={span}>
          <label className="block mb-1 font-medium">{label}</label>
          <textarea
            value={formData[label] ?? ""}
            onChange={(e) => updateField(label, e.target.value)}
            placeholder={placeholder}
            className="w-full border p-2 rounded"
          />
        </div>
      );
    }

    if (component === "select") {
      return (
        <div key={label} className={span}>
          <label className="block mb-1 font-medium">{label}</label>
          <select
            value={formData[label] ?? ""}
            onChange={(e) => updateField(label, e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select…</option>
            {options?.map((op) => (
              <option key={op.value} value={op.value}>
                {op.label}
              </option>
            ))}
          </select>
        </div>
      );
    }

    return (
      <div key={label} className={span}>
        <label className="block mb-1 font-medium">{label}</label>
        <input
          value={formData[label] ?? ""}
          onChange={(e) => updateField(label, e.target.value)}
          placeholder={placeholder}
          type={type || "text"}
          className="w-full border p-2 rounded"
        />
      </div>
    );
  };

  return (
    <Modal
      open
      onClose={onClose}
      title={editId ? config.ediTitle : config.title}
      actions={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          {/* <Button onClick={() => Swal.fire("Test Alert")}>Test Swal</Button> */}

          <Button onClick={handleSubmit}>
            {editId ? "Update" : "Save"} {config.actionLabel}
          </Button>
        </>
      }
    >
      <div className="grid gap-4 md:grid-cols-2">
        {config.fields.map(renderField)}
      </div>
    </Modal>
  );
}
