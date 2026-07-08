## 🧪 Guia de Testes - CRUD de Turmas

Este documento descreve como testar todas as funcionalidades do CRUD de Turmas.

---

## 📋 Pré-requisitos

- ✅ Projeto Supabase criado
- ✅ `DATABASE_SETUP.sql` executado
- ✅ Variáveis de ambiente configuradas (`.env`)
- ✅ Servidor rodando (`npm run dev`)
- ✅ Navegador aberto em `http://localhost:5173/turmas`

---

## 🧪 Testes Funcionais

### **1. Teste: Listar Turmas**

**Pré-requisitos:**
- Página Turmas aberta
- Supabase com dados de exemplo

**Passos:**
1. Acesse `http://localhost:5173/turmas`
2. Observe a página carregando (spinner)
3. Aguarde até 3 segundos

**Esperado:**
- ✅ Tabela mostra 3 turmas (dados de exemplo)
- ✅ Colunas: Nome da Turma, Criada em, Ações
- ✅ Datas formatadas em português (dd/mm/aaaa)
- ✅ Botões "Editar" e "Excluir" em cada linha
- ✅ Botão "Nova Turma" no topo

**Se não funcionar:**
```
❌ Erro de conexão?
   → Verifique .env (URL e chave)
   → Verifique RLS policies no Supabase

❌ Tabela vazia?
   → Execute DATABASE_SETUP.sql novamente
   → Verifique se dados foram inseridos
```

---

### **2. Teste: Criar Turma**

**Pré-requisitos:**
- Página com turmas carregadas
- Supabase ativo

**Passos:**
1. Clique em "Nova Turma"
2. Modal abre com campo "Nome da Turma"
3. Digite: "4º Ano - Turma D"
4. Clique em "Criar"
5. Aguarde 1-2 segundos

**Esperado:**
- ✅ Modal fecha
- ✅ Toast verde aparece: "Turma criada com sucesso!"
- ✅ Nova turma aparece no topo da tabela
- ✅ Todos os campos do modal limpam
- ✅ Botões habilitados novamente

**Teste de Validação:**
1. Clique "Nova Turma"
2. Deixe campo vazio
3. Clique "Criar"
4. Esperado: ❌ Mensagem "Nome da turma é obrigatório"

**Teste de Duplicação:**
1. Clique "Nova Turma"
2. Digite nome que já existe: "1º Ano - Turma A"
3. Clique "Criar"
4. Esperado: ❌ Toast vermelho: "Essa turma já existe"

---

### **3. Teste: Editar Turma**

**Pré-requisitos:**
- Página com turmas carregadas
- Uma turma na lista

**Passos:**
1. Na tabela, clique "Editar" em uma turma
2. Modal abre com nome pré-preenchido
3. Altere para: "1º Ano - Turma A (Modificado)"
4. Clique "Atualizar"
5. Aguarde 1-2 segundos

**Esperado:**
- ✅ Modal fecha
- ✅ Toast verde: "Turma atualizada com sucesso!"
- ✅ Nome na tabela muda em tempo real
- ✅ Botão muda de "Criar" para "Atualizar"

**Teste: Fechar sem Salvar**
1. Clique "Editar"
2. Mude o nome
3. Clique "Cancelar"
4. Esperado: ❌ Modal fecha, mudanças não são salvas

---

### **4. Teste: Deletar Turma (Sem Alunos)**

**Pré-requisitos:**
- Uma turma criada que NÃO tem alunos
- Use a turma "4º Ano - Turma D" criada no teste 2

**Passos:**
1. Na tabela, clique "Excluir" em "4º Ano - Turma D"
2. Modal de confirmação aparece
3. Leia: "Tem certeza que deseja excluir a turma..."
4. Clique "Excluir"
5. Aguarde 1-2 segundos

**Esperado:**
- ✅ Modal de confirmação fecha
- ✅ Toast verde: "Turma excluída com sucesso!"
- ✅ Turma desaparece da tabela
- ✅ Contagem de turmas diminui

**Teste: Cancelar Deleção**
1. Clique "Excluir"
2. Clique "Cancelar"
3. Esperado: ❌ Modal fecha, turma permanece

---

### **5. Teste: Deletar Turma (Com Alunos)**

**Pré-requisitos:**
- Turma que tem alunos vinculados
- Precisa inserir um aluno na turma "1º Ano - Turma A" primeiro

**Passos (Preparação):**
1. No Supabase Console:
   - Abra tabela "alunos"
   - Clique "Insert"
   - Preencha:
     - nome: "João Silva"
     - turma_id: ID da turma "1º Ano - Turma A"
     - ativo: true
   - Clique "Save"

**Passos (Teste):**
1. Volta à página de Turmas
2. Clique "Excluir" em "1º Ano - Turma A"
3. Leia a mensagem no modal

**Esperado:**
- ✅ Modal aparece com aviso
- ✅ Mensagem: "Existem 1 aluno(s) vinculado(s)"
- ✅ Botão "Excluir" permanece desabilitado
- ✅ Clique "Cancelar" para fechar

---

### **6. Teste: Loading States**

**Pré-requisitos:**
- Página Turmas aberta

**Passos:**
1. Clique "Nova Turma"
2. Preencha e clique "Criar"
3. **Observe:**
   - Botão muda para "Salvando..."
   - Botão fica desabilitado
   - Campo de input fica desabilitado

