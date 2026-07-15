const variants = {
  primary: {
    container: 'border-blue-200 bg-blue-50',
    icon: 'text-blue-600',
  },

  success: {
    container: 'border-green-200 bg-green-50',
    icon: 'text-green-600',
  },

  danger: {
    container: 'border-red-200 bg-red-50',
    icon: 'text-red-600',
  },

  warning: {
    container: 'border-yellow-200 bg-yellow-50',
    icon: 'text-yellow-600',
  },

  default: {
    container: 'border-gray-200 bg-gray-50',
    icon: 'text-gray-600',
  },
};


export function DashboardCard({
  title,
  value,
  icon: Icon,
  variant = 'primary',
  description,
  onClick,
}) {

  const style =
    variants[variant] || variants.default;


  const handleKeyDown = (event) => {
    if (!onClick) return;


    if (
      event.key === 'Enter' ||
      event.key === ' '
    ) {
      event.preventDefault();
      onClick?.();
    }
  };


  return (
    <div
      onClick={() => onClick?.()}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
      aria-label={
        onClick
          ? `${title}: ${value}`
          : undefined
      }
      className={`
        border
        rounded-lg
        p-6
        card-shadow
        transition-all
        duration-200
        ${style.container}
        ${
          onClick
            ? `
              cursor-pointer
              hover:shadow-lg
              hover:-translate-y-1
              active:scale-[0.98]
            `
            : ''
        }
      `}
    >

      <div className="flex items-start justify-between">


        {/* Informações */}
        <div className="flex-1">

          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>


          <p className="text-3xl font-bold text-gray-900">
            {value}
          </p>


          {
            description && (
              <p className="text-xs text-gray-500 mt-2">
                {description}
              </p>
            )
          }

        </div>


        {/* Ícone */}
        {
          Icon && (
            <div
              className={`
                ml-4
                ${style.icon}
              `}
            >
              <Icon
                size={30}
                strokeWidth={1.5}
              />
            </div>
          )
        }


      </div>

    </div>
  );
}