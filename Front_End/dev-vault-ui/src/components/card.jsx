export function Card({ title = "", className = "", children }) {
  return (
    <div className={`card-bg rounded-lg shadow-md w-full max-w-4xl p-4 border border-gray-800 ${className}`}>
      <div className="w-full">
        <h3 className="px-2">{title}</h3>
      </div>

      <div className="p-2">{children}</div>
    </div>
  );
}
