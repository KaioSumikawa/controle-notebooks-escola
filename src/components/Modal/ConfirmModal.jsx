import { AlertCircle, Info } from 'lucide-react';

/**
 * Modal de Confirmação Reutilizável
 */
export function ConfirmModal({
  isOpen = false,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning', // warning | danger | info
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;


  const getColorClass = () => {
    switch (variant) {
      case 'danger':
        return 'border-red-200 bg-red-50';

      case 'info':
        return 'border-blue-200 bg-blue-50';

      case 'warning':
      default:
        return 'border-yellow-200 bg-yellow-50';
    }
  };


  const getIconColor = () => {
    switch (variant) {
      case 'danger':
        return 'text-red-600';

      case 'info':
        return 'text-blue-600';

      case 'warning':
      default:
        return 'text-yellow-600';
    }
  };


  const getButtonColor = () => {
    switch (variant) {
      case 'danger':
        return 'bg-red-600 hover:bg-red-700';

      case 'info':
        return 'bg-blue-600 hover:bg-blue-700';

      case 'warning':
      default:
        return 'bg-yellow-600 hover:bg-yellow-700';
    }
  };


  const Icon = variant === 'info'
    ? Info
    : AlertCircle;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >

      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={
          !isLoading
            ? onCancel
            : undefined
        }
      />


      {/* Modal */}
      <div
        className={`
          relative
          bg-white
          rounded-lg
          shadow-xl
          max-w-md
          w-11/12
          border
          ${getColorClass()}
        `}
      >

        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">

          <Icon
            size={24}
            className={getIconColor()}
          />

          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

        </div>


        {/* Conteúdo */}
        <div className="p-6">

          <p className="text-gray-700">
            {message}
          </p>

        </div>


        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              flex-1
              px-4
              py-2
              text-gray-700
              bg-gray-100
              hover:bg-gray-200
              rounded-lg
              font-medium
              transition-colors
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
              flex-1
              px-4
              py-2
              text-white
              rounded-lg
              font-medium
              transition-colors
              disabled:opacity-50
              ${getButtonColor()}
            `}
          >
            {
              isLoading
                ? 'Processando...'
                : confirmText
            }
          </button>

        </div>

      </div>

    </div>
  );
}