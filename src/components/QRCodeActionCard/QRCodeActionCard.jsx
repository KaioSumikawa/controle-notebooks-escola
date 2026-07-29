import {
  Camera,
  QrCode,
} from 'lucide-react';

export default function QRCodeActionCard({
  title = 'Leitura rápida por QR Code',
  description = 'Escaneie o QR Code do notebook para localizar automaticamente o registro.',
  buttonText = 'Escanear QR Code',
  onScan,
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-r from-white via-slate-50 to-blue-50 shadow-sm transition-all duration-300 hover:shadow-md">
      {/* Elementos decorativos */}
      <div className="absolute -right-20 top-0 h-52 w-52 rounded-full bg-blue-100/30 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 h-36 w-36 -translate-x-1/2 rounded-full bg-slate-100/60 blur-3xl" />

      <div className="relative flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Conteúdo */}
        <div className="flex items-center gap-5">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-2xl border border-slate-200 bg-white text-blue-600 shadow-sm">
            <QrCode
              size={38}
              strokeWidth={1.8}
            />
          </div>

          <div>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              {title}
            </h3>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
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
            h-11
            items-center
            justify-center
            gap-2
            rounded-xl
            bg-blue-600
            px-5
            text-sm
            font-medium
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:-translate-y-0.5
            hover:bg-blue-700
            hover:shadow-md
            active:translate-y-0
          "
        >
          <Camera size={17} />
          {buttonText}
        </button>
      </div>
    </section>
  );
}