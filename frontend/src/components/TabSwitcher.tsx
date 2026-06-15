type Props = {
  activeTab: "jobs" | "dsa";
  onChange: (tab: "jobs" | "dsa") => void;
};

export default function TabSwitcher({
  activeTab,
  onChange,
}: Props) {

return (
  <div className="inline-flex items-center rounded-2xl border border-gray-200 bg-white p-1.5 shadow-sm">
    <button
      type="button"
      onClick={() => onChange("jobs")}
      className={`min-w-[110px] rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
        activeTab === "jobs"
          ? "bg-gray-900 text-white shadow"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      Jobs
    </button>

    <button
      type="button"
      onClick={() => onChange("dsa")}
      className={`min-w-[110px] rounded-xl px-6 py-2.5 text-sm font-semibold transition-all duration-200 ${
        activeTab === "dsa"
          ? "bg-gray-900 text-white shadow"
          : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      DSA
    </button>
  </div>
);
    }