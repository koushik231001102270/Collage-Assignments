import { Card } from "./components/CardItem"
import { Header } from "./components/Header"
import { Container } from "./components/Container"
import { Section } from "./components/Section"
import { Title } from "./components/Title"
import assData from "./ass.json"
import { Footer } from "./components/Footer"

function App() {

  return (
    <Container>
      <Header />
      <Section>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexDirection: "column", paddingTop: 16 }}>
            <h2>
              Koushik Chatterjee
            </h2>
            <p>
              TIU
            </p>
          </div>
        </div>
        <div>
          <p>I build the project using&nbsp;
            <a href="https://v3.vitejs.dev/" className="text-underline">Vite</a> as it was instructed.
          </p>
        </div>
      </Section>
      <Section style={{ gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <Title style={{ marginTop: 16 }}>
            Assignment
          </Title>
        </div>
        <Card.Container>
          {Object.entries(assData).map(([id, card]) => (
            <Card
              key={id}
              title={card.title}
              subtitle={card.subtitle}
              role={card.role}
              href={card.href}
            />
          ))}
        </Card.Container>
      </Section>
      <Footer>
        <div style={{
          "display": "flex",alignItems: "center",gap: "8px"
        }}>
          <p style={{transform: "translateY(2px)"}}>&#169;</p>
          <Title>2026&nbsp;Koushik</Title>
        </div>
      </Footer>
    </Container>
  )
}

export default App