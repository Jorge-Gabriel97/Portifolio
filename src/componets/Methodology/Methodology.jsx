import Reveal from "../../Utils/Reveal";

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
            <Reveal className="max-w-2xl">
                <h2 className="font-serif text-3xl  md:text-4xl">
                    Como eu trabalho
                </h2>
                <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                    Aplico o Follow the Data Flow, método que aprendi nos estudos: rastrear cada dado do ponto de origem até a tela, evitando os bugs que nascem de suposição.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {STEPS.map((step, index) => (
                    <Reveal key={step.number} delay={index * 0.1}>
                        <div className="h-full rounded-3xl border border-areia-escura bg-white/70 p-8 dark:border-white/10 dark:bg-oceano/60">
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
