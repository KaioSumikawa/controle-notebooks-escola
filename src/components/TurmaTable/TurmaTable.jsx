import { Edit2, Trash2 } from 'lucide-react';

export function TurmaTable({
  turmas = [],
  isLoading = false,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 card-shadow overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full text-sm text-left">

          <thead className="bg-gray-50 border-b border-gray-200">

            <tr>

              <th className="px-6 py-4 font-semibold text-gray-700">
                Nome da Turma
              </th>


              <th className="px-6 py-4 font-semibold text-gray-700">
                Criada em
              </th>


              <th className="px-6 py-4 font-semibold text-gray-700 text-center">
                Ações
              </th>

            </tr>

          </thead>



          <tbody>

            {turmas.map((turma) => (

              <tr

                key={turma.id}

                className="
                  border-b
                  border-gray-100
                  hover:bg-gray-50
                  transition-colors
                "

              >


                <td className="px-6 py-4">

                  <p className="font-medium text-gray-900">
                    {turma.nome}
                  </p>

                </td>




                <td className="px-6 py-4 text-gray-600">

                  {new Date(
                    turma.created_at ||
                    turma.createdAt
                  ).toLocaleDateString(
                    'pt-BR'
                  )}

                </td>





                <td className="px-6 py-4">

                  <div className="flex justify-center gap-2">


                    <button

                      type="button"

                      onClick={() =>
                        onEdit?.(turma)
                      }

                      disabled={isLoading}

                      className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-2
                        text-sm
                        text-blue-700
                        bg-blue-100
                        hover:bg-blue-200
                        rounded-lg
                        transition-colors
                        disabled:opacity-50
                      "

                    >

                      <Edit2 size={14} />

                      Editar

                    </button>





                    <button

                      type="button"

                      onClick={() =>
                        onDelete?.(turma)
                      }

                      disabled={isLoading}

                      className="
                        flex
                        items-center
                        gap-1
                        px-3
                        py-2
                        text-sm
                        text-red-700
                        bg-red-100
                        hover:bg-red-200
                        rounded-lg
                        transition-colors
                        disabled:opacity-50
                      "

                    >

                      <Trash2 size={14} />

                      Excluir

                    </button>


                  </div>


                </td>


              </tr>


            ))}


          </tbody>


        </table>


      </div>


    </div>
  );
}