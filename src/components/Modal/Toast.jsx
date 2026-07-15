import { useEffect } from 'react';
import {
  CheckCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  X,
} from 'lucide-react';


/**
 * Toast reutilizável para mensagens do sistema
 *
 * Tipos:
 * success | error | warning | info
 */
export function Toast({
  message = '',
  type = 'success',
  duration = 3000,
  onClose,
}) {

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);

  }, [message, duration, onClose]);


  if (!message) return null;


  const configs = {
    success: {
      icon: CheckCircle,
      container:
        'bg-green-50 border-green-200',
      iconColor:
        'text-green-600',
      textColor:
        'text-green-900',
    },

    error: {
      icon: AlertCircle,
      container:
        'bg-red-50 border-red-200',
      iconColor:
        'text-red-600',
      textColor:
        'text-red-900',
    },

    warning: {
      icon: AlertTriangle,
      container:
        'bg-yellow-50 border-yellow-200',
      iconColor:
        'text-yellow-600',
      textColor:
        'text-yellow-900',
    },

    info: {
      icon: Info,
      container:
        'bg-blue-50 border-blue-200',
      iconColor:
        'text-blue-600',
      textColor:
        'text-blue-900',
    },
  };


  const config =
    configs[type] || configs.success;


  const Icon = config.icon;


  return (
    <div
      className={`
        fixed
        bottom-5
        right-5
        z-50
        flex
        items-center
        gap-3
        max-w-sm
        p-4
        rounded-lg
        border
        shadow-lg
        animate-in
        slide-in-from-right-5
        duration-300
        ${config.container}
      `}
      role="alert"
    >

      <Icon
        size={22}
        className={config.iconColor}
      />


      <p
        className={`
          flex-1
          text-sm
          font-medium
          ${config.textColor}
        `}
      >
        {message}
      </p>


      <button
        type="button"
        onClick={() => onClose?.()}
        className="
          text-gray-400
          hover:text-gray-600
          transition-colors
        "
        aria-label="Fechar mensagem"
      >

        <X size={18} />

      </button>

    </div>
  );
}