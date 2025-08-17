import { ColorScheme } from "@/app/types/portfolio";

interface LogoProps {
  name: string;
  theme: ColorScheme;
}

export const Logo = ({ name, theme }: LogoProps) => {
  return (
    <a
      href="#"
      className="text-2xl font-bold tracking-tight"
      style={{ color: theme.body }}
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
    >
      {name?.split(" ").map((n, i) => (
        <span key={i} style={{ color: i === 1 ? theme.accent : "inherit" }}>
          {n}
        </span>
      ))}
    </a>
  );
};
