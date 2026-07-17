import { useCallback, useState } from 'react';

export function useToast() {
  const [toasts, setToasts] = useState([]);


  const removeToast = useCallback((id) => {
    setToasts((prev) =>
      prev.filter(
        (toast) => toast.id !== id
      )
    );
  }, []);


  const addToast = useCallback(
    ({
      type = 'success',
      title,
      message,
      duration = 3000,
    }) => {
      const id = Date.now();


      const newToast = {
        id,
        type,
        title,
        message,
      };


      setToasts((prev) => [
        ...prev,
        newToast,
      ]);


      if (duration) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );


  const success = useCallback(
    (message, title = 'Sucesso') => {
      addToast({
        type: 'success',
        title,
        message,
      });
    },
    [addToast]
  );


  const error = useCallback(
    (message, title = 'Erro') => {
      addToast({
        type: 'error',
        title,
        message,
      });
    },
    [addToast]
  );


  const warning = useCallback(
    (message, title = 'Atenção') => {
      addToast({
        type: 'warning',
        title,
        message,
      });
    },
    [addToast]
  );


  const info = useCallback(
    (message, title = 'Informação') => {
      addToast({
        type: 'info',
        title,
        message,
      });
    },
    [addToast]
  );


  return {
    toasts,
    addToast,
    removeToast,
    success,
    error,
    warning,
    info,
  };
}