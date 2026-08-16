export default function ProgressBar({ value = 0, label = "", size = "md" }) {
  const percentage = Math.min(100, Math.max(0, value));
  const color =
    percentage >= 80
      ? "bg-green-500"
      : percentage >= 50
        ? "bg-yellow-400"
        : "bg-red-400";

  const heights = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <span className="font-display text-xs font-bold text-gray-600">
            {label}
          </span>
          <span className="font-display text-xs font-bold text-gray-400">
            {Math.round(percentage)}%
          </span>
        </div>
      )}
      <div
        className={`w-full bg-gray-200 rounded-full ${heights[size]} overflow-hidden`}
      >
        <div
          className={`${color} ${heights[size]} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
