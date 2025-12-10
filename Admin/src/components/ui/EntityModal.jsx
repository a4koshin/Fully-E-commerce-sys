import { useState, useEffect, useMemo } from "react";
import Modal from "./Modal.jsx";
import Button from "./Button.jsx";
import { catalogModals } from "../../data/catalogEntities.js";
import {
  useCreateFunctionMutation,
  useUpdateFunctionMutation,
} from "../../store/dynamicApi.js";

export default function EntityModal({ entityKey, onClose, editId = null }) {
  // 🟢 1. Hooks MUST run every render (no early return before)
  const [createItem] = useCreateFunctionMutation();
  const [updateItem] = useUpdateFunctionMutation();

  // 🟢 2. Build initialState safely with useMemo
  const initialState = useMemo(() => {
    if (!entityKey) return {}; // safe fallback
    const config = catalogModals[entityKey];
    if (!config) return {}; // safe fallback
    const obj = {};
    config.fields.forEach((field) => {
      obj[field.label] = "";
    });
    return obj;
  }, [entityKey]);

  // 🟢 3. State always initialized once hooks run
  const [formData, setFormData] = useState(initialState);

  // 🟢 4. Whenever entityKey changes → reset the form
  useEffect(() => {
    setFormData(initialState);
  }, [initialState]);

  // 🟢 5. NOW we can safely return if modal is closed
  if (!entityKey) return null;

  // 🟢 6. Load config AFTER entityKey is confirmed
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
      } else {
        await createItem({
          url: config.url,
          formData,
        }).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const renderField = (field) => {
    const { label, placeholder, type, component, options, fullWidth } = field;
    const span = fullWidth ? "md:col-span-2" : "";

    if (component === "textarea") {
      return (
        <div key={label} className={span}>
          <label>{label}</label>
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
          <label>{label}</label>
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
        <label>{label}</label>
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
