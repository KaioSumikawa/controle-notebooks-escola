import { QrCode, Camera } from "lucide-react";

export default function QRCodeActionCard({
  title = "Leitura rápida por QR Code",
  description = "Escaneie o QR Code do notebook para localizar automaticamente o registro.",
  buttonText = "Escanear QR Code",
  onScan,
}) {
  return (
    <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Lado esquerdo */}
        <div className="flex items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <QrCode size={56} strokeWidth={1.6} />
          </div>

          <div>
            <h3 className="text-xl font-semibold text-slate-900">
              {title}
            </h3>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
              {description}
            </p>
          </div>
        </div>

        {/* Botão */}
        <button
          onClick={onScan}
          className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 active:scale-[0.98]"
        >
          <Camera size={20} />
          {buttonText}
        </button>
      </div>
    </div>
  );
}