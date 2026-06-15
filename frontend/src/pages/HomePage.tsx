import { useState } from "react";

import Header from "../components/Header";
import JobTable from "../components/JobTable";
import JobModal from "../components/JobModal";
import DsaTable from "../components/DsaTable";
import DsaModal from "../components/DsaModal";

import type { Job } from "../types/job";
import type { DsaEntry } from "../types/dsa";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "dsa">("jobs");

  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [dsaModalOpen, setDsaModalOpen] = useState(false);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [editingDsa, setEditingDsa] = useState<DsaEntry | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
          {activeTab === "jobs" ? (
            <>
              <JobTable
                onAdd={() => {
                  setEditingJob(null);
                  setJobModalOpen(true);
                }}
                onEdit={(job) => {
                  setEditingJob(job);
                  setJobModalOpen(true);
                }}
              />

              <JobModal
                key={editingJob?.id ?? "new-job"}
                open={jobModalOpen}
                editingJob={editingJob}
                onClose={() => {
                  setJobModalOpen(false);
                  setEditingJob(null);
                }}
                onSuccess={() => {
                  setJobModalOpen(false);
                  setEditingJob(null);
                }}
              />
            </>
          ) : (
            <>
              <DsaTable
                onAdd={() => {
                  setEditingDsa(null);
                  setDsaModalOpen(true);
                }}
                onEdit={(entry) => {
                  setEditingDsa(entry);
                  setDsaModalOpen(true);
                }}
              />

              <DsaModal
                key={editingDsa?.id ?? "new-dsa"}
                open={dsaModalOpen}
                editingEntry={editingDsa}
                onClose={() => {
                  setDsaModalOpen(false);
                  setEditingDsa(null);
                }}
                onSuccess={() => {
                  setDsaModalOpen(false);
                  setEditingDsa(null);
                }}
              />
            </>
          )}
        </div>
      </main>
    </div>
  );
}