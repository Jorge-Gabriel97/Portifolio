import Reveal from "../../Utils/Reveal";
import { EXPERIENCIAS } from "../../dados/perfil";

/*
 * TRAJETÓRIA: experiências como marcos numa trilha à beira-mar.
 * A linha pontilhada é a trilha; cada boia marca uma experiência (a mais recente pulsa).
 * ✏️ Os textos ficam em src/dados/perfil.js.
 */
function Trajetoria() {
    return (
        <section aria-labelledby="titulo-trajetoria" className="py-20 md:py-28">
            <Reveal className="max-w-2xl">
                <h2 id="titulo-trajetoria" className="font-serif text-3xl md:text-4xl">
                    Trajetória
                </h2>
                <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                    Antes de programar profissionalmente, aprendi a investigar sistemas em produção: primeiro no suporte técnico, hoje na área de redes.
                </p>
            </Reveal>

            <ol className="relative mt-12 space-y-10 border-l-4 border-dotted border-areia-escura pl-8 dark:border-white/15 md:ml-4 md:pl-12">
                {EXPERIENCIAS.map((exp, indice) => (
                    <Reveal as="li" key={exp.empresa} delay={indice * 0.1} className="relative">
                        {/* Boia: marco da trilha */}
                        <span
                            className="absolute -left-[46px] top-1 flex h-7 w-7 items-center justify-center rounded-full border-4 border-areia bg-coral dark:border-oceano-fundo md:-left-[62px]"
                            aria-hidden="true"
                        >
                            {indice === 0 && <span className="absolute inset-0 animate-ping rounded-full bg-coral/40 motion-reduce:hidden" />}
                            <span className="h-2 w-2 rounded-full bg-white" />
                        </span>

                        <div className="rounded-3xl border border-areia-escura bg-white/70 p-6 dark:border-white/10 dark:bg-oceano/60 md:p-8">
                            <p className="text-sm font-semibold uppercase tracking-wider text-[#22716F] dark:text-[#4FD1C5]">
                                {exp.periodo}
                            </p>
                            <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                                {exp.cargo} <span className="font-normal text-oceano/70 dark:text-slate-400">· {exp.empresa}</span>
                            </h3>
                            <p className="mt-1 text-sm text-oceano/70 dark:text-slate-400">{exp.local}</p>
                            <ul className="mt-5 space-y-2">
                                {exp.atividades.map((atividade) => (
                                    <li key={atividade} className="flex gap-3 text-oceano/85 dark:text-slate-300">
                                        <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-mar" aria-hidden="true" />
                                        <span>{atividade}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                ))}
            </ol>
        </section>
    );
}

export default Trajetoria;
