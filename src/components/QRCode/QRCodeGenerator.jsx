import { useState } from 'react';
import { QrCode, Download, Printer } from 'lucide-react';
import { qrCodeService } from '../../services/qrCodeService';

export function QRCodeGenerator({
  notebook,
  onGenerate,
}) {
  const [qrCode, setQrCode] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!notebook) return;

    setIsLoading(true);

    try {
      const codigo = await qrCodeService.generate(notebook);

      setQrCode(codigo);

      onGenerate?.(codigo);
    } catch (error) {
      console.error('Erro ao gerar QR Code:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!qrCode) return;

    try {
      await qrCodeService.download(qrCode.codigo);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePrint = async () => {
    if (!qrCode) return;

    try {
      await qrCodeService.print(qrCode.codigo);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow p-6">

      <div className="flex items-center gap-2 mb-4">
        <QrCode size={20} />
        <h3 className="text-lg font-semibold text-gray-900">
          QR Code
        </h3>
      </div>

      {!qrCode ? (
        <div className="text-center py-8">

          <div className="w-40 h-40 mx-auto rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
            <QrCode
              size={72}
              className="text-gray-300"
            />
          </div>

          <p className="text-gray-500 mt-4 mb-6">
            Gere um QR Code para este notebook.
          </p>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isLoading || !notebook}
            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {isLoading
              ? 'Gerando...'
              : 'Gerar QR Code'}
          </button>

        </div>
      ) : (
        <div className="text-center">

          <div className="w-40 h-40 mx-auto rounded-lg border border-gray-300 bg-gray-50 flex flex-col items-center justify-center">

            <QrCode
              size={72}
              className="text-gray-700"
            />

            <span className="mt-3 text-sm font-semibold text-gray-700">
              {qrCode.codigo}
            </span>

          </div>

          <p className="text-sm text-gray-500 mt-4">
            QR Code: {qrCode.codigo}
          </p>

          <div className="flex justify-center gap-3 mt-6">

            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Download size={16} />
              Download
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <Printer size={16} />
              Imprimir
            </button>

          </div>

        </div>
      )}

    </div>
  );
}