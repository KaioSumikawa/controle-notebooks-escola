import { AlertCircle, CheckCircle } from 'lucide-react';

/**
 * Modal de Confirmação Reutilizável
 */
export function ConfirmModal({
  isOpen = false,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'warning', // 'warning', 'danger', 'info'
  isLoading = false,
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  const getColorClass = (variant) => {
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

  const getIconColor = (variant) => {
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

  const getButtonColor = (variant) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black opacity-50 transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className={`relative bg-white rounded-lg shadow-xl max-w-md w-11/12 animate-slide-in border ${getColorClass(variant)}`}>
        {/* Header */}
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <AlertCircle size={24} className={getIconColor(variant)} />
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-6 border-t border-gray-200">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className={`flex-1 px-4 py-2 text-white rounded-lg font-medium transition-colors disabled:opacity-50 ${getButtonColor(variant)}`}
          >
            {isLoading ? 'Processando...' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
