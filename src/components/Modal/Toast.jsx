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
        'border-green-200 bg-green-50',
      iconBg:
        'bg-green-100',
      iconColor:
        'text-green-600',
      textColor:
        'text-green-900',
    },

    error: {
      icon: AlertCircle,
      container:
        'border-red-200 bg-red-50',
      iconBg:
        'bg-red-100',
      iconColor:
        'text-red-600',
      textColor:
        'text-red-900',
    },

    warning: {
      icon: AlertTriangle,
      container:
        'border-amber-200 bg-amber-50',
      iconBg:
        'bg-amber-100',
      iconColor:
        'text-amber-600',
      textColor:
        'text-amber-900',
    },

    info: {
      icon: Info,
      container:
        'border-blue-200 bg-blue-50',
      iconBg:
        'bg-blue-100',
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
        bottom-6
        right-6
        z-50
        flex
        w-full
        max-w-md
        items-center
        gap-4
        rounded-2xl
        border
        p-4
        shadow-2xl
        backdrop-blur-sm
        animate-in
        slide-in-from-right-5
        fade-in
        duration-300
        ${config.container}
      `}
      role="alert"
    >
      <div
        className={`
          flex
          h-11
          w-11
          flex-shrink-0
          items-center
          justify-center
          rounded-xl
          ${config.iconBg}
        `}
      >
        <Icon
          size={22}
          className={config.iconColor}
        />
      </div>

      <div className="flex-1">
        <p
          className={`
            text-sm
            font-medium
            leading-5
            ${config.textColor}
          `}
        >
          {message}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onClose?.()}
        className="
          rounded-lg
          p-1.5
          text-slate-400
          transition
          hover:bg-black/5
          hover:text-slate-600
        "
        aria-label="Fechar mensagem"
      >
        <X size={18} />
      </button>
    </div>
  );
}