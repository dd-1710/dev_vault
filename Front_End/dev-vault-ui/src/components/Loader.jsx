export function Loader({ message = "Loading...", fullScreen = false }) {
  return (
    <div
      className={`${fullScreen ? "fixed inset-0 z-60 bg-gray-950/80" : "w-full"} flex items-center justify-center p-6`}
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3 rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 text-sm text-gray-200 shadow-lg">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-600 border-t-indigo-400" />
        <span>{message}</span>
      </div>
    </div>
  );
}