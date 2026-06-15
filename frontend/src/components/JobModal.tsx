import { useState } from "react";
import axios from "axios";

import type { Job } from "../types/job";

const API = import.meta.env.VITE_API_BASE_URL;

type JobModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  editingJob?: Job | null;
};

export default function JobModal({
  open,
  onClose,
  onSuccess,
  editingJob,
}: JobModalProps) {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<Job>(
    editingJob ?? {
      id: "",
      company_name: "",
      role_name: "",
      salary: "",
      location: "",
      status: "Applied",
      date_of_apply: new Date().toISOString().split("T")[0],
      jd_text: "",
    }
  );

  function update<K extends keyof Job>(
    key: K,
    value: Job[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  async function handleSubmit() {
    try {
      setLoading(true);

      if (editingJob?.id) {
        await axios.put(
          `${API}/job-applications/${editingJob.id}`,
          form
        );
      } else {
        await axios.post(
          `${API}/job-applications`,
          form
        );
      }

      onSuccess();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">
          {editingJob ? "Edit Application" : "Add Application"}
        </h2>

        <div className="grid gap-3">
          <input
            className="rounded border p-2"
            placeholder="Company"
            value={form.company_name}
            onChange={(e) =>
              update("company_name", e.target.value)
            }
          />

          <input
            className="rounded border p-2"
            placeholder="Role"
            value={form.role_name}
            onChange={(e) =>
              update("role_name", e.target.value)
            }
          />

          <input
            className="rounded border p-2"
            placeholder="Salary"
            value={form.salary ?? ""}
            onChange={(e) =>
              update("salary", e.target.value)
            }
          />

          <input
            className="rounded border p-2"
            placeholder="Location"
            value={form.location}
            onChange={(e) =>
              update("location", e.target.value)
            }
          />

          <select
            className="rounded border p-2"
            value={form.status}
            onChange={(e) =>
              update(
                "status",
                e.target.value as Job["status"]
              )
            }
          >
            <option value="Applied">Applied</option>
            <option value="On process">
              On process
            </option>
            <option value="Rejected">
              Rejected
            </option>
            <option value="Accepted">
              Accepted
            </option>
          </select>

          <input
            className="rounded border p-2"
            type="date"
            value={form.date_of_apply}
            onChange={(e) =>
              update(
                "date_of_apply",
                e.target.value
              )
            }
          />

          <textarea
            className="rounded border p-2"
            rows={5}
            placeholder="Job Description"
            value={form.jd_text ?? ""}
            onChange={(e) =>
              update("jd_text", e.target.value)
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