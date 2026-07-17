import { Filter, RotateCcw } from 'lucide-react';

export function AdvancedFilters({
  filters,
  setFilters,
  onClear,
}) {
  function handleChange(event) {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

      {/* Cabeçalho */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
            <Filter
              size={20}
              className="text-blue-600"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Filtros Avançados
            </h2>

            <p className="text-sm text-slate-500">
              Refine sua pesquisa utilizando os campos abaixo.
            </p>
          </div>

        </div>

        <button
          onClick={onClear}
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition

            hover:border-red-200
            hover:bg-red-50
            hover:text-red-600
          "
        >
          <RotateCcw size={16} />
          Limpar filtros
        </button>

      </div>

      {/* Campos */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">

        {/* Busca */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Buscar
          </label>

          <input
            type="text"
            name="search"
            value={filters.search || ''}
            onChange={handleChange}
            placeholder="Professor, notebook..."
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

        {/* Status */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Status
          </label>

          <select
            name="status"
            value={filters.status || ''}
            onChange={handleChange}
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              transition

              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          >
            <option value="">
              Todos
            </option>

            <option value="disponivel">
              Disponível
            </option>

            <option value="emprestado">
              Emprestado
            </option>

            <option value="manutencao">
              Em manutenção
            </option>
          </select>
        </div>

        {/* Turma */}
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Turma
          </label>

          <input
            type="text"
            name="turma"
            value={filters.turma || ''}
            onChange={handleChange}
            placeholder="Ex.: 3º Ano A"
            className="
              w-full
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-3
              text-sm
              outline-none
              transition

              placeholder:text-slate-400

              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-100
            "
          />
        </div>

      </div>

    </div>
  );
}

export default AdvancedFilters;