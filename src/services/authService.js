import {
  supabase,
  isSupabaseConfigured,
} from './supabase';

const STORAGE_KEY = 'controle-notebooks-auth';

export const authService = {
  /**
   * Login
   */
  async login(email, password) {
    if (!email?.trim()) {
      throw new Error('Informe o e-mail.');
    }

    if (!password?.trim()) {
      throw new Error('Informe a senha.');
    }

    // Futuramente utilizará o Supabase Auth
    if (isSupabaseConfigured) {
      const { data, error } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (error) {
        throw error;
      }

      return data.user;
    }

    // Login local (desenvolvimento)
    const usuario = {
      id: 'ADMIN-001',
      nome: 'Administrador',
      email: email.trim(),
      role: 'admin',
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(usuario)
    );

    return usuario;
  },

  /**
   * Logout
   */
  async logout() {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }

    localStorage.removeItem(STORAGE_KEY);

    return true;
  },

  /**
   * Usuário logado
   */
  async getCurrentUser() {
    if (isSupabaseConfigured) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      return user;
    }

    const user = localStorage.getItem(
      STORAGE_KEY
    );

    return user ? JSON.parse(user) : null;
  },

  /**
   * Verifica autenticação
   */
  async isAuthenticated() {
    const user =
      await this.getCurrentUser();

    return !!user;
  },

  /**
   * Atualiza usuário
   */
  async updateUser(data) {
    if (isSupabaseConfigured) {
      const { data: response, error } =
        await supabase.auth.updateUser(data);

      if (error) {
        throw error;
      }

      return response.user;
    }

    const atual = await this.getCurrentUser();

    if (!atual) {
      throw new Error(
        'Usuário não autenticado.'
      );
    }

    const atualizado = {
      ...atual,
      ...data,
    };

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(atualizado)
    );

    return atualizado;
  },

  /**
   * Cadastro de usuário
   */
  async register({
    nome,
    email,
    password,
    role = 'professor',
  }) {
    if (!email?.trim()) {
      throw new Error('Informe o e-mail.');
    }

    if (!password?.trim()) {
      throw new Error('Informe a senha.');
    }

    if (isSupabaseConfigured) {
      const { data, error } =
        await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              nome,
              role,
            },
          },
        });

      if (error) {
        throw error;
      }

      return data.user;
    }

    // Simulação em ambiente local
    return {
      id: `USER-${Date.now()}`,
      nome,
      email,
      role,
    };
  },
};