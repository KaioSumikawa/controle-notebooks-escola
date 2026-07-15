import { AlertCircle, Info } from 'lucide-react';

/**
 * Modal de confirmação reutilizável
 *
 * Usado para:
 * - Exclusões
 * - Confirmações críticas
 * - Ações administrativas
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


  const getStyles = () => {
    switch (variant) {
      case 'danger':
        return {
          container: 'border-red-200 bg-red-50',
          icon: 'text-red-600',
          button: 'bg-red-600 hover:bg-red-700',
        };

      case 'info':
        return {
          container: 'border-blue-200 bg-blue-50',
          icon: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700',
        };

      case 'warning':
      default:
        return {
          container: 'border-yellow-200 bg-yellow-50',
          icon: 'text-yellow-600',
          button: 'bg-yellow-600 hover:bg-yellow-700',
        };
    }
  };


  const styles = getStyles();

  const Icon = variant === 'info'
    ? Info
    : AlertCircle;


  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
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


      {/* Conteúdo */}
      <div
        className={`
          relative
          w-full
          max-w-lg
          bg-white
          rounded-lg
          shadow-xl
          border
          overflow-hidden
        `}
        onClick={(e) => e.stopPropagation()}
      >

        {/* Header */}
        <div
          className={`
            flex
            items-center
            gap-3
            px-6
            py-5
            border-b
            border-gray-200
            ${styles.container}
          `}
        >

          <Icon
            size={26}
            className={styles.icon}
          />

          <h2 className="text-lg font-semibold text-gray-900">
            {title}
          </h2>

        </div>


        {/* Mensagem */}
        <div className="p-6">

          <p className="text-gray-700 leading-relaxed">
            {message}
          </p>

        </div>


        {/* Ações */}
        <div className="flex gap-3 px-6 py-4 border-t border-gray-200">

          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="
              flex-1
              px-4
              py-2
              rounded-lg
              font-medium
              text-gray-700
              bg-gray-100
              hover:bg-gray-200
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
              rounded-lg
              font-medium
              text-white
              transition-colors
              disabled:opacity-50
              ${styles.button}
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