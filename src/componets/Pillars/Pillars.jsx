import { FaLayerGroup, FaServer, FaDatabase } from "react-icons/fa";
import Reveal from "../../Utils/Reveal";

const PILLARS = [
    {
        icon: FaLayerGroup,
        title: "Interfaces que não travam",
        text: "React e TypeScript com tipagem segura e componentes reutilizáveis, para telas que aguentam mudança de escopo sem virar retrabalho.",
    },
    {
        icon: FaServer,
        title: "APIs prontas pra escalar",
        text: "Back-ends em Java (Spring Boot) e Node.js desenhados para crescer — arquitetura pensada antes da primeira linha de código.",
    },
    {
        icon: FaDatabase,
        title: "Dado modelado, não improvisado",
        text: "Modelagem em PostgreSQL, MySQL e MongoDB, com Docker e Git garantindo ambientes consistentes do dev à produção.",
    },
];

function Pillars() {
    return (
        <section className="py-20 md:py-28">
            <Reveal className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl text-slate-900 dark:text-white md:text-4xl">
                    Engenharia de front a infra, sob a mesma régua
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    Três camadas, um único padrão de qualidade.
                </p>
            </Reveal>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
                {PILLARS.map((pillar, index) => (
                    <Reveal key={pillar.title} delay={index * 0.1}>
                        <div className="h-full rounded-3xl border border-slate-200 bg-white p-8 transition-shadow duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50">
                            <pillar.icon className="text-3xl text-blue-600 dark:text-blue-400" />
                            <h3 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
                                {pillar.title}
                            </h3>
                            <p className="mt-3 text-slate-600 dark:text-slate-400">
                                {pillar.text}
                            </p>
                        </div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default Pillars;
