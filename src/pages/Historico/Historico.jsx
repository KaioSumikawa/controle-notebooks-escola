import {
  Layout,
  EmptyState,
  SearchBar,
  StatusBadge,
} from '../../components';

import { Clock } from 'lucide-react';
import { useState } from 'react';
import { useEmprestimos } from '../../hooks/useEmprestimos';


export function Historico() {
  const [searchValue, setSearchValue] = useState('');
  const [filtro, setFiltro] = useState('todos');

  const {
    emprestimos,
    isLoading,
  } = useEmprestimos();


  const historicoFiltrado = emprestimos.filter((emprestimo) => {

    const correspondeFiltro =
      filtro === 'todos' ||
      (filtro === 'emprestimos' &&
        emprestimo.status === 'ativo') ||
      (filtro === 'devolucoes' &&
        emprestimo.status === 'finalizado');


    const textoBusca =
      `${emprestimo.notebookId}
      ${emprestimo.professor}
      ${emprestimo.turma}`
        .toLowerCase();


    const correspondeBusca =
      textoBusca.includes(
        searchValue.toLowerCase()
      );


    return (
      correspondeFiltro &&
      correspondeBusca
    );
  });


  return (
    <Layout
      title="Histórico de Transações"
      onSearchChange={setSearchValue}
      searchValue={searchValue}
    >

      <div className="space-y-6">


        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Histórico
          </h2>

          <p className="text-gray-600 mt-1">
            Visualize todos os empréstimos e devoluções realizados
          </p>
        </div>



        {/* Pesquisa e filtros */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 card-shadow">

          <SearchBar
            placeholder="Pesquisar por professor, turma ou notebook..."
            value={searchValue}
            onChange={(e) =>
              setSearchValue(e.target.value)
            }
          />


          <div className="mt-4 flex flex-wrap gap-2">

            {[
              ['todos', 'Todas'],
              ['emprestimos', 'Empréstimos'],
              ['devolucoes', 'Devoluções'],
            ].map(([valor, texto]) => (

              <button
                key={valor}
                onClick={() => setFiltro(valor)}
                className={`
                  px-3 py-1 text-sm rounded-full transition-colors
                  ${
                    filtro === valor
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }
                `}
              >
                {texto}
              </button>

            ))}

          </div>

        </div>



        {/* Loading */}
        {isLoading && (
          <div className="flex justify-center py-10">
            <p className="text-gray-500">
              Carregando histórico...
            </p>
          </div>
        )}



        {/* Sem dados */}
        {!isLoading &&
          historicoFiltrado.length === 0 && (

          <EmptyState
            title="Nenhuma transação encontrada"
            description="O histórico de empréstimos aparecerá aqui."
            icon={Clock}
          />

        )}



        {/* Tabela */}
        {!isLoading &&
          historicoFiltrado.length > 0 && (

          <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">

            <div className="overflow-x-auto">

              <table className="w-full text-sm text-left">

                <thead className="bg-gray-50 border-b border-gray-200">

                  <tr>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Notebook
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Professor
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Turma
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Data Retirada
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Data Devolução
                    </th>

                    <th className="px-6 py-4 font-semibold text-gray-700">
                      Status
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {historicoFiltrado.map((emprestimo) => (

                    <tr
                      key={emprestimo.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >

                      <td className="px-6 py-4 font-medium text-gray-900">
                        {emprestimo.notebookId}
                      </td>


                      <td className="px-6 py-4 text-gray-700">
                        {emprestimo.professor}
                      </td>


                      <td className="px-6 py-4 text-gray-700">
                        {emprestimo.turma}
                      </td>


                      <td className="px-6 py-4 text-gray-600">
                        {emprestimo.dataEmprestimo}
                        {' '}
                        {emprestimo.horaEmprestimo}
                      </td>


                      <td className="px-6 py-4 text-gray-600">
                        {emprestimo.dataDevolucao
                          ? `${emprestimo.dataDevolucao} ${emprestimo.horaDevolucao || ''}`
                          : '-'
                        }
                      </td>


                      <td className="px-6 py-4">
                        <StatusBadge
                          status={emprestimo.status}
                        />
                      </td>


                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        )}

      </div>

    </Layout>
  );
}