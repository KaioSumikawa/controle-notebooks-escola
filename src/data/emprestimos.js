export const emprestimos = [
  {
    id: 'EMP-001',

    // Notebook emprestado
    notebookId: 'NB-008',

    // Responsável pelo empréstimo
    professor: 'Carlos Silva',
    turma: '2º A',

    // Datas
    dataEmprestimo: '2026-07-14',
    horaEmprestimo: '09:15',

    dataDevolucao: null,
    horaDevolucao: null,

    // Status:
    // disponivel -> não existe para empréstimos
    // ativo
    // finalizado
    // atrasado (implementação futura)
    status: 'ativo',

    observacao: '',

    createdAt: '2026-07-14T09:15:00',
    updatedAt: '2026-07-14T09:15:00',
  },

  {
    id: 'EMP-002',

    notebookId: 'NB-014',

    professor: 'Maria Oliveira',
    turma: '1º B',

    dataEmprestimo: '2026-07-14',
    horaEmprestimo: '08:40',

    dataDevolucao: null,
    horaDevolucao: null,

    status: 'ativo',

    observacao: '',

    createdAt: '2026-07-14T08:40:00',
    updatedAt: '2026-07-14T08:40:00',
  },

  {
    id: 'EMP-003',

    notebookId: 'NB-022',

    professor: 'João Santos',
    turma: '3º A',

    dataEmprestimo: '2026-07-13',
    horaEmprestimo: '10:20',

    dataDevolucao: '2026-07-13',
    horaDevolucao: '12:00',

    status: 'finalizado',

    observacao: 'Devolvido normalmente.',

    createdAt: '2026-07-13T10:20:00',
    updatedAt: '2026-07-13T12:00:00',
  },
];