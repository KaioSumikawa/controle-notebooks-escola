import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const getPages = () => {
    const pages = [];

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }

      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push('...');
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push('...');
    }

    pages.push(totalPages);

    return pages;
  };

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">

      {/* Informação */}
      <div className="text-sm text-slate-500">
        Página{' '}
        <span className="font-semibold text-slate-900">
          {currentPage}
        </span>{' '}
        de{' '}
        <span className="font-semibold text-slate-900">
          {totalPages}
        </span>
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-2">

        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition

            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-700

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft size={18} />
          Anterior
        </button>

        {getPages().map((page, index) => {

          if (page === '...') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-slate-400"
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                text-sm
                font-semibold
                transition-all

                ${
                  currentPage === page
                    ? `
                      bg-blue-600
                      text-white
                      shadow-md
                    `
                    : `
                      border
                      border-slate-200
                      bg-white
                      text-slate-600

                      hover:border-blue-300
                      hover:bg-blue-50
                      hover:text-blue-700
                    `
                }
              `}
            >
              {page}
            </button>
          );

        })}

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="
            flex
            items-center
            gap-2
            rounded-xl
            border
            border-slate-200
            bg-white
            px-4
            py-2
            text-sm
            font-medium
            text-slate-600
            transition

            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-700

            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Próxima
          <ChevronRight size={18} />
        </button>

      </div>

    </div>
  );
}

export default Pagination;