import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AppContext } from "../contexts/Appcontext.jsx";
import Button from '../Button/Button';
import Reveal from '../../Utils/Reveal';

const MotionParagraph = motion.p;

// Repositório "especial" do GitHub (README de perfil) — não é um projeto navegável, então fica fora da vitrine.
const EXCLUDED_REPOS = ["Jorge-Gabriel97"];

// Cases com copy editorial escrita a partir da descrição real de cada repositório.
const FEATURED_CASES = [
    {
        repoName: "Barber-Maneger",
        problem: "Barbearias controlando agenda em papel ou planilha, sem visão em tempo real de quem está atendendo.",
        solution: "Sistema Full Stack com autenticação segura e dashboard em tempo real para gerenciamento dinâmico de agendamentos e operações.",
        stack: ["Java", "Spring Boot"],
    },
    {
        repoName: "Timesend",
        problem: "Rotinas de comunicação repetitivas consumindo tempo que deveria ir para trabalho de verdade.",
        solution: "Aplicação em Python para automação e envio programado de mensagens e rotinas, otimizando comunicação e gestão de tempo.",
        stack: ["Python"],
    },
];

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
            <Reveal className="mx-auto max-w-2xl text-center">
                <h2 className="font-serif text-3xl text-slate-900 dark:text-white md:text-4xl">
                    O que eu já construí
                </h2>
                <p className="mt-4 text-lg text-slate-600 dark:text-slate-400">
                    Projetos reais, do problema ao deploy.
                </p>
            </Reveal>

            {/* Cases em destaque */}
            <div className="mt-14 grid gap-6 md:grid-cols-2">
                {FEATURED_CASES.map((featured, index) => {
                    const repo = repos.find((r) => r.name === featured.repoName);
                    if (!repo) return null;
                    return (
                        <Reveal key={repo.id} delay={index * 0.1}>
                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-shadow duration-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-800/50"
                            >
                                <div className="flex flex-wrap gap-2">
                                    {featured.stack.map((tech) => (
                                        <span
                                            key={tech}
                                            className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/10 dark:text-blue-300"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="mt-5 text-2xl font-semibold text-slate-900 dark:text-white">
                                    {repo.name}
                                </h3>
                                <p className="mt-4 text-slate-600 dark:text-slate-400">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">Problema: </span>
                                    {featured.problem}
                                </p>
                                <p className="mt-3 text-slate-600 dark:text-slate-400">
                                    <span className="font-semibold text-slate-800 dark:text-slate-200">Solução: </span>
                                    {featured.solution}
                                </p>
                                <span className="mt-auto pt-6 font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
                                    Ver repositório ➔
                                </span>
                            </a>
                        </Reveal>
                    );
                })}
            </div>

            {/* Demais repositórios */}
            {loading ? (
                <p className="mt-16 text-center text-slate-500 dark:text-slate-400">Carregando projetos...</p>
            ) : (
                <div className="mt-16 grid items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {otherRepos.slice(0, visibleCount).map((repo) => (
                        <div
                            key={repo.id}
                            className="flex flex-col overflow-hidden rounded-2xl bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md dark:bg-slate-800/50"
                        >
                            <div className="h-40 w-full flex-shrink-0 overflow-hidden rounded-xl bg-slate-200 dark:bg-slate-700">
                                <img
                                    src={`https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}?v=${repo.updated_at}`}
                                    alt=""
                                    loading="lazy"
                                    className="h-full w-full object-cover"
                                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                            </div>

                            <h3 className="mt-4 truncate text-lg font-semibold text-slate-900 dark:text-white">
                                {repo.name}
                            </h3>

                            <button
                                onClick={() => toggleDescription(repo.id)}
                                className="mt-2 w-fit cursor-pointer rounded-md border border-slate-900 px-4 py-1.5 text-sm font-semibold text-slate-900 transition-colors duration-300 hover:bg-slate-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-slate-900"
                            >
                                {expandedRepoId === repo.id ? 'Ocultar detalhes ↑' : 'Ver detalhes ↓'}
                            </button>

                            <AnimatePresence>
                                {expandedRepoId === repo.id && (
                                    <MotionParagraph
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="mt-3 overflow-hidden text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                                    >
                                        {repo.description ? repo.description : "Projeto em desenvolvimento"}
                                    </MotionParagraph>
                                )}
                            </AnimatePresence>

                            <a
                                href={repo.html_url}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-auto pt-4 font-semibold text-blue-600 hover:underline dark:text-blue-400"
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
