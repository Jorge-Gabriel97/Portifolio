import { useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../contexts/AppContext.js";
import Button from '../Button/Button';
import Reveal from '../../Utils/Reveal';
import TituloSecao from '../Kit/TituloSecao';
import CartaoInclinavel from '../Kit/CartaoInclinavel';
import FichaProjeto from './FichaProjeto';

const MotionDiv = motion.div;

// Prévia gerada pelo próprio GitHub para cada repositório
const imagemDoRepo = (repo) => `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}?v=${repo.updated_at}`;

// Repositório "especial" do GitHub (README de perfil): não é um projeto, fica fora da vitrine.
const EXCLUDED_REPOS = ["Jorge-Gabriel97"];

/*
 * ✏️ CASES EM DESTAQUE
 * Texto escrito a partir do README e do código de cada repositório. Não prometa o que o código não faz,
 * e só inclua métricas de impacto se forem reais e verificáveis.
 */
const FEATURED_CASES = [
    {
        repoName: "ControllerEstoque",
        problem: "Um negócio precisa saber o que entra e o que sai do estoque, de quem compra e para quem vende, sem depender de planilhas soltas.",
        solution: "Sistema web com Spring Boot, Spring Security, Thymeleaf e MySQL: cadastro de produtos, clientes e fornecedores, e controle de estoque por notas de entrada e saída, organizado em camadas.",
        stack: ["Java", "Spring Boot", "Spring Security", "Thymeleaf", "MySQL"],
    },
];

function ProjetcsList() {
    const { repos, loading } = useContext(AppContext);
    const [visibleCount, setVisibleCount] = useState(8);
    const [fichaAberta, setFichaAberta] = useState(null);

    const featuredNames = FEATURED_CASES.map((c) => c.repoName);
    const otherRepos = repos.filter(
        (repo) => !EXCLUDED_REPOS.includes(repo.name) && !featuredNames.includes(repo.name)
    );

    const showMoreProjects = () => setVisibleCount((count) => count + 8);
    const repoDaFicha = repos.find((r) => r.id === fichaAberta);

    // Ao fechar a ficha, o foco volta para o botão que a abriu
    const fecharFicha = useCallback(() => {
        const id = fichaAberta;
        setFichaAberta(null);
        setTimeout(() => document.querySelector(`[data-ficha="${id}"]`)?.focus(), 60);
    }, [fichaAberta]);

    return (
        <div id="projetos" className="scroll-mt-20 py-20 md:py-28">
            <TituloSecao titulo="O que eu já construí">
                Projetos de estudo e de uso real, com o código aberto no GitHub.
            </TituloSecao>

            {/* Case em destaque */}
            <div id="destaque" className="mt-12 grid scroll-mt-24 gap-6">
                {FEATURED_CASES.map((featured, index) => {
                    const repo = repos.find((r) => r.name === featured.repoName);
                    if (!repo) return null;
                    return (
                        <Reveal key={repo.id} delay={index * 0.1}>
                            <CartaoInclinavel intensidade={3} className="rounded-3xl">
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className={`cartao group grid h-full gap-8 p-8 transition-shadow duration-300 hover:shadow-lg md:grid-cols-5 md:p-10`}
                            >
                                <div className="md:col-span-2">
                                    <p className="text-sm font-semibold uppercase tracking-wider text-[#9C4221] dark:text-[#FBD38D]">Em destaque</p>
                                    <h3 className="mt-3 font-serif text-3xl">{repo.name}</h3>
                                    <ul className="mt-5 flex flex-wrap gap-2">
                                        {featured.stack.map((tech) => (
                                            <li
                                                key={tech}
                                                className="rounded-full bg-[#22716F]/10 px-3 py-1 text-xs font-semibold text-[#22716F] dark:bg-[#4FD1C5]/15 dark:text-[#4FD1C5]"
                                            >
                                                {tech}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="md:col-span-3">
                                    <p className="text-oceano/85 dark:text-slate-300">
                                        <span className="font-semibold text-oceano dark:text-white">Problema: </span>
                                        {featured.problem}
                                    </p>
                                    <p className="mt-4 text-oceano/85 dark:text-slate-300">
                                        <span className="font-semibold text-oceano dark:text-white">Solução: </span>
                                        {featured.solution}
                                    </p>
                                    <span className="mt-6 inline-block font-semibold text-[#22716F] group-hover:underline dark:text-[#4FD1C5]">
                                        Ver repositório ➔
                                    </span>
                                </div>
                            </a>
                            </CartaoInclinavel>
                        </Reveal>
                    );
                })}
            </div>

            {/* Demais repositórios */}
            {loading ? (
                <p className="mt-16 text-center text-oceano/75 dark:text-slate-400">Carregando projetos...</p>
            ) : (
                <div id="repositorios" className="mt-12 grid scroll-mt-24 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {otherRepos.slice(0, visibleCount).map((repo) => (
                        // Mesmo layoutId da ficha: ao abrir, este cartão "cresce" até virar a janela.
                        // Enquanto a ficha está aberta, o cartão fica invisível guardando o lugar.
                        <MotionDiv
                            key={repo.id}
                            layoutId={`cartao-${repo.id}`}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className={`rounded-3xl ${fichaAberta === repo.id ? "invisible" : ""}`}
                        >
                            <CartaoInclinavel className="rounded-3xl">
                                <div className="cartao flex h-full flex-col overflow-hidden p-5 transition-shadow duration-300 hover:shadow-lg">
                                    <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-areia-escura dark:bg-oceano">
                                        <img
                                            src={imagemDoRepo(repo)}
                                            alt=""
                                            loading="lazy"
                                            className="h-full w-full object-cover"
                                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                        />
                                    </div>

                                    <h3 className="mt-4 truncate text-lg font-semibold">{repo.name}</h3>
                                    <p className="mt-1 line-clamp-2 text-sm text-oceano/75 dark:text-slate-300">
                                        {repo.description || "Projeto em desenvolvimento"}
                                    </p>

                                    <div className="mt-auto flex items-center justify-between gap-3 pt-5">
                                        <button
                                            type="button"
                                            data-ficha={repo.id}
                                            onClick={() => setFichaAberta(repo.id)}
                                            className="cursor-pointer rounded-full border border-oceano/40 px-4 py-1.5 text-sm font-semibold transition-colors duration-300 hover:bg-oceano hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-mar dark:border-white/40 dark:hover:bg-areia dark:hover:text-oceano"
                                        >
                                            Ficha técnica +
                                        </button>
                                        <a
                                            href={repo.html_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-sm font-semibold text-[#22716F] hover:underline dark:text-[#4FD1C5]"
                                        >
                                            GitHub ↗
                                        </a>
                                    </div>
                                </div>
                            </CartaoInclinavel>
                        </MotionDiv>
                    ))}
                </div>
            )}

            {!loading && visibleCount < otherRepos.length && (
                <div className="mt-12 flex justify-center">
                    <Button buttonStyle="primary" onClick={showMoreProjects}>
                        Ver mais projetos
                    </Button>
                </div>
            )}
            <AnimatePresence>
                {repoDaFicha && (
                    <FichaProjeto key={repoDaFicha.id} repo={repoDaFicha} imagem={imagemDoRepo(repoDaFicha)} aoFechar={fecharFicha} />
                )}
            </AnimatePresence>
        </div>
    );
}

export default ProjetcsList;
