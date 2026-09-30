import { Footer as PageFooter } from "../../components/Footer";
import { Title } from "../../components/Title";

interface FooterProps {
  year: number;
  author: string;
}

export const Footer = ({ year, author }: FooterProps) => {
  return (
    <PageFooter>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <p style={{ transform: "translateY(2px)" }}>&#169;</p>
        <Title>{year}&nbsp;{author}</Title>
      </div>
    </PageFooter>
  );
};
