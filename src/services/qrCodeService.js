const gerarCodigo = (numero) =>
  `NB-${String(numero).padStart(3, '0')}`;

export const qrCodeService = {
  /**
   * Gera o QR Code de um notebook
   */
  async generate(notebook) {
    if (!notebook) {
      throw new Error('Notebook não informado.');
    }

    const codigo =
      notebook.qrCode ||
      notebook.id ||
      gerarCodigo(notebook.numero || 1);

    return {
      codigo,
      valor: codigo,
      texto: codigo,
    };
  },

  /**
   * Gera QR Code apenas pelo ID
   */
  async generateById(id) {
    if (!id) {
      throw new Error('ID inválido.');
    }

    return {
      codigo: id,
      valor: id,
      texto: id,
    };
  },

  /**
   * Gera vários QR Codes
   */
  async generateMany(notebooks = []) {
    return notebooks.map((notebook) => ({
      codigo:
        notebook.qrCode ||
        notebook.id ||
        gerarCodigo(notebook.numero || 1),

      valor:
        notebook.qrCode ||
        notebook.id ||
        gerarCodigo(notebook.numero || 1),

      texto:
        notebook.qrCode ||
        notebook.id ||
        gerarCodigo(notebook.numero || 1),

      notebook,
    }));
  },

  /**
   * Valida um QR Code lido
   */
  async validate(codigo) {
    if (!codigo || typeof codigo !== 'string') {
      return false;
    }

    return codigo.startsWith('NB-');
  },

  /**
   * Download (implementação futura)
   */
  async download(id) {
    if (!id) {
      throw new Error('ID inválido.');
    }

    return {
      sucesso: true,
      mensagem: `QR Code ${id} preparado para download.`,
    };
  },

  /**
   * Impressão (implementação futura)
   */
  async print(id) {
    if (!id) {
      throw new Error('ID inválido.');
    }

    return {
      sucesso: true,
      mensagem: `QR Code ${id} enviado para impressão.`,
    };
  },
};