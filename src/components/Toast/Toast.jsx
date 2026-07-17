import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';

export function Toast({
  type = 'success',
  title,
  message,
  onClose,
}) {
  const config = {
    success: {
      icon: CheckCircle,
      iconClass: 'text-green-600',
      bgClass: 'bg-green-50',
      borderClass: 'border-green-200',
    },

    error: {
      icon: XCircle,
      iconClass: 'text-red-600',
      bgClass: 'bg-red-50',
      borderClass: 'border-red-200',
    },

    warning: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-600',
      bgClass: 'bg-yellow-50',
      borderClass: 'border-yellow-200',
    },

    info: {
      icon: Info,
      iconClass: 'text-blue-600',
      bgClass: 'bg-blue-50',
      borderClass: 'border-blue-200',
    },
  };

  const selected = config[type] || config.success;

  const Icon = selected.icon;

  return (
    <div
      role="alert"
      className={`
        w-full
        max-w-sm
        rounded-2xl
        border
        p-4
        shadow-xl
        backdrop-blur-sm
        transition-all
        duration-300
        animate-in
        slide-in-from-right-5
        fade-in
        flex
        items-start
        gap-3
        ${selected.bgClass}
        ${selected.borderClass}
      `}
    >
      <div
        className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-xl
          bg-white/70
          flex-shrink-0
        "
      >
        <Icon
          size={22}
          className={selected.iconClass}
        />
      </div>

      <div className="flex-1 min-w-0">

        {title && (
          <h3 className="text-sm font-semibold text-slate-900">
            {title}
          </h3>
        )}

        {message && (
          <p className="mt-1 text-sm leading-relaxed text-slate-600">
            {message}
          </p>
        )}

      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar notificação"
        className="
          rounded-lg
          p-1
          text-slate-400
          transition-colors
          hover:bg-white/60
          hover:text-slate-700
        "
      >
        <X size={18} />
      </button>
    </div>
  );
}