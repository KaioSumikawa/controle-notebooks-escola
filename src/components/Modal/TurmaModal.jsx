// src/components/Modal/TurmaModal.jsx

import { useState, useEffect } from 'react';
import { Modal } from './Modal';


const initialFormData = {
  nome: '',
};


/**
 * Modal para criar/editar turmas
 */
export function TurmaModal({
  isOpen = false,
  turma = null,
  isLoading = false,
  onSave,
  onClose,
}) {

  const [formData, setFormData] = useState(initialFormData);

  const [error, setError] = useState('');



  useEffect(() => {

    if (!isOpen) return;


    if (turma) {

      setFormData({
        nome: turma.nome || '',
      });

    } else {

      setFormData(initialFormData);

    }


    setError('');

  }, [isOpen, turma]);





  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

  };





  const resetForm = () => {

    setFormData(initialFormData);

    setError('');

  };





  const handleClose = () => {

    resetForm();

    onClose?.();

  };





  const handleSubmit = async (e) => {

    e.preventDefault();


    setError('');



    if (!formData.nome.trim()) {

      setError(
        'Nome da turma é obrigatório.'
      );

      return;

    }





    try {


      await onSave?.({

        nome: formData.nome.trim(),

      });



      resetForm();



    } catch (err) {


      setError(
        err?.message ||
        'Erro ao salvar turma.'
      );


    }

  };





  return (

    <Modal

      isOpen={isOpen}

      onClose={handleClose}

      title={
        turma
          ? 'Editar Turma'
          : 'Nova Turma'
      }

      size="sm"

    >


      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >


        {/* Nome */}

        <div>


          <label

            htmlFor="turma-nome"

            className="
              block
              text-sm
              font-medium
              text-gray-700
              mb-2
            "

          >

            Nome da Turma *

          </label>




          <input

            id="turma-nome"

            name="nome"

            type="text"

            value={formData.nome}

            onChange={handleChange}

            placeholder="Ex: 1º Ano A"

            disabled={isLoading}

            className="
              w-full
              px-4
              py-2
              border
              border-gray-300
              rounded-lg
              focus:outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-200
            "

          />


        </div>





        {/* Erro */}

        {error && (

          <div className="
            p-3
            bg-red-50
            border
            border-red-200
            rounded-lg
          ">

            <p className="text-sm text-red-700">

              {error}

            </p>

          </div>

        )}






        {/* Botões */}

        <div className="flex gap-3 pt-4">


          <button

            type="button"

            onClick={handleClose}

            disabled={isLoading}

            className="
              flex-1
              px-4
              py-2
              text-gray-700
              bg-gray-100
              hover:bg-gray-200
              rounded-lg
              font-medium
              transition-colors
              disabled:opacity-50
            "

          >

            Cancelar

          </button>





          <button

            type="submit"

            disabled={isLoading}

            className="
              flex-1
              px-4
              py-2
              text-white
              bg-blue-600
              hover:bg-blue-700
              rounded-lg
              font-medium
              transition-colors
              disabled:opacity-50
            "

          >

            {
              isLoading
                ? 'Salvando...'
                : turma
                  ? 'Atualizar'
                  : 'Criar'
            }


          </button>


        </div>



      </form>



    </Modal>

  );

}