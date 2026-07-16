import { useEffect, useState } from 'react';
import { Modal } from './Modal';
import { QrCode } from 'lucide-react';
import { qrCodeService } from '../../services/qrCodeService';

const createInitialFormData = () => ({
  modelo: '',
  patrimonio: '',
  localizacao: '',
  status: 'disponivel',
  observacao: '',
  qrCode: '',
});

/**
 * Modal para criar/editar notebooks
 */
export function NotebookModal({
  isOpen = false,
  notebook = null,
  isLoading = false,
  onSave,
  onClose,
}) {
  const [formData, setFormData] = useState(createInitialFormData());
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return;

    if (notebook) {
      setFormData({
        modelo: notebook.modelo ?? '',
        patrimonio: notebook.patrimonio ?? '',
        localizacao: notebook.localizacao ?? '',
        status: notebook.status ?? 'disponivel',
        observacao: notebook.observacao ?? '',
        qrCode: notebook.qrCode ?? notebook.id ?? '',
      });
    } else {
      setFormData(createInitialFormData());
    }

    setError('');
  }, [isOpen, notebook]);

  const resetForm = () => {
    setFormData(createInitialFormData());
    setError('');
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGenerateQrCode = async () => {
    try {
      const qr = await qrCodeService.generate({
        id: notebook?.id,
        numero: notebook?.numero,
        qrCode: formData.qrCode,
      });

      setFormData((prev) => ({
        ...prev,
        qrCode: qr.codigo,
      }));
    } catch (err) {
      setError(err.message || 'Erro ao gerar QR Code.');
    }
  };

  const handleClose = () => {
    if (isLoading) return;

    resetForm();
    onClose?.();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError('');

    const dados = {
      modelo: formData.modelo.trim(),
      patrimonio: formData.patrimonio.trim(),
      localizacao: formData.localizacao.trim(),
      status: formData.status,
      observacao: formData.observacao.trim(),
      qrCode: formData.qrCode,
    };

    if (!dados.modelo) {
      setError('Informe o modelo do notebook.');
      return;
    }

    try {
      await onSave?.(dados);
      handleClose();
    } catch (err) {
      setError(err?.message || 'Erro ao salvar notebook.');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={notebook ? 'Editar Notebook' : 'Novo Notebook'}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Modelo */}
        <div>
          <label
            htmlFor="notebook-modelo"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Modelo do Notebook *
          </label>

          <input
            id="notebook-modelo"
            name="modelo"
            type="text"
            value={formData.modelo}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Ex: Positivo Motion"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Patrimônio */}
        <div>
          <label
            htmlFor="notebook-patrimonio"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Patrimônio
          </label>

          <input
            id="notebook-patrimonio"
            name="patrimonio"
            type="text"
            value={formData.patrimonio}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Ex: 123456"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Localização */}
        <div>
          <label
            htmlFor="notebook-localizacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Localização
          </label>

          <input
            id="notebook-localizacao"
            name="localizacao"
            type="text"
            value={formData.localizacao}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Ex: Sala dos Professores"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Status */}
        <div>
          <label
            htmlFor="notebook-status"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Status
          </label>

          <select
            id="notebook-status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="disponivel">Disponível</option>
            <option value="emprestado">Emprestado</option>
            <option value="manutencao">Manutenção</option>
          </select>
        </div>

        {/* QR Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            QR Code
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={formData.qrCode}
              readOnly
              placeholder="Ainda não gerado"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg bg-gray-50"
            />

            <button
              type="button"
              onClick={handleGenerateQrCode}
              disabled={isLoading}
              className="flex items-center gap-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
            >
              <QrCode size={18} />
              Gerar
            </button>
          </div>
        </div>

        {/* Observação */}
        <div>
          <label
            htmlFor="notebook-observacao"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Observação
          </label>

          <textarea
            id="notebook-observacao"
            name="observacao"
            rows={3}
            value={formData.observacao}
            onChange={handleChange}
            disabled={isLoading}
            placeholder="Ex: Tela com risco..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {error && (
          <div className="p-3 rounded-lg border border-red-200 bg-red-50">
            <p className="text-sm text-red-700">
              {error}
            </p>
          </div>
        )}

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {isLoading
              ? 'Salvando...'
              : notebook
                ? 'Atualizar'
                : 'Cadastrar'}
          </button>
        </div>
      </form>
    </Modal>
  );
}