export function Input({
  name,
  type = "text",
  onChange,value,
  placeHolder,
  error,className,
  children,
}) {
  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-2 flex items-center"> {children}</span>
      <input
        name={name}
        type={type} value={value}
        onChange={onChange}
        placeholder={placeHolder} 
        className={`shadow-md focus:outline-none input focus:ring-1 focus:ring-gray-700 border border-gray-800 rounded-md px-2 w-full ${className}`}
      />
      {error && <p className="text-red-800 text-sm mt-1">{error}</p>}
    </div>
  );
}


