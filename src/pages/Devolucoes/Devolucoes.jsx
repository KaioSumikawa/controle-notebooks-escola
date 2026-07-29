import {
  Layout,
  EmptyState,
  SearchBar,
} from '../../components';

import QRCodeActionCard from '../../components/QRCodeActionCard/QRCodeActionCard';

import {
  ClipboardCheck,
  RotateCcw,
} from 'lucide-react';

import { useMemo, useState } from 'react';
import { useEmprestimos } from '../../hooks/useEmprestimos';

export function Devolucoes() {
  const [searchValue, setSearchValue] = useState('');

  const {
    emprestimos = [],
    handleDevolver,
  } = useEmprestimos();

  const emprestimosAtivos = useMemo(() => {
    const busca = searchValue.trim().toLowerCase();

    return emprestimos.filter((emprestimo) => {
      if (emprestimo.status !== 'ativo') {
        return false;
      }

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

  const registrarDevolucao = async (id) => {
    if (
      !window.confirm(
        'Deseja realmente registrar a devolução deste notebook?'
      )
    ) {
      return;
    }

    await handleDevolver(id);
  };

  const handleOpenScanner = () => {
    console.log('Abrir scanner QR Code');
  };

  return (
    <Layout>
      <div className="space-y-8">
        {emprestimosAtivos.length === 0 ? (
          <EmptyState
            title="Nenhuma devolução pendente"
            description="Todos os notebooks emprestados já foram devolvidos."
            icon={ClipboardCheck}
          />
        ) : (
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            {/* Pesquisa */}
            <div className="border-b border-slate-200 p-5">
              <SearchBar
                placeholder="Pesquisar professor, notebook ou turma..."
                value={searchValue}
                onChange={(e) =>
                  setSearchValue(e.target.value)
                }
              />
            </div>

            {/* Tabela */}
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 border-b border-slate-200 bg-slate-50">
                  <tr className="text-slate-600">
                    <th className="px-6 py-4 text-left font-semibold">
                      Notebook
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Professor
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Turma
                    </th>

                    <th className="px-6 py-4 text-left font-semibold">
                      Data do Empréstimo
                    </th>

                    <th className="px-6 py-4 text-center font-semibold">
                      Ação
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {emprestimosAtivos.map((emprestimo) => (
                    <tr
                      key={emprestimo.id}
                      className="border-b border-slate-100 transition-all duration-200 hover:bg-slate-50"
                    >
                      <td className="px-6 py-5">
                        <span className="font-semibold text-slate-800">
                          {emprestimo.notebookId}
                        </span>
                      </td>

                      <td className="px-6 py-5 text-slate-700">
                        {emprestimo.professor}
                      </td>

                      <td className="px-6 py-5 text-slate-700">
                        {emprestimo.turma}
                      </td>

                      <td className="px-6 py-5 text-slate-600">
                        {emprestimo.dataEmprestimo}
                      </td>

                      <td className="px-6 py-5">
                        <div className="flex justify-center">
                          <button
                            type="button"
                            onClick={() =>
                              registrarDevolucao(
                                emprestimo.id
                              )
                            }
                            className="
                              inline-flex
                              items-center
                              gap-2
                              rounded-xl
                              bg-green-600
                              px-4
                              py-2.5
                              text-sm
                              font-medium
                              text-white
                              shadow-sm
                              transition-all
                              duration-200
                              hover:-translate-y-0.5
                              hover:bg-green-700
                              hover:shadow-md
                              active:translate-y-0
                            "
                          >
                            <RotateCcw size={16} />
                            Registrar Devolução
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <QRCodeActionCard
          title="Devolução rápida com QR Code"
          description="Escaneie o código do notebook para localizar automaticamente o empréstimo ativo e registrar a devolução em poucos segundos."
          buttonText="Escanear QR Code"
          onScan={handleOpenScanner}
        />
      </div>
    </Layout>
  );
}