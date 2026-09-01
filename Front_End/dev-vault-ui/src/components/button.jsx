export function Button({
  type = "button",
  onClick,
  children,
  className = "",
  disabled = false,
}) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      type={type}
      disabled={disabled}
      className={`rounded-md px-3 py-2 text-white bg-gray-950 cursor-pointer mb-2 hover:bg-gray-800 transition-colors disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-950 ${className}`}
    >
      {children}
    </button>
  );
}