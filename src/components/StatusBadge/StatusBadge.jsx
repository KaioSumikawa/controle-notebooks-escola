export function StatusBadge({ status, variant = 'default' }) {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'disponível':
      case 'disponivel':
        return 'bg-green-100 text-green-800';
      case 'emprestado':
        return 'bg-blue-100 text-blue-800';
      case 'manutenção':
      case 'manutencao':
        return 'bg-yellow-100 text-yellow-800';
      case 'danificado':
        return 'bg-red-100 text-red-800';
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-gray-100 text-gray-800';
      case 'pendente':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
      {status}
    </span>
  );
}
