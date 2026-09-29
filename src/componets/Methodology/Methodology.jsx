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
                <h2 className="font-serif text-3xl text-slate-900 dark:text-white md:text-4xl">
                    Como eu trabalho
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    Follow the Data Flow: um método próprio para rastrear cada dado do ponto de origem até a tela, evitando os bugs que nascem de suposição.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {STEPS.map((step, index) => (
                    <Reveal key={step.number} delay={index * 0.1}>
                        <div className="h-full rounded-3xl border border-slate-200 p-8 dark:border-slate-800">
                            <span className="font-serif text-4xl text-blue-600 dark:text-blue-400">{step.number}</span>
                            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                            <p className="mt-3 text-slate-600 dark:text-slate-400">{step.text}</p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Methodology;
