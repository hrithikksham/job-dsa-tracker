import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import type { Job } from "../types/job";

const API = import.meta.env.VITE_API_BASE_URL;

type JobTableProps = {
  onAdd: () => void;
  onEdit: (job: Job) => void;
};

export default function JobTable({ onAdd, onEdit }: JobTableProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);

  // Debounce search input by 400ms to avoid firing on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  // Stable fetch function — won't change identity unless debouncedSearch changes
  const fetchJobs = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/job-applications`, {
        params: {
          page: 1,
          limit: 15,
          search: debouncedSearch,
        },
      });

      setJobs(response.data.items ?? response.data ?? []);
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, [debouncedSearch]);

    useEffect(() => {
  void (async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/job-applications`,
        {
          params: {
            page: 1,
            limit: 15,
            search,
          },
        }
      );

      setJobs(response.data.items ?? response.data ?? []);
    } catch (error) {
      console.error(error);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  })();
}, [search]);

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this application?")) return;

    try {
      await axios.delete(`${API}/job-applications/${id}`);
      await fetchJobs(); // awaited so errors surface correctly
    } catch (error) {
      console.error("Failed to delete job:", error);
    }
  }


return (
  <div className="space-y-6">
    {/* Top Toolbar */}
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <input
        type="text"
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-100 md:max-w-sm"
      />

      <button
        onClick={onAdd}
        className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
      >
        + Add Application
      </button>
    </div>

    {/* Table */}
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                S.No
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Company
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Role
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Status
              </th>

              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                Applied
              </th>

              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  Loading...
                </td>
              </tr>
            ) : jobs.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-12 text-center text-gray-500"
                >
                  No job applications found.
                </td>
              </tr>
            ) : (
              jobs.map((job,index) => (
                <tr
                  key={job.id}
                  className="border-b border-gray-100 transition hover:bg-gray-50"
                >
                
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {job.company_name}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
                    {job.role_name}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                      {job.status}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-600">
                    {job.date_of_apply}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => onEdit(job)}
                        className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-100"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(job.id)}
                        className="rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
}