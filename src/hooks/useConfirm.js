import { useState, useCallback } from 'react';

export function useConfirm() {
  const [confirmState, setConfirmState] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    danger: false,
  });


  const [resolvePromise, setResolvePromise] = useState(null);


  const confirm = useCallback(
    ({
      title = 'Confirmar ação',
      message = 'Tem certeza que deseja continuar?',
      confirmText = 'Confirmar',
      cancelText = 'Cancelar',
      danger = false,
    }) => {
      return new Promise((resolve) => {

        setResolvePromise(() => resolve);


        setConfirmState({
          isOpen: true,
          title,
          message,
          confirmText,
          cancelText,
          danger,
        });

      });
    },
    []
  );


  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(true);
    }

    setConfirmState((prev) => ({
      ...prev,
      isOpen: false,
    }));

    setResolvePromise(null);

  }, [resolvePromise]);


  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(false);
    }

    setConfirmState((prev) => ({
      ...prev,
      isOpen: false,
    }));

    setResolvePromise(null);

  }, [resolvePromise]);


  return {
    confirm,
    confirmState,
    handleConfirm,
    handleCancel,
  };
}