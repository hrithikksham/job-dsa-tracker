type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: SearchBarProps) {
    
return (
  <input
    type="text"
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
    className="
      w-full
      md:max-w-sm
      rounded-xl
      border
      border-gray-200
      bg-white
      px-4
      py-3
      text-sm
      text-gray-900
      placeholder:text-gray-400
      shadow-sm
      outline-none
      transition-all
      duration-200
      focus:border-gray-900
      focus:ring-4
      focus:ring-gray-100
    "
  />
);
}