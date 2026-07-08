-- Script de criação das tabelas do Controle de Notebooks
-- Execute no Supabase SQL Editor

-- Tabela: usuarios
CREATE TABLE usuarios (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('admin', 'professor')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: turmas
CREATE TABLE turmas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: alunos
CREATE TABLE alunos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome VARCHAR(255) NOT NULL,
  turma_id UUID NOT NULL,
  ativo BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (turma_id) REFERENCES turmas(id) ON DELETE CASCADE
);

-- Tabela: notebooks
CREATE TABLE notebooks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo VARCHAR(50) NOT NULL UNIQUE,
  patrimonio VARCHAR(100),
  modelo VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'disponivel' 
    CHECK (status IN ('disponivel', 'emprestado', 'manutencao')),
  observacao TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela: emprestimos
CREATE TABLE emprestimos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  aluno_id UUID NOT NULL,
  notebook_id UUID NOT NULL,
  usuario_id UUID NOT NULL,
  data_emprestimo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  data_devolucao TIMESTAMP,
  observacao_saida TEXT,
  observacao_devolucao TEXT,
  status VARCHAR(50) NOT NULL DEFAULT 'ativo' 
    CHECK (status IN ('ativo', 'finalizado')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (aluno_id) REFERENCES alunos(id) ON DELETE CASCADE,
  FOREIGN KEY (notebook_id) REFERENCES notebooks(id) ON DELETE CASCADE,
  FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Índices para performance
CREATE INDEX idx_alunos_turma_id ON alunos(turma_id);
CREATE INDEX idx_emprestimos_aluno_id ON emprestimos(aluno_id);
CREATE INDEX idx_emprestimos_notebook_id ON emprestimos(notebook_id);
CREATE INDEX idx_emprestimos_usuario_id ON emprestimos(usuario_id);
CREATE INDEX idx_emprestimos_status ON emprestimos(status);
CREATE INDEX idx_notebooks_status ON notebooks(status);

-- Permissões RLS (Row Level Security) - Básicas
-- Substitua 'seu_id_de_usuario' pelo ID real do seu usuário
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE turmas ENABLE ROW LEVEL SECURITY;
ALTER TABLE alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE notebooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE emprestimos ENABLE ROW LEVEL SECURITY;

-- Policies permissivas (você pode ajustar de acordo com sua segurança)
CREATE POLICY "Allow public read turmas" ON turmas FOR SELECT USING (true);
CREATE POLICY "Allow authenticated create turmas" ON turmas FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update turmas" ON turmas FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete turmas" ON turmas FOR DELETE USING (true);

CREATE POLICY "Allow public read alunos" ON alunos FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert alunos" ON alunos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update alunos" ON alunos FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete alunos" ON alunos FOR DELETE USING (true);

CREATE POLICY "Allow public read notebooks" ON notebooks FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert notebooks" ON notebooks FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update notebooks" ON notebooks FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete notebooks" ON notebooks FOR DELETE USING (true);

CREATE POLICY "Allow public read emprestimos" ON emprestimos FOR SELECT USING (true);
CREATE POLICY "Allow authenticated insert emprestimos" ON emprestimos FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow authenticated update emprestimos" ON emprestimos FOR UPDATE USING (true);
CREATE POLICY "Allow authenticated delete emprestimos" ON emprestimos FOR DELETE USING (true);

-- Inserir usuário de exemplo
INSERT INTO usuarios (nome, email, tipo) VALUES 
  ('Admin Escola', 'admin@escola.edu.br', 'admin'),
  ('Professor Demo', 'professor@escola.edu.br', 'professor');

-- Inserir turmas de exemplo
INSERT INTO turmas (nome) VALUES 
  ('1º Ano - Turma A'),
  ('2º Ano - Turma B'),
  ('3º Ano - Turma C');
