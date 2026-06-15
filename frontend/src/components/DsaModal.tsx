import { useState } from "react";
import axios from "axios";

import type { DsaEntry } from "../types/dsa";

const API = import.meta.env.VITE_API_BASE_URL;

type DsaModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingEntry?: DsaEntry | null;
};

export default function DsaModal({
  open,
  onClose,
  onSuccess,
  editingEntry,
}: DsaModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<DsaEntry>(
    editingEntry ?? {
      id: "",
      question_name: "",
      url: "",
      date: new Date().toISOString().split("T")[0],
      notes: "",
      solution_code: "",
    }
  );

  function update<K extends keyof DsaEntry>(
    key: K,
    value: DsaEntry[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      if (editingEntry?.id) {
        await axios.put(
          `${API}/dsa-entries/${editingEntry.id}`,
          form
        );
      } else {
        await axios.post(
          `${API}/dsa-entries`,
          form
        );
      }

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          {editingEntry ? "Edit DSA Entry" : "Add DSA Entry"}
        </h2>

        <div className="grid gap-3">
          <input
            className="rounded border p-2"
            placeholder="Question Name"
            value={form.question_name}
            onChange={(e) =>
              update("question_name", e.target.value)
            }
          />

          <input
            className="rounded border p-2"
            placeholder="URL"
            value={form.url ?? ""}
            onChange={(e) =>
              update("url", e.target.value)
            }
          />

          <input
            className="rounded border p-2"
            type="date"
            value={form.date}
            onChange={(e) =>
              update("date", e.target.value)
            }
          />

          <textarea
            className="rounded border p-2"
            rows={4}
            placeholder="Notes"
            value={form.notes ?? ""}
            onChange={(e) =>
              update("notes", e.target.value)
            }
          />

          <textarea
            className="rounded border p-2 font-mono"
            rows={8}
            placeholder="Solution Code"
            value={form.solution_code ?? ""}
            onChange={(e) =>
              update("solution_code", e.target.value)
            }
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded border px-4 py-2"
          >
            Cancel
          </button>

          <button
            disabled={loading}
            onClick={handleSubmit}
            className="rounded bg-black px-4 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}