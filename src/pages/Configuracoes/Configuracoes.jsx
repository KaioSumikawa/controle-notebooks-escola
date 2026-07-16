import { useState } from 'react';
import {
  Layout,
  Toast,
} from '../../components';

import {
  Save,
  School,
  Settings,
} from 'lucide-react';

export function Configuracoes() {
  const [configuracoes, setConfiguracoes] = useState({
    nomeEscola: 'Escola Estadual',
    quantidadeDias: 7,
    observacaoPadrao: '',
  });

  const [toast, setToast] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setConfiguracoes((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Futuramente salvará no Supabase
    console.log(configuracoes);

    setToast('Configurações salvas com sucesso.');
  };

  return (
    <Layout title="Configurações">
      <div className="space-y-6 max-w-3xl">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Configurações
          </h2>

          <p className="text-gray-600 mt-1">
            Configure parâmetros gerais do sistema.
          </p>
        </div>

        {/* Dados da Escola */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">

          <div className="flex items-center gap-2 mb-5">
            <School size={20} />
            <h3 className="text-lg font-semibold text-gray-900">
              Dados da Escola
            </h3>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome da Escola
              </label>

              <input
                type="text"
                name="nomeEscola"
                value={configuracoes.nomeEscola}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

          </div>

        </div>

        {/* Configurações do Sistema */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 card-shadow">

          <div className="flex items-center gap-2 mb-5">
            <Settings size={20} />
            <h3 className="text-lg font-semibold text-gray-900">
              Sistema
            </h3>
          </div>

          <div className="space-y-4">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo padrão do empréstimo (dias)
              </label>

              <input
                type="number"
                min="1"
                name="quantidadeDias"
                value={configuracoes.quantidadeDias}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Observação padrão
              </label>

              <textarea
                rows={4}
                name="observacaoPadrao"
                value={configuracoes.observacaoPadrao}
                onChange={handleChange}
                placeholder="Ex.: Devolver o notebook carregado e em boas condições."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>

          </div>

        </div>

        {/* Botão */}
        <button
          onClick={handleSave}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
        >
          <Save size={18} />
          Salvar Configurações
        </button>

        {toast && (
          <Toast
            message={toast}
            type="success"
            onClose={() => setToast('')}
          />
        )}

      </div>
    </Layout>
  );
}