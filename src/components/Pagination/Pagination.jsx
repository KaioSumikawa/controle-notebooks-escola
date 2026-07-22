import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}) {
  const safeTotalPages = Math.max(1, totalPages);

  const safeCurrentPage = Math.min(
    Math.max(1, currentPage),
    safeTotalPages
  );

  const handlePrevious = () => {
    if (safeCurrentPage > 1) {
      onPageChange?.(safeCurrentPage - 1);
    }
  };

  const handleNext = () => {
    if (safeCurrentPage < safeTotalPages) {
      onPageChange?.(safeCurrentPage + 1);
    }
  };

  const getPages = () => {
    const pages = [];

    if (safeTotalPages <= 7) {
      for (let page = 1; page <= safeTotalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    pages.push(1);

    if (safeCurrentPage > 3) {
      pages.push('ellipsis-left');
    }

    const startPage = Math.max(
      2,
      safeCurrentPage - 1
    );

    const endPage = Math.min(
      safeTotalPages - 1,
      safeCurrentPage + 1
    );

    for (
      let page = startPage;
      page <= endPage;
      page++
    ) {
      pages.push(page);
    }

    if (safeCurrentPage < safeTotalPages - 2) {
      pages.push('ellipsis-right');
    }

    pages.push(safeTotalPages);

    return pages;
  };

  return (
    <div
      className="
        flex
        flex-col
        gap-4
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-sm
        md:flex-row
        md:items-center
        md:justify-between
      "
    >
      {/* Informação */}
      <div className="text-sm text-slate-500">
        Página{' '}
        <span className="font-semibold text-slate-900">
          {safeCurrentPage}
        </span>{' '}
        de{' '}
        <span className="font-semibold text-slate-900">
          {safeTotalPages}
        </span>
      </div>

      {/* Navegação */}
      <div className="flex items-center gap-2">
        {/* Página anterior */}
        <button
          type="button"
          onClick={handlePrevious}
          disabled={safeCurrentPage === 1}
          aria-label="Ir para a página anterior"
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
            transition-all
            duration-200
            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          <ChevronLeft
            size={18}
            strokeWidth={2}
          />

          Anterior
        </button>

        {/* Páginas */}
        {getPages().map((page) => {
          if (
            page === 'ellipsis-left' ||
            page === 'ellipsis-right'
          ) {
            return (
              <span
                key={page}
                className="px-2 text-slate-400"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isCurrentPage =
            safeCurrentPage === page;

          return (
            <button
              key={page}
              type="button"
              onClick={() =>
                onPageChange?.(page)
              }
              aria-label={`Ir para a página ${page}`}
              aria-current={
                isCurrentPage
                  ? 'page'
                  : undefined
              }
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
                duration-200
                focus:outline-none
                focus:ring-2
                focus:ring-blue-500/20

                ${
                  isCurrentPage
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

        {/* Próxima página */}
        <button
          type="button"
          onClick={handleNext}
          disabled={
            safeCurrentPage === safeTotalPages
          }
          aria-label="Ir para a próxima página"
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
            transition-all
            duration-200
            hover:border-blue-300
            hover:bg-blue-50
            hover:text-blue-700
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500/20
            disabled:cursor-not-allowed
            disabled:opacity-40
          "
        >
          Próxima

          <ChevronRight
            size={18}
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}

export default Pagination;