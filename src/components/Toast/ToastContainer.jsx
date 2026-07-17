import { Toast } from './Toast';

export function ToastContainer({
  toasts = [],
  removeToast,
}) {
  return (
    <div
      className="
        fixed
        top-6
        right-6
        z-[9999]
        flex
        flex-col
        gap-4
        w-full
        max-w-sm
        px-4
        md:px-0
        pointer-events-none
      "
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto"
        >
          <Toast
            type={toast.type}
            title={toast.title}
            message={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        </div>
      ))}
    </div>
  );
}