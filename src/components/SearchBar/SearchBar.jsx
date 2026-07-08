import { Search } from 'lucide-react';

export function SearchBar({ placeholder = 'Pesquisar...', onChange, value = '' }) {
  return (
    <div className="relative flex-1">
      <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
        <Search size={18} className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
}
