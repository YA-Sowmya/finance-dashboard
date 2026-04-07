import { CATEGORIES } from "../../data/categories";

const Badge = ({ category, theme = "light" }) => {
  const cat = CATEGORIES[category];
  if (!cat) return null;

  return (
    <span
      className="text-xs font-medium px-2 py-1 rounded-xl whitespace-nowrap"
      style={{
        background: theme === "dark" ? "transparent" : cat.light,
        color: cat.color,
      }}>
      {category}
    </span>
  );
};

export default Badge;
