export function SkeletonCard({
  className = '',
}) {
  return (
    <div
      className={`
        bg-white
        rounded-lg
        border
        border-gray-200
        card-shadow
        p-6
        animate-pulse
        ${className}
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="h-4 w-28 rounded bg-gray-200 mb-4" />

          <div className="h-8 w-20 rounded bg-gray-300 mb-4" />

          <div className="h-3 w-24 rounded bg-gray-200" />
        </div>

        <div className="h-12 w-12 rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}

export default SkeletonCard;