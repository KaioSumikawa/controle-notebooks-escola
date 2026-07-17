import {
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';

export function ConfirmModal({
  isOpen = false,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning',
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const getStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          bg: 'bg-red-50',
          iconBg: 'bg-red-100',
          icon: 'text-red-600',
          button:
            'bg-red-600 hover:bg-red-700 focus:ring-red-200',
        };

      case 'info':
        return {
          bg: 'bg-blue-50',
          iconBg: 'bg-blue-100',
          icon: 'text-blue-600',
          button:
            'bg-blue-600 hover:bg-blue-700 focus:ring-blue-200',
        };

      default:
        return {
          bg: 'bg-amber-50',
          iconBg: 'bg-amber-100',
          icon: 'text-amber-600',
          button:
            'bg-amber-500 hover:bg-amber-600 focus:ring-amber-200',
        };
    }
  };

  const styles = getStyles();

  const Icon =
    variant === 'info'
      ? Info
      : AlertTriangle;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-5"
      role="dialog"
      aria-modal="true"
    >

      {/* Overlay */}

      <div
        className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
        onClick={
          !isLoading
            ? onCancel
            : undefined
        }
      />

      {/* Modal */}

      <div
        onClick={(e) => e.stopPropagation()}
        className="
          relative
          w-full
          max-w-md
          overflow-hidden
          rounded-2xl
          bg-white
          shadow-2xl
          animate-in
          fade-in
          zoom-in-95
          duration-200
        "
      >

        {/* Header */}

        <div
          className={`flex items-center justify-between px-6 py-5 ${styles.bg}`}
        >

          <div className="flex items-center gap-4">

            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-2xl
                ${styles.iconBg}
              `}
            >
              <Icon
                size={24}
                className={styles.icon}
              />
            </div>

            <div>

              <h2 className="text-lg font-semibold text-slate-900">
                {title}
              </h2>

            </div>

          </div>

          <button
            onClick={onCancel}
            disabled={isLoading}
            className="
              rounded-xl
              p-2
              text-slate-400
              transition
              hover:bg-white
              hover:text-slate-700
              disabled:opacity-40
            "
          >
            <X size={18} />
          </button>

        </div>

        {/* Conteúdo */}

        <div className="px-6 py-6">

          <p className="leading-7 text-slate-600">
            {message}
          </p>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-5
              py-2.5
              font-medium
              text-slate-600
              transition

              hover:bg-slate-100

              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`
              rounded-xl
              px-5
              py-2.5
              font-medium
              text-white
              transition
              focus:outline-none
              focus:ring-4

              disabled:cursor-not-allowed
              disabled:opacity-50

              ${styles.button}
            `}
          >
            {isLoading
              ? 'Processando...'
              : confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}