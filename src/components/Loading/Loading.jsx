export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex items-center justify-center">
        <div className="relative">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500 absolute top-0 left-0 opacity-30" style={{ animationDirection: 'reverse' }}></div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">Carregando...</p>
    </div>
  );
}
