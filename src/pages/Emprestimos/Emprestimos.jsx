import { useMemo, useState } from 'react';

import {
  Layout,
  EmptyState,
  EmprestimoModal,
  EmprestimoTable,
} from '../../components';

import { ClipboardList } from 'lucide-react';

import { useEmprestimos } from '../../hooks/useEmprestimos';

import { EmprestimoStats } from '../../components/Emprestimos/EmprestimoStats';
import { EmprestimoQuickActions } from '../../components/Emprestimos/EmprestimoQuickActions';

export function Emprestimos() {
  const [searchValue, setSearchValue] = useState('');
  const [status, setStatus] = useState('todos');
  const [period, setPeriod] = useState('todos');
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
    console.log('Registrar devolução');
  };

  const handleAbrirQRCode = () => {
    console.log('Abrir leitor de QR Code');
  };

  const handleClearFilters = () => {
    setSearchValue('');
    setStatus('todos');
    setPeriod('todos');
  };

  const emprestimosFiltrados = useMemo(() => {
    const busca = searchValue.trim().toLowerCase();

    return emprestimos.filter((emprestimo) => {
      const correspondeBusca =
        !busca ||
        emprestimo.professor
          ?.toLowerCase()
          .includes(busca) ||
        emprestimo.turma
          ?.toLowerCase()
          .includes(busca) ||
        emprestimo.notebookId
          ?.toLowerCase()
          .includes(busca);

      const correspondeStatus =
        status === 'todos' ||
        emprestimo.status === status;

      // Preparado para implementar depois
      const correspondePeriodo = true;

      return (
        correspondeBusca &&
        correspondeStatus &&
        correspondePeriodo
      );
    });
  }, [
    emprestimos,
    searchValue,
    status,
    period,
  ]);

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

        <EmprestimoStats
          total={emprestimos.length}
          ativos={emprestimosAtivos}
          hoje={emprestimosHoje}
          devolvidos={devolvidosHoje}
        />

        <EmprestimoQuickActions
          onNovoEmprestimo={handleNovoEmprestimo}
          onRegistrarDevolucao={handleRegistrarDevolucao}
          onAbrirQRCode={handleAbrirQRCode}
        />

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
                : 'Tente ajustar os filtros ou cadastrar um novo empréstimo.'
            }
            icon={ClipboardList}
          />

        ) : (

          <EmprestimoTable
            emprestimos={emprestimosFiltrados}
            searchValue={searchValue}
            onSearchChange={(event) =>
              setSearchValue(event.target.value)
            }
            status={status}
            onStatusChange={setStatus}
            period={period}
            onPeriodChange={setPeriod}
            onClearFilters={handleClearFilters}
            onNovoEmprestimo={handleNovoEmprestimo}
            total={emprestimosFiltrados.length}
          />

        )}

        <EmprestimoModal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSave}
        />

      </div>
    </Layout>
  );
}