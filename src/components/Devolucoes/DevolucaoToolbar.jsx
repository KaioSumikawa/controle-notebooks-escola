import { SearchBar } from '../../components';
import { QrCode } from 'lucide-react';

export default function DevolucaoToolbar({
  searchValue,
  onSearchChange,
  onOpenScanner,
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-5 card-shadow lg:flex-row lg:items-center lg:justify-between">
      {/* Pesquisa */}
      <div className="w-full lg:max-w-md">
        <SearchBar
          placeholder="Pesquisar por professor, turma ou notebook..."
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Botão QR Code */}
      <button
        type="button"
        onClick={onOpenScanner}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
      >
        <QrCode size={20} />
        Registrar por QR Code
      </button>
    </div>
  );
}