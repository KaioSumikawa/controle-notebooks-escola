import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'controle-notebooks-auth';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] =
    useState(false);
  const [isLoading, setIsLoading] =
    useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(
        STORAGE_KEY
      );

      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);

        setUser(parsedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error(
        'Erro ao recuperar sessão:',
        error
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Login (temporário)
   * Futuramente será substituído pelo Supabase Auth.
   */
  const login = useCallback(
    async (email, password) => {
      setIsLoading(true);

      try {
        if (!email?.trim()) {
          throw new Error(
            'Informe o e-mail.'
          );
        }

        if (!password?.trim()) {
          throw new Error(
            'Informe a senha.'
          );
        }

        // Login provisório
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

        setUser(usuario);
        setIsAuthenticated(true);

        return usuario;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  /**
   * Logout
   */
  const logout = useCallback(async () => {
    localStorage.removeItem(STORAGE_KEY);

    setUser(null);
    setIsAuthenticated(false);
  }, []);

  /**
   * Atualiza os dados do usuário
   */
  const updateUser = useCallback((data) => {
    setUser((prev) => {
      if (!prev) return null;

      const updated = {
        ...prev,
        ...data,
      };

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updated)
      );

      return updated;
    });
  }, []);

  return {
    user,

    isAuthenticated,

    isLoading,

    login,

    logout,

    updateUser,
  };
}