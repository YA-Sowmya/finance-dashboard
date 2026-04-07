const Card = ({ children, className = "", style = {} }) => {
  return (
    <div
      className={`rounded-3xl backdrop-blur-2xl transition-all duration-200 ${className}`}
      style={{
        background: "var(--card-bg)",
        boxShadow: "var(--shadow)",
        ...style,
      }}>
      {children}
    </div>
  );
};

export default Card;