**Esperado:**
- ✅ Todos os inputs/buttons desabilitados durante operação
- ✅ Após salvar, voltam ao normal
- ✅ Mesma coisa em Editar e Deletar

---

### **7. Teste: Mensagens de Erro**

**Teste 1: Erro de Conexão**
1. Desabilite internet
2. Clique "Nova Turma"
3. Preencha e clique "Criar"

**Esperado:**
- ❌ Toast vermelho com erro
- ❌ Modal permanece aberto
- ❌ Pode tentar novamente

**Teste 2: Validação Campo Vazio**
1. Clique "Nova Turma"
2. Deixe nome vazio
3. Clique "Criar"

**Esperado:**
- ❌ Mensagem de erro aparece em vermelho
- ❌ Modal não fecha
- ❌ Pode corrigir e tentar novamente

---

### **8. Teste: Responsividade (Mobile)**

**Pré-requisitos:**
- Abra DevTools (F12)
- Mude para modo móvel (Ctrl+Shift+M)

**Passos:**
1. Observe a página em 375px (mobile)
2. Clique "Nova Turma"
3. Preencha o formulário

**Esperado:**
- ✅ Layout se ajusta
- ✅ Modal fica legível
- ✅ Botões clicáveis
- ✅ Tabela scrollável horizontalmente
- ✅ Tudo funciona em mobile

---

### **9. Teste: Formatação de Data**

**Pré-requisitos:**
- Uma turma na tabela

**Passos:**
1. Observar coluna "Criada em"
2. Veja formato da data

**Esperado:**
- ✅ Formato: "DD/MM/AAAA" (ex: "09/07/2026")
- ✅ Formatado em português
- ✅ Não aparecer hora

---

### **10. Teste: Integração com Sidebar**

**Pré-requisitos:**
- Página Turmas aberta
- Sidebar visível

**Passos:**
1. Observar sidebar esquerda
2. Procurar por "Turmas" no menu
3. Clique em "Turmas"

**Esperado:**
- ✅ Item "Turmas" está no menu
- ✅ Ícone de usuários (Users)
- ✅ Link funciona e leva para página
- ✅ Item fica destacado quando ativo

---

## 🔄 Fluxo Completo de Teste

**Cenário: Gerenciar Turmas da Escola**

```
1. Página abre
   ✅ Vê 3 turmas de exemplo
   
2. Cria "4º Ano"
   ✅ Aparece na lista
   
3. Edita "4º Ano"
   ✅ Muda para "4º Ano - Turma D"
   
4. Tenta deletar "1º Ano"
   ✅ Aviso: tem alunos
   
5. Deleta "4º Ano"
   ✅ Desaparece com sucesso
   
6. Retorna ao dashboard
   ✅ Navbar funciona
```

---

## 🐛 Bugs Comuns

### **Problema: "Variáveis de ambiente não configuradas"**
**Causa:** .env vazio ou não preenchido
**Solução:** 
```bash
# Preencha .env com:
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-publica
```

### **Problema: Tabela vazia com dados no Supabase**
**Causa:** RLS policies bloqueando leitura
**Solução:** Verifique que RLS policies estão criadas

### **Problema: Modal não fecha ao salvar**
**Causa:** Erro não capturado
**Solução:** Abra console (F12) e verifique erro

### **Problema: Botão fica "Salvando..." eternamente**
**Causa:** Conexão lenta ou erro silencioso
**Solução:** Verifique conexão e console do navegador

---

## ✅ Checklist de Testes Completo

### Funcionalidades Básicas
- [ ] Listar turmas
- [ ] Criar turma (válido)
- [ ] Editar turma
- [ ] Deletar turma (sem alunos)
- [ ] Deletar turma bloqueada (com alunos)

### Validações
- [ ] Campo obrigatório (vazio)
- [ ] Duplicação (mesmo nome)
- [ ] Mensagens de erro corretas

### UI/UX
- [ ] Loading states
- [ ] Toast notifications
- [ ] Modal confirmação
- [ ] Modal formulário
- [ ] Empty state (quando vazio)

### Integração
- [ ] Sidebar funciona
- [ ] Rotas funcionam
- [ ] Dados persitem após reload
- [ ] Formatação de data

### Responsividade
- [ ] Desktop (1920px)
- [ ] Tablet (768px)
- [ ] Mobile (375px)

### Erros
- [ ] Sem internet
- [ ] Erro do servidor
- [ ] Validação frontend

---

## 📝 Relatório de Teste (Template)

```
Data: ___/___/______
Navegador: _________
Resolução: _________

✅ Funcionamento Geral: Sim / Não

Testes Executados:
☐ Listar: __________
☐ Criar: ___________
☐ Editar: __________
☐ Deletar: _________
☐ Validações: ______
☐ UI/UX: __________

Bugs Encontrados:
1. _______________
2. _______________

Feedback Geral:
_________________
_________________

Assinado: ____________________
```

---

## 🎯 Resultado Esperado

Após completar TODOS os testes:

✅ CRUD funcionando 100%
✅ Sem bugs críticos
✅ UX clara e intuitiva
✅ Pronto para próxima fase!

---

**Quando terminar os testes, me informe o resultado!** 🚀
