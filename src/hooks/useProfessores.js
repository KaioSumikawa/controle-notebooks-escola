import { useState } from 'react';
import { professores as professoresIniciais } from '../data/professores';

export function useProfessores() {
  const [professores, setProfessores] = useState(professoresIniciais);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };


  const fetchProfessores = async () => {
    setIsLoading(true);

    try {
      // Futuramente será substituído pelo Supabase
      setProfessores((prev) => [...prev]);

    } catch (err) {
      setError(
        err?.message || 'Erro ao carregar professores.'
      );

    } finally {
      setIsLoading(false);
    }
  };


  const handleCreate = async (data) => {
    setIsLoading(true);

    try {
      let novoProfessor;

      setProfessores((prev) => {

        novoProfessor = {
          id: `PROF-${String(prev.length + 1).padStart(3, '0')}`,
          nome: data.nome,
          email: data.email || '',
          telefone: data.telefone || '',
          disciplina: data.disciplina || '',
          ativo: true,
          createdAt: new Date().toISOString(),
        };


        return [
          ...prev,
          novoProfessor,
        ];
      });


      setSuccess(
        'Professor cadastrado com sucesso.'
      );


      return novoProfessor;

    } catch (err) {

      setError(
        err?.message || 'Erro ao cadastrar professor.'
      );

      throw err;

    } finally {

      setIsLoading(false);

    }
  };



  const handleUpdate = async (id, data) => {
    setIsLoading(true);

    try {

      setProfessores((prev) =>
        prev.map((professor) =>
          professor.id === id
            ? {
                ...professor,
                ...data,
              }
            : professor
        )
      );


      setSuccess(
        'Professor atualizado com sucesso.'
      );


    } catch (err) {

      setError(
        err?.message || 'Erro ao atualizar professor.'
      );

      throw err;

    } finally {

      setIsLoading(false);

    }
  };



  const handleDelete = async (id) => {
    setIsLoading(true);

    try {

      setProfessores((prev) =>
        prev.filter(
          (professor) =>
            professor.id !== id
        )
      );


      setSuccess(
        'Professor removido com sucesso.'
      );


    } catch (err) {

      setError(
        err?.message || 'Erro ao remover professor.'
      );

      throw err;

    } finally {

      setIsLoading(false);

    }
  };



  return {
    professores,

    isLoading,

    error,

    success,

    fetchProfessores,

    handleCreate,

    handleUpdate,

    handleDelete,

    clearMessages,
  };
}