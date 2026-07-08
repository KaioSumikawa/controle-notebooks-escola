# Configuração do Supabase

Este documento descreve como configurar o banco de dados com Supabase para o sistema de Controle de Notebooks.

## Pré-requisitos

1. Conta no [Supabase](https://supabase.com/)
2. Um projeto criado no Supabase

## Passo 1: Criar o Banco de Dados

### 1.1 Acessar o SQL Editor

1. Faça login no seu projeto Supabase
2. Clique em "SQL Editor" no menu lateral
3. Clique em "New Query"

### 1.2 Executar o Script SQL

1. Copie todo o conteúdo do arquivo `DATABASE_SETUP.sql`
2. Cole no editor SQL do Supabase
3. Clique em "Run" ou pressione `Ctrl+Enter`

O script criará:
- 6 tabelas (usuarios, turmas, alunos, notebooks, emprestimos)
- Índices para performance
- Políticas RLS básicas
- Dados de exemplo

## Passo 2: Configurar Variáveis de Ambiente

### 2.1 Obter as Credenciais

1. No Supabase, clique em "Settings" → "API"
2. Copie:
   - **Project URL** (vai em VITE_SUPABASE_URL)
   - **anon public** key (vai em VITE_SUPABASE_ANON_KEY)

### 2.2 Configurar .env

1. Abra o arquivo `.env` na raiz do projeto
2. Preencha com suas credenciais:

```env
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anonima-aqui
```

**⚠️ Importante:**
- Nunca commite o arquivo `.env` com as chaves
- Use `.env.local` para desenvolvimento local
- Para produção, configure as variáveis no Vercel

## Passo 3: Testar a Conexão

1. Inicie o servidor: `npm run dev`
2. Navegue até a página de Turmas: `http://localhost:5173/turmas`
3. Clique em "Nova Turma" e tente criar uma turma
4. Se funcionar, a conexão está OK!

## Estrutura das Tabelas

### usuarios
- id (UUID) - PK
- nome (VARCHAR)
- email (VARCHAR) - UNIQUE
- tipo (VARCHAR) - 'admin' ou 'professor'
- created_at (TIMESTAMP)

### turmas
- id (UUID) - PK
- nome (VARCHAR) - UNIQUE
- created_at (TIMESTAMP)

### alunos
- id (UUID) - PK
- nome (VARCHAR)
- turma_id (UUID) - FK → turmas.id
- ativo (BOOLEAN)
- created_at (TIMESTAMP)

### notebooks
- id (UUID) - PK
- codigo (VARCHAR) - UNIQUE
- patrimonio (VARCHAR)
- modelo (VARCHAR)
- status (VARCHAR) - 'disponivel', 'emprestado', 'manutencao'
- observacao (TEXT)
- created_at (TIMESTAMP)

### emprestimos
- id (UUID) - PK
- aluno_id (UUID) - FK → alunos.id
- notebook_id (UUID) - FK → notebooks.id
- usuario_id (UUID) - FK → usuarios.id
- data_emprestimo (TIMESTAMP)
- data_devolucao (TIMESTAMP)
- observacao_saida (TEXT)
- observacao_devolucao (TEXT)
- status (VARCHAR) - 'ativo' ou 'finalizado'
- created_at (TIMESTAMP)

## Segurança - Row Level Security (RLS)

As políticas RLS básicas foram criadas permitindo acesso público de leitura e acesso autenticado para escrita/atualização/deleção.

Para produção, recomenda-se:
1. Implementar autenticação adequada
2. Restringir políticas RLS por usuário
3. Usar triggers para auditoria
4. Implementar validações de negócio no backend

## Troubleshooting

### Erro: "Invalid API Key"
- Verifique se as variáveis de ambiente estão corretas
- Confirme que copiou a chave `anon public` e não a `service_role`

### Erro: "Permission denied"
- Verifique as políticas RLS
- Confirme que está usando a chave `anon public` (não `service_role`)

### Erro: "Relation does not exist"
- Execute novamente o script SQL
- Verifique se todas as tabelas foram criadas

## Dados de Exemplo

O script SQL insere automaticamente:
- 2 usuários (admin e professor)
- 3 turmas de exemplo (1º ao 3º ano)

Você pode deletá-los e usar seus próprios dados.

## Próximos Passos

1. ✅ Banco de dados configurado
2. 🔄 Implementar CRUD de Alunos
3. 🔄 Implementar CRUD de Notebooks
4. 🔄 Implementar CRUD de Empréstimos
5. 🔄 Implementar Autenticação real
6. 🔄 Configurar RLS por usuário

## Referências

- [Documentação Supabase](https://supabase.com/docs)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
