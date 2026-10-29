import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { pausarRolagem, retomarRolagem } from "../../Utils/rolagem";

/*
 * FICHA DO PROJETO: o cartão clicado se expande até virar uma janela em tela cheia
 * (mesmo layoutId do cartão), com a ficha técnica no estilo das tabelas do seasats.com.
 * Fecha no ×, no Esc ou clicando fora; o foco volta para o botão que abriu.
 * Os dados vêm da API pública do GitHub (o mesmo objeto "repo" da lista).
 */
const MotionDiv = motion.div;

const DATA = new Intl.DateTimeFormat("pt-BR", { month: "short", year: "numeric" });
const formatarData = (iso) => (iso ? DATA.format(new Date(iso)).replace(".", "") : "—");

function Linha({ rotulo, children }) {
    return (
        <div className="grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)] border-b border-oceano/10 last:border-b-0 dark:border-white/10">
            <dt className="bg-oceano/[0.03] px-4 py-3 font-mono text-[11px] uppercase tracking-wider text-oceano/60 dark:bg-white/[0.03] dark:text-areia/55">
                {rotulo}
            </dt>
            <dd className="px-4 py-3 font-mono text-xs uppercase tracking-wider">{children}</dd>
        </div>
    );
}

function FichaProjeto({ repo, imagem, aoFechar }) {
    const fecharRef = useRef(null);

    useEffect(() => {
        pausarRolagem();
        fecharRef.current?.focus();
        const aoTeclar = (e) => {
            if (e.key === "Escape") aoFechar();
        };
        window.addEventListener("keydown", aoTeclar);
        return () => {
            window.removeEventListener("keydown", aoTeclar);
            retomarRolagem();
        };
    }, [aoFechar]);

    const site = repo.homepage && repo.homepage.startsWith("http") ? repo.homepage : null;

    return createPortal(
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10">
            <MotionDiv
                className="absolute inset-0 bg-oceano-fundo/70 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={aoFechar}
                aria-hidden="true"
            />
            <MotionDiv
                layoutId={`cartao-${repo.id}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={`ficha-${repo.id}`}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative flex max-h-full w-full max-w-4xl flex-col overflow-hidden rounded-3xl bg-areia text-oceano shadow-2xl dark:bg-oceano-fundo dark:text-areia"
            >
                {/* data-lenis-prevent: a rolagem suave da página não "rouba" a rolagem de dentro da ficha */}
                <div data-lenis-prevent className="overflow-y-auto">
                    <div className="relative aspect-[2/1] w-full overflow-hidden bg-areia-escura dark:bg-oceano">
                        <img src={imagem} alt="" className="h-full w-full object-cover" />
                        <button
                            ref={fecharRef}
                            type="button"
                            onClick={aoFechar}
                            className="absolute right-4 top-4 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-oceano/85 text-xl text-white transition hover:bg-oceano focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6AD55]"
                        >
                            <span aria-hidden="true">×</span>
                            <span className="sr-only">Fechar ficha</span>
                        </button>
                    </div>

                    <MotionDiv
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0, transition: { delay: 0.25, duration: 0.4 } }}
                        exit={{ opacity: 0, transition: { duration: 0.1 } }}
                        className="grid gap-8 p-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:p-10"
                    >
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.2em] text-oceano/60 dark:text-areia/55">Ficha técnica</p>
                            <h2 id={`ficha-${repo.id}`} className="mt-2 break-words font-serif text-3xl md:text-4xl">
                                {repo.name}
                            </h2>
                            <p className="mt-4 text-oceano/80 dark:text-slate-300">{repo.description || "Projeto em desenvolvimento."}</p>
                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href={repo.html_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-[#9C4221] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar"
                                >
                                    Ver o código ↗
                                </a>
                                {site && (
                                    <a
                                        href={site}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-full border-2 border-oceano px-6 py-3 font-semibold transition hover:bg-oceano hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mar dark:border-areia dark:hover:bg-areia dark:hover:text-oceano"
                                    >
                                        Abrir o site ↗
                                    </a>
                                )}
                            </div>
                        </div>

                        <dl className="self-start overflow-hidden rounded-2xl border border-oceano/15 dark:border-white/15">
                            <Linha rotulo="Linguagem">{repo.language ?? "—"}</Linha>
                            <Linha rotulo="Tópicos">{repo.topics?.length ? repo.topics.join(" · ") : "—"}</Linha>
                            <Linha rotulo="Criado em">{formatarData(repo.created_at)}</Linha>
                            <Linha rotulo="Última atualização">{formatarData(repo.pushed_at)}</Linha>
                            <Linha rotulo="Estrelas · Forks">
                                {repo.stargazers_count ?? 0} · {repo.forks_count ?? 0}
                            </Linha>
                            <Linha rotulo="Licença">{repo.license?.spdx_id ?? "—"}</Linha>
                        </dl>
                    </MotionDiv>
                </div>
            </MotionDiv>
        </div>,
        document.body,
    );
}

export default FichaProjeto;
