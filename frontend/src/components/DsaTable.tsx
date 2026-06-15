
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import type { DsaEntry } from "../types/dsa";

const API = import.meta.env.VITE_API_BASE_URL;

type DsaTableProps = {
  onAdd: () => void;
  onEdit: (entry: DsaEntry) => void;
};

export default function DsaTable({
  onAdd,
  onEdit,
}: DsaTableProps) {
  const [entries, setEntries] = useState<DsaEntry[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchEntries = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API}/dsa-entries`, {
        params: {
          page: 1,
          limit: 15,
          search,
        },
      });

      const data = response.data;

      if (Array.isArray(data)) {
        setEntries(data);
      } else if (Array.isArray(data.items)) {
        setEntries(data.items);
      } else {
        setEntries([]);
      }
    } catch (error) {
      console.error("Failed to fetch DSA entries:", error);
      setEntries([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const loadEntries = async () => {
      await fetchEntries();
    };

    void loadEntries();
  }, [fetchEntries]);

  async function handleDelete(id: string) {
    const confirmed = window.confirm(
      "Delete this DSA entry?"
    );

    if (!confirmed) return;

    try {
      await axios.delete(`${API}/dsa-entries/${id}`);
      fetchEntries();
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-200 md:max-w-sm"
        />

        <button
          onClick={onAdd}
          className="rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-black"
        >
          + Add Question
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
                  Question
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Link
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
              ) : entries.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No DSA questions found.
                  </td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr
                    key={entry.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {index + 1}
                    </td>

                    <td className="px-6 py-4 font-medium text-gray-900">
                      {entry.question_name}
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-600">
                      {entry.date}
                    </td>

                    <td className="px-6 py-4">
                      {entry.url ? (
                        <a
                          href={entry.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Open
                        </a>
                      ) : (
                        <span className="text-sm text-gray-400">—</span>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => onEdit(entry)}
                          className="rounded-lg border border-gray-200 px-3 py-1.5 text-sm hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(entry.id)
                          }
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
