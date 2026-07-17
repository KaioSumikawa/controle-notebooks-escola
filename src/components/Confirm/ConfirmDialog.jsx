import { AlertTriangle, X } from 'lucide-react';

export function ConfirmDialog({
  isOpen,
  title = 'Confirmar ação',
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  onConfirm,
  onCancel,
  danger = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">

        <div className="flex items-start justify-between mb-4">

          <div className="flex items-center gap-3">

            <div
              className={`p-2 rounded-full ${
                danger
                  ? 'bg-red-100'
                  : 'bg-yellow-100'
              }`}
            >
              <AlertTriangle
                size={22}
                className={
                  danger
                    ? 'text-red-600'
                    : 'text-yellow-600'
                }
              />
            </div>

            <h2 className="text-lg font-semibold text-gray-800">
              {title}
            </h2>

          </div>


          <button
            onClick={onCancel}
            className="p-1 rounded hover:bg-gray-100"
          >
            <X size={20} />
          </button>

        </div>


        <p className="text-sm text-gray-600 mb-6">
          {message}
        </p>


        <div className="flex justify-end gap-3">

          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            {cancelText}
          </button>


          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-white ${
              danger
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}