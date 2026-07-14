import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';

/**
 * Componente Toast para mensagens de sucesso/erro
 */
export function Toast({
  message = '',
  type = 'success', // success | error
  duration = 3000,
  onClose = () => {},
}) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const isSuccess = type === 'success';

  const bgColor = isSuccess
    ? 'bg-green-50 border-green-200'
    : 'bg-red-50 border-red-200';

  const iconColor = isSuccess
    ? 'text-green-600'
    : 'text-red-600';

  const textColor = isSuccess
    ? 'text-green-900'
    : 'text-red-900';

  const Icon = isSuccess ? CheckCircle : AlertCircle;

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 max-w-sm p-4 rounded-lg border shadow-lg animate-slide-in ${bgColor}`}
    >
      <Icon
        size={20}
        className={iconColor}
      />

      <p className={`flex-1 text-sm font-medium ${textColor}`}>
        {message}
      </p>

      <button
        type="button"
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Fechar mensagem"
      >
        <X size={18} />
      </button>
    </div>
  );
}