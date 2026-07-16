import { useState } from 'react';
import {
  ScanLine,
  Camera,
  Search,
  CheckCircle,
} from 'lucide-react';

export function QRCodeScanner({
  onScan,
  isLoading = false,
}) {
  const [codigo, setCodigo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const valor = codigo.trim();

    if (!valor) return;

    onScan?.(valor);
  };

  const handleSimularLeitura = () => {
    const codigoTeste = 'NB-001';

    setCodigo(codigoTeste);

    onScan?.(codigoTeste);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow p-6">

      <div className="flex items-center gap-2 mb-4">
        <ScanLine size={20} />
        <h3 className="text-lg font-semibold text-gray-900">
          Scanner de QR Code
        </h3>
      </div>

      {/* Área da câmera */}
      <div className="w-full h-72 rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center">

        <Camera
          size={64}
          className="text-gray-400 mb-4"
        />

        <p className="text-gray-600 font-medium">
          Leitor de câmera
        </p>

        <p className="text-sm text-gray-500 mt-1 text-center px-4">
          A leitura pela câmera será implementada em uma próxima versão.
        </p>

      </div>

      {/* Entrada manual */}
      <form
        onSubmit={handleSubmit}
        className="mt-6"
      >

        <label className="block text-sm font-medium text-gray-700 mb-2">
          Digite o código do notebook
        </label>

        <div className="flex gap-3">

          <input
            type="text"
            value={codigo}
            onChange={(e) =>
              setCodigo(e.target.value)
            }
            placeholder="Ex.: NB-001"
            disabled={isLoading}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />

          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-lg transition-colors"
          >
            <Search size={18} />
            Buscar
          </button>

        </div>

      </form>

      {/* Simulação */}
      <div className="mt-6 pt-6 border-t border-gray-200">

        <button
          type="button"
          onClick={handleSimularLeitura}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg transition-colors disabled:opacity-50"
        >
          <CheckCircle size={18} />
          Simular leitura (NB-001)
        </button>

      </div>

    </div>
  );
}