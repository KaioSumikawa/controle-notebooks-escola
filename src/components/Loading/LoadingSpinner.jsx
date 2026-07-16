import { LoaderCircle } from 'lucide-react';

export function LoadingSpinner({
  size = 24,
  text = '',
  className = '',
}) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 ${className}`}
    >
      <LoaderCircle
        size={size}
        className="animate-spin text-blue-600"
      />

      {text && (
        <p className="text-sm text-gray-600">
          {text}
        </p>
      )}
    </div>
  );
}

export default LoadingSpinner;