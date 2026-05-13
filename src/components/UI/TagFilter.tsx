interface TagFilterProps {
  labels: {name: string; color: string}[];
  active: string;
  onChange: (label: string) => void;
}

export default function TagFilter({labels, active, onChange}: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onChange("")}
        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
          active === ""
            ? "bg-blue-600 border-blue-600 text-white"
            : "border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
        }`}
      >
        全部
      </button>
      {labels.map((label) => (
        <button
          key={label.name}
          onClick={() => onChange(label.name === active ? "" : label.name)}
          className="px-3 py-1 text-xs rounded-full border transition-colors"
          style={
            label.name === active
              ? {
                  backgroundColor: `#${label.color}`,
                  borderColor: `#${label.color}`,
                  color: "#fff",
                }
              : {borderColor: `#${label.color}44`, color: `#${label.color}`}
          }
        >
          {label.name}
        </button>
      ))}
    </div>
  );
}
