import { ChevronDown } from 'lucide-react';

export function FilterSelect({
  label = '',
  value = '',
  options = [],
  onChange,
  placeholder = 'Selecione...',
  className = '',
}) {
  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            appearance-none
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
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
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
  );
}

export default FilterSelect;