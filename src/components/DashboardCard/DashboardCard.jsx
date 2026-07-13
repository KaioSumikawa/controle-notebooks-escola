export function DashboardCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  description,
  onClick,
}) {
  const getVariantColor = (variant) => {
    switch (variant) {
      case 'primary':
        return 'border-blue-200 bg-blue-50';
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'danger':
        return 'border-red-200 bg-red-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getIconColor = (variant) => {
    switch (variant) {
      case 'primary':
        return 'text-blue-600';
      case 'success':
        return 'text-green-600';
      case 'danger':
        return 'text-red-600';
      case 'warning':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        border rounded-lg p-6 card-shadow
        transition-all duration-200
        ${getVariantColor(variant)}
        ${
          onClick
            ? 'cursor-pointer hover:shadow-lg hover:-translate-y-1 active:scale-[0.98]'
            : ''
        }
      `}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>

          <p className="text-3xl font-bold text-gray-900">
            {value}
          </p>

          {description && (
            <p className="text-xs text-gray-500 mt-2">
              {description}
            </p>
          )}
        </div>

        {Icon && (
          <div className={`${getIconColor(variant)} ml-4`}>
            <Icon size={28} strokeWidth={1.5} />
          </div>
        )}
      </div>
    </div>
  );
}