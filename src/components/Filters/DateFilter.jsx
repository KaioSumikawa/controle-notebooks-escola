import { Calendar } from 'lucide-react';

export function DateFilter({
  startDate = '',
  endDate = '',
  onStartDateChange,
  onEndDateChange,
  className = '',
}) {
  return (
    <div
      className={`
        flex
        flex-col
        sm:flex-row
        gap-3
        ${className}
      `}
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Data inicial
        </label>

        <div className="relative">
          <input
            type="date"
            value={startDate}
            onChange={(e) =>
              onStartDateChange(e.target.value)
            }
            className="
              w-full
              bg-white
              border
              border-gray-200
              rounded-lg
              px-4
              py-2.5
              pr-10
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          <Calendar
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              pointer-events-none
            "
          />
        </div>
      </div>


      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">
          Data final
        </label>

        <div className="relative">
          <input
            type="date"
            value={endDate}
            onChange={(e) =>
              onEndDateChange(e.target.value)
            }
            className="
              w-full
              bg-white
              border
              border-gray-200
              rounded-lg
              px-4
              py-2.5
              pr-10
              text-sm
              text-gray-700
              outline-none
              transition
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-100
            "
          />

          <Calendar
            size={18}
            className="
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-gray-400
              pointer-events-none
            "
          />
        </div>
      </div>
    </div>
  );
}

export default DateFilter;