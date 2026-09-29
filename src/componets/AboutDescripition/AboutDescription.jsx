import { Link } from "react-router-dom";
import Reveal from "../../Utils/Reveal";
import { FORMACAO } from "../../dados/perfil";

/*
 * SOBRE MIM: história + formação.
 * ✏️ O texto de apresentação está em HISTORIA; a formação vem de src/dados/perfil.js.
 * Só afirme o que o currículo e o GitHub comprovam.
 */
const HISTORIA = [
    "Sou de Salvador e cheguei ao desenvolvimento pelo lado de quem resolve problemas em produção. Foram quase dois anos como Analista de Suporte Técnico, investigando falhas em APIs e arquivos XML de sistemas online críticos. Hoje atuo como Analista de Rede, com diagnóstico de incidentes, análise de logs e monitoramento de segurança.",
    "Essa bagagem aparece no meu código: antes de escrever, procuro entender por onde o dado passa e onde ele pode quebrar. Construo back-ends com Java e Spring Boot e front-ends com React e TypeScript, e todos os meus projetos estão abertos no GitHub.",
];

function AboutDescription() {
    return (
        <div className="grid gap-14 py-20 md:grid-cols-5 md:py-28">
            <Reveal className="md:col-span-3">
                <h2 className="font-serif text-3xl md:text-4xl">Quem eu sou</h2>
                {HISTORIA.map((paragrafo) => (
                    <p key={paragrafo.slice(0, 20)} className="mt-6 text-lg leading-relaxed text-oceano/85 dark:text-slate-300">
                        {paragrafo}
                    </p>
                ))}
                <Link
                    to="/"
                    className="mt-8 inline-block font-semibold text-[#22716F] underline decoration-2 underline-offset-4 hover:text-oceano dark:text-[#4FD1C5] dark:hover:text-white"
                >
                    Ver habilidades e trajetória na página inicial ➔
                </Link>
            </Reveal>

            <Reveal delay={0.1} className="md:col-span-2">
                <h2 className="font-serif text-3xl md:text-4xl">Formação</h2>
                <ul className="mt-6 space-y-4">
                    {FORMACAO.map((f) => (
                        <li key={f.curso} className="rounded-3xl border border-areia-escura bg-white/70 p-5 dark:border-white/10 dark:bg-oceano/60">
                            <p className="font-semibold">{f.curso}</p>
                            <p className="mt-1 text-oceano/80 dark:text-slate-300">{f.instituicao}</p>
                            <p className="mt-3 flex flex-wrap items-center gap-2 text-sm text-oceano/75 dark:text-slate-400">
                                {f.periodo}
                                <span
                                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                        f.situacao === "Em andamento"
                                            ? "bg-[#FBD38D] text-oceano"
                                            : "bg-[#22716F] text-white dark:bg-[#4FD1C5] dark:text-oceano"
                                    }`}
                                >
                                    {f.situacao}
                                </span>
                            </p>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </div>
    )
}

export default AboutDescription;
