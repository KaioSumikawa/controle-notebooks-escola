import { useMemo, useState } from 'react';

import {
  Layout,
  EmptyState,
  SearchBar,
  EmprestimoModal,
  EmprestimoTable,
} from '../../components';

import { ClipboardList } from 'lucide-react';

import { useEmprestimos } from '../../hooks/useEmprestimos';

import { EmprestimoStats } from '../../components/Emprestimos/EmprestimoStats';

import { EmprestimoQuickActions } from '../../components/Emprestimos/EmprestimoQuickActions';

export function Emprestimos() {
  const [searchValue, setSearchValue] = useState('');
  const [showModal, setShowModal] = useState(false);

  const {
    emprestimos = [],
    isLoading,
    handleCreate,
  } = useEmprestimos();

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSave = async (data) => {
    await handleCreate(data);
    handleCloseModal();
  };

  const handleNovoEmprestimo = () => {
    setShowModal(true);
  };

  const handleRegistrarDevolucao = () => {
    // Fluxo de devolução será conectado posteriormente.
    console.log('Registrar devolução');
  };

  const handleAbrirQRCode = () => {
    // Leitor de QR Code será conectado posteriormente.
    console.log('Abrir leitor de QR Code');
  };

  const emprestimosFiltrados = useMemo(() => {
    const busca = searchValue.trim().toLowerCase();

    if (!busca) {
      return emprestimos;
    }

    return emprestimos.filter((emprestimo) => {
      return (
        emprestimo.professor
          ?.toLowerCase()
          .includes(busca) ||
        emprestimo.turma
          ?.toLowerCase()
          .includes(busca) ||
        emprestimo.notebookId
          ?.toLowerCase()
          .includes(busca)
      );
    });
  }, [emprestimos, searchValue]);

  const hoje = new Date()
    .toISOString()
    .split('T')[0];

  const emprestimosAtivos = useMemo(() => {
    return emprestimos.filter(
      (emprestimo) =>
        emprestimo.status === 'ativo'
    ).length;
  }, [emprestimos]);

  const emprestimosHoje = useMemo(() => {
    return emprestimos.filter(
      (emprestimo) =>
        emprestimo.dataEmprestimo === hoje
    ).length;
  }, [emprestimos, hoje]);

  const devolvidosHoje = useMemo(() => {
    return emprestimos.filter(
      (emprestimo) =>
        emprestimo.status === 'devolvido' &&
        (
          emprestimo.dataDevolucao === hoje ||
          emprestimo.dataDevolvido === hoje
        )
    ).length;
  }, [emprestimos, hoje]);

  return (
    <Layout>
      <div className="space-y-6">

        {/* Estatísticas */}
        <EmprestimoStats
          total={emprestimos.length}
          ativos={emprestimosAtivos}
          hoje={emprestimosHoje}
          devolvidos={devolvidosHoje}
        />

        {/* Ações */}
        <EmprestimoQuickActions
          onNovoEmprestimo={handleNovoEmprestimo}
          onRegistrarDevolucao={handleRegistrarDevolucao}
          onAbrirQRCode={handleAbrirQRCode}
        />

        {/* Pesquisa */}
        <SearchBar
          placeholder="Pesquisar por professor, turma ou notebook..."
          value={searchValue}
          onChange={(event) =>
            setSearchValue(event.target.value)
          }
        />

        {/* Conteúdo */}
        {emprestimosFiltrados.length === 0 ? (

          <EmptyState
            title={
              isLoading
                ? 'Carregando empréstimos...'
                : 'Nenhum empréstimo encontrado'
            }
            description={
              isLoading
                ? 'Aguarde alguns instantes.'
                : searchValue
                  ? 'Tente realizar uma nova busca.'
                  : 'Nenhum empréstimo registrado até o momento.'
            }
            icon={ClipboardList}
          />

        ) : (

          <EmprestimoTable
            emprestimos={emprestimosFiltrados}
          />

        )}

        {/* Modal */}
        <EmprestimoModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSave}
        />

      </div>
    </Layout>
  );
}