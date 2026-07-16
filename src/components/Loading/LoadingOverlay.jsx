import { LoadingSpinner } from './LoadingSpinner';

export function LoadingOverlay({
  show = false,
  text = 'Carregando...',
}) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl px-8 py-6 flex flex-col items-center gap-4 min-w-[260px]">
        <LoadingSpinner
          size={42}
          text={text}
        />
      </div>
    </div>
  );
}

export default LoadingOverlay;