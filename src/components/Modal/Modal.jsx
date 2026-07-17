import { X } from 'lucide-react';

export function Modal({
  isOpen = false,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
}) {
  if (!isOpen) return null;

  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';

      case 'md':
        return 'max-w-xl';

      case 'lg':
        return 'max-w-2xl';

      case 'xl':
        return 'max-w-4xl';

      default:
        return 'max-w-xl';
    }
  };

  return (
    <div
      className="
        fixed
        inset-0
        z-50
        flex
        items-center
        justify-center
        p-4
      "
    >

      {/* Overlay */}

      <div
        onClick={onClose}
        className="
          absolute
          inset-0
          bg-slate-900/45
          backdrop-blur-sm
          animate-fade-in
        "
      />

      {/* Modal */}

      <div
        className={`
          relative
          w-full
          ${getSizeClass()}
          max-h-[92vh]
          overflow-hidden
          rounded-3xl
          border
          border-slate-200
          bg-white
          shadow-2xl
          animate-scale-in
        `}
      >

        {/* Header */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-slate-200
            px-8
            py-6
          "
        >

          <div>

            <h2 className="text-2xl font-bold text-slate-900">
              {title}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Preencha as informações abaixo.
            </p>

          </div>

          {showCloseButton && (
            <button
              onClick={onClose}
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                text-slate-500
                transition-all
                duration-200
                hover:bg-slate-100
                hover:text-slate-900
              "
            >
              <X size={20} />
            </button>
          )}

        </div>

        {/* Conteúdo */}

        <div
          className="
            max-h-[calc(92vh-96px)]
            overflow-y-auto
            px-8
            py-7
          "
        >
          {children}
        </div>

      </div>

    </div>
  );
}