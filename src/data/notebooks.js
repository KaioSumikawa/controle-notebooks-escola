export const notebooks = Array.from({ length: 70 }, (_, index) => ({
  id: `NB-${String(index + 1).padStart(3, '0')}`,
  numero: index + 1,

  // Informações do notebook
  patrimonio: '',
  modelo: 'Positivo Motion',
  qrCode: `NB-${String(index + 1).padStart(3, '0')}`,

  // Localização do equipamento
  localizacao: '',

  // Status possíveis:
  // disponivel
  // emprestado
  // manutencao
  status: 'disponivel',

  // Informações de empréstimo
  responsavel: '',
  turma: '',

  // Observações do equipamento
  observacao: '',

  // Controle
  ativo: true,

  // Data de cadastro
  dataCadastro: new Date().toISOString(),
}));