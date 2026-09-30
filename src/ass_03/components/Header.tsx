import { Header as PageHeader } from "../../components/Header"
import { Section } from "../../components/Section"

interface HeaderProps {
  title: string;
  subtitle: string;
  backHref: string;
}

export const Header = ({ title, subtitle, backHref }: HeaderProps) => {
  return (
    <>
      <PageHeader />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", paddingTop: 16 }}>
          <h2>{title}</h2>
          <p>{subtitle}</p>
        </div>
        <div>
          <p>
            <a href={backHref} className="text-underline">All assignments</a>
            &nbsp;/&nbsp;Assignment 3
          </p>
        </div>
      </Section>
    </>
  )
}
