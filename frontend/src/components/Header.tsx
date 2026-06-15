import TabSwitcher from "./TabSwitcher";

type Props = {
  activeTab: "jobs" | "dsa";
  onTabChange: (tab: "jobs" | "dsa") => void;
};

export default function Header({
  activeTab,
  onTabChange,
}: Props) {

return (
  <header className="bg-gray-50 pt-8">
    <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 lg:flex-row lg:px-8">
      {/* Brand */}
      <div className="w-full text-center lg:w-auto lg:text-left">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900">
          TrackDJ
        </h1>
      </div>

      {/* Navigation */}
      <div className="flex justify-center">
        <TabSwitcher
          activeTab={activeTab}
          onChange={onTabChange}
        />
      </div>

      {/* Spacer for alignment */}
      <div className="hidden w-[160px] lg:block" />
    </div>
  </header>
);
}