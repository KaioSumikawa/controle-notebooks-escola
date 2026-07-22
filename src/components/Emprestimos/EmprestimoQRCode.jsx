import { QrCode } from 'lucide-react';

export function EmprestimoQRCode({
  onScan,
}) {
  return (
    <button
      type="button"
      onClick={onScan}
      className="
        group
        flex
        w-full
        items-center
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        shadow-sm
        transition-all
        duration-200
        hover:border-blue-200
        hover:bg-blue-50/40
        hover:shadow-md
        focus:outline-none
        focus:ring-4
        focus:ring-blue-500/10
      "
    >
      {/* Ícone */}
      <div
        className="
          flex
          h-12
          w-12
          shrink-0
          items-center
          justify-center
          rounded-xl
          bg-blue-50
          text-blue-600
          transition-all
          duration-200
          group-hover:bg-blue-100
          group-hover:text-blue-700
        "
      >
        <QrCode
          size={24}
          strokeWidth={1.8}
        />
      </div>

      {/* Conteúdo */}
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-slate-900">
          Registrar por QR Code
        </p>

        <p className="mt-1 text-xs leading-relaxed text-slate-500">
          Escaneie o código do notebook para iniciar um empréstimo.
        </p>
      </div>
    </button>
  );
}