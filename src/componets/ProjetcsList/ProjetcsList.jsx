import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../contexts/Appcontext.jsx";
import Button from '../Button/Button';
import Reveal from '../../Utils/Reveal';

const MotionParagraph = motion.p;

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

const cardClasse = "rounded-3xl border border-areia-escura bg-white/70 dark:border-white/10 dark:bg-oceano/60";

function ProjetcsList() {
    const { repos, loading } = useContext(AppContext);
    const [visibleCount, setVisibleCount] = useState(8);
    const [expandedRepoId, setExpandedRepoId] = useState(null);

    const featuredNames = FEATURED_CASES.map((c) => c.repoName);
    const otherRepos = repos.filter(
        (repo) => !EXCLUDED_REPOS.includes(repo.name) && !featuredNames.includes(repo.name)
    );

    const showMoreProjects = () => setVisibleCount((count) => count + 8);
    const toggleDescription = (id) => setExpandedRepoId((current) => (current === id ? null : id));

    return (
        <div className="py-20 md:py-28">
            <Reveal className="max-w-2xl">
                <h2 className="font-serif text-3xl md:text-4xl">
                    O que eu já construí
                </h2>
                <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">
                    Projetos de estudo e de uso real, com o código aberto no GitHub.
                </p>
            </Reveal>

            {/* Case em destaque */}
            <div className="mt-12 grid gap-6">
                {FEATURED_CASES.map((featured, index) => {
                    const repo = repos.find((r) => r.name === featured.repoName);
                    if (!repo) return null;
                    return (
                        <Reveal key={repo.id} delay={index * 0.1}>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className={`${cardClasse} group grid h-full gap-8 p-8 transition-shadow duration-300 hover:shadow-lg md:grid-cols-5 md:p-10`}
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
                        </Reveal>
                    );
                })}
            </div>

            {/* Demais repositórios */}
            {loading ? (
                <p className="mt-16 text-center text-oceano/75 dark:text-slate-400">Carregando projetos...</p>
            ) : (
                <div className="mt-12 grid items-start gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {otherRepos.slice(0, visibleCount).map((repo) => (
                        <div key={repo.id} className={`${cardClasse} flex flex-col overflow-hidden p-5 transition-shadow duration-300 hover:shadow-md`}>
                            <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-areia-escura dark:bg-oceano">
                                <img
                                    src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}?v=${repo.updated_at}`}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>

                            <h3 className="mt-4 truncate text-lg font-semibold">
                                {repo.name}
                            </h3>

                            <button
                                onClick={() => toggleDescription(repo.id)}
                                aria-expanded={expandedRepoId === repo.id}
                                className="mt-2 w-fit cursor-pointer rounded-full border border-oceano/40 px-4 py-1.5 text-sm font-semibold transition-colors duration-300 hover:bg-oceano hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-mar dark:border-white/40 dark:hover:bg-areia dark:hover:text-oceano"
                            >
                                {expandedRepoId === repo.id ? 'Ocultar detalhes ↑' : 'Ver detalhes ↓'}
                            </button>

                            <AnimatePresence>
                                {expandedRepoId === repo.id && (
                                    <MotionParagraph
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 overflow-hidden text-sm leading-relaxed text-oceano/85 dark:text-slate-300"
                                    >
                                        {repo.description ? repo.description : "Projeto em desenvolvimento"}
                                    </MotionParagraph>
                                )}
                            </AnimatePresence>

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-auto pt-4 font-semibold text-[#22716F] hover:underline dark:text-[#4FD1C5]"
                            >
                                Ver repositório ➔
                            </a>
                        </div>
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
        </div>
    );
}

export default ProjetcsList;
