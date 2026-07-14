// src/pages/Turmas/Turmas.jsx

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
} from 'lucide-react';

import {
  Layout,
  TurmaModal,
  ConfirmModal,
  Toast,
} from '../../components';

import { useTurmas } from '../../hooks/useTurmas';


export function Turmas() {

  const {
    turmas = [],
    isLoading,
    error,
    success,
    fetchTurmas,
    handleCreate,
    handleUpdate,
    handleDelete,
    clearMessages,
  } = useTurmas();


  const [
    isModalOpen,
    setIsModalOpen,
  ] = useState(false);


  const [
    selectedTurma,
    setSelectedTurma,
  ] = useState(null);


  const [
    isConfirmOpen,
    setIsConfirmOpen,
  ] = useState(false);


  const [
    turmaToDelete,
    setTurmaToDelete,
  ] = useState(null);


  const [
    toastMessage,
    setToastMessage,
  ] = useState('');


  const [
    toastType,
    setToastType,
  ] = useState('success');



  useEffect(() => {

    fetchTurmas();

  }, []);



  useEffect(() => {

    if (success) {

      setToastMessage(success);
      setToastType('success');

      clearMessages();

    }

  }, [success]);



  useEffect(() => {

    if (error) {

      setToastMessage(error);
      setToastType('error');

      clearMessages();

    }

  }, [error]);



  const handleOpenModal = (turma = null) => {

    setSelectedTurma(turma);
    setIsModalOpen(true);

  };



  const handleCloseModal = () => {

    setIsModalOpen(false);
    setSelectedTurma(null);

  };



  const handleSave = async (data) => {

    try {

      if (selectedTurma) {

        await handleUpdate(
          selectedTurma.id,
          data
        );

      } else {

        await handleCreate(data);

      }


      handleCloseModal();


    } catch (err) {

      console.error(err);

    }

  };



  const handleOpenConfirmDelete = (turma) => {

    setTurmaToDelete(turma);
    setIsConfirmOpen(true);

  };



  const handleConfirmDelete = async () => {

    try {

      if (!turmaToDelete) return;


      await handleDelete(
        turmaToDelete.id
      );


      setTurmaToDelete(null);
      setIsConfirmOpen(false);


    } catch (err) {

      console.error(err);

    }

  };



  return (

    <Layout title="Gerenciar Turmas">

      <div className="space-y-6">


        {/* Cabeçalho */}

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-gray-900">
              Turmas
            </h2>


            <p className="text-gray-600 mt-1">
              Gerencie as turmas/classes da escola
            </p>

          </div>



          <button

            onClick={() => handleOpenModal()}

            disabled={isLoading}

            className="
              bg-blue-600
              hover:bg-blue-700
              disabled:opacity-50
              text-white
              font-medium
              py-2
              px-4
              rounded-lg
              transition-colors
              flex
              items-center
              gap-2
            "

          >

            <Plus size={18} />

            Nova Turma

          </button>


        </div>




        {/* Loading */}

        {isLoading && turmas.length === 0 && (

          <div className="flex flex-col items-center justify-center py-12">

            <div className="
              animate-spin
              rounded-full
              h-12
              w-12
              border-t-2
              border-b-2
              border-blue-500
              mb-4
            " />

            <p className="text-gray-600">
              Carregando turmas...
            </p>

          </div>

        )}





        {/* Lista vazia */}

        {!isLoading && turmas.length === 0 && (

          <div className="
            flex
            flex-col
            items-center
            justify-center
            py-12
            bg-white
            rounded-lg
            border
            border-gray-200
          ">


            <AlertCircle
              size={64}
              strokeWidth={1.5}
              className="text-gray-300 mb-4"
            />


            <h3 className="
              text-xl
              font-semibold
              text-gray-600
              mb-2
            ">

              Nenhuma turma cadastrada

            </h3>


            <p className="
              text-gray-400
              text-center
              max-w-sm
            ">

              Clique em "Nova Turma" para cadastrar a primeira turma.

            </p>


          </div>

        )}






        {/* Tabela */}

        {!isLoading && turmas.length > 0 && (

          <div className="
            bg-white
            rounded-lg
            border
            border-gray-200
            card-shadow
            overflow-hidden
          ">


            <div className="overflow-x-auto">


              <table className="w-full">


                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Nome da Turma
                    </th>


                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Criada em
                    </th>


                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700">
                      Ações
                    </th>


                  </tr>

                </thead>



                <tbody className="divide-y">


                  {turmas.map((turma) => (

                    <tr
                      key={turma.id}
                      className="hover:bg-gray-50"
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



                      <td className="px-6 py-4 space-x-2">


                        <button

                          onClick={() =>
                            handleOpenModal(turma)
                          }

                          className="
                            inline-flex
                            items-center
                            gap-1
                            px-3
                            py-1
                            text-sm
                            bg-blue-100
                            text-blue-700
                            rounded-lg
                          "

                        >

                          <Edit2 size={14}/>

                          Editar

                        </button>




                        <button

                          onClick={() =>
                            handleOpenConfirmDelete(turma)
                          }

                          className="
                            inline-flex
                            items-center
                            gap-1
                            px-3
                            py-1
                            text-sm
                            bg-red-100
                            text-red-700
                            rounded-lg
                          "

                        >

                          <Trash2 size={14}/>

                          Excluir

                        </button>


                      </td>


                    </tr>

                  ))}


                </tbody>


              </table>


            </div>


          </div>

        )}


      </div>





      <TurmaModal

        isOpen={isModalOpen}

        turma={selectedTurma}

        isLoading={isLoading}

        onSave={handleSave}

        onClose={handleCloseModal}

      />





      <ConfirmModal

        isOpen={isConfirmOpen}

        title="Excluir Turma"

        message={`Tem certeza que deseja excluir a turma "${turmaToDelete?.nome}"?`}

        confirmText="Excluir"

        cancelText="Cancelar"

        variant="danger"

        isLoading={isLoading}

        onConfirm={handleConfirmDelete}

        onCancel={() => {

          setIsConfirmOpen(false);
          setTurmaToDelete(null);

        }}

      />





      {toastMessage && (

        <Toast

          message={toastMessage}

          type={toastType}

          onClose={() =>
            setToastMessage('')
          }

        />

      )}



    </Layout>

  );

}