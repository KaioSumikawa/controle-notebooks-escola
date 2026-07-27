import {
  Camera,
  QrCode,
  Sparkles,
} from 'lucide-react';

export default function QRCodeActionCard({
  title = 'Leitura rápida por QR Code',
  description = 'Escaneie o QR Code do notebook para localizar automaticamente o registro.',
  buttonText = 'Escanear QR Code',
  onScan,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 via-white to-blue-50 shadow-sm transition-all duration-300 hover:shadow-md">

      {/* Elementos decorativos */}
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute -bottom-8 left-1/2 h-32 w-32 rounded-full bg-sky-200/20 blur-3xl" />

      <div className="relative flex flex-col gap-8 p-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Conteúdo */}
        <div className="flex items-center gap-6">

          <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl border border-blue-100 bg-white text-blue-600 shadow-sm">
            <QrCode
              size={52}
              strokeWidth={1.7}
            />
          </div>

          <div>

            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
              <Sparkles size={13} />
              Recurso Inteligente
            </div>

            <h3 className="text-2xl font-bold tracking-tight text-slate-900">
              {title}
            </h3>

            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-slate-600">
              {description}
            </p>

          </div>

        </div>

        {/* Botão */}
        <button
          type="button"
          onClick={onScan}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-blue-600
            px-7
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-blue-700
            hover:shadow-lg
            active:translate-y-0
          "
        >
          <Camera size={18} />
          {buttonText}
        </button>

      </div>

    </section>
  );
}