const Button = ({
  children,
  onClick,
  variant = "primary",
  className = "",
  disabled = false,
}) => {
  const base =
    "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

  const variants = {
    primary: "bg-[var(--text-primary)] hover:bg-violet-400 text-white",
    secondary:
      "bg-white/20 hover:bg-violet-200 backdrop-blur-sm border border-white/30 text-[var(--text-primary)]",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
