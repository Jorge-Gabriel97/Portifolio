import Reveal from "../../Utils/Reveal";
import TituloSecao from "../Kit/TituloSecao";

const STEPS = [
    {
        number: "01",
        title: "Mapear o dado",
        text: "Antes de escrever código, rastreio de onde a informação vem e para onde ela precisa ir — API, banco, tela. É a base do método que uso em todo projeto: Follow the Data Flow.",
    },
    {
        number: "02",
        title: "Transformar com Clean Code",
        text: "Implemento a lógica com padrões consistentes e componentes reutilizáveis, pensando em quem vai dar manutenção nisso depois — inclusive eu mesmo.",
    },
    {
        number: "03",
        title: "Validar em produção",
        text: "Testo o fluxo completo, não só o ambiente local. Um recurso só está pronto quando funciona do jeito que o usuário real vai usar.",
    },
];

function Methodology() {
    return (
        <section className="py-20 md:py-28">
            <TituloSecao titulo="Como eu trabalho">
                Aplico o Follow the Data Flow, método que aprendi nos estudos: rastrear cada dado do ponto de origem até a tela, evitando os bugs que nascem de suposição.
            </TituloSecao>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {STEPS.map((step, index) => (
                    <Reveal key={step.number} delay={index * 0.1}>
                        <div className="cartao h-full p-8">
                            <span className="font-serif text-4xl text-coral dark:text-[#FBD38D]">{step.number}</span>
                            <h3 className="mt-4 text-xl font-semibold ">{step.title}</h3>
                            <p className="mt-3 text-oceano/80 dark:text-slate-300">{step.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Methodology;
