import { motion } from "framer-motion";

/*
 * FILTRO DO PORTO: uma boia por linguagem; a boia acesa desliza até o filtro escolhido.
 * Os grupos de linguagem saem de filtros.js.
 */
const MotionSpan = motion.span;

function FiltroPorto({ filtros, ativo, aoEscolher }) {
    return (
        <div role="group" aria-label="Filtrar projetos por linguagem" className="flex flex-wrap gap-2">
            {filtros.map(({ nome, total }) => {
                const selecionado = nome === ativo;
                return (
                    <button
                        key={nome}
                        type="button"
                        aria-pressed={selecionado}
                        onClick={() => aoEscolher(nome)}
                        className={`relative cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar ${
                            selecionado
                                ? "border-transparent text-white"
                                : "border-oceano/25 text-oceano hover:border-oceano/60 dark:border-white/25 dark:text-areia dark:hover:border-white/60"
                        }`}
                    >
                        {selecionado && (
                            <MotionSpan
                                layoutId="boia-filtro"
                                className="absolute inset-0 rounded-full bg-oceano shadow-[0_6px_18px_-6px_rgba(26,54,93,0.6)] dark:bg-mar"
                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                aria-hidden="true"
                            />
                        )}
                        <span className="relative">
                            {nome} <span className={selecionado ? "text-white/70" : "text-oceano/50 dark:text-areia/50"}>{total}</span>
                        </span>
                    </button>
                );
            })}
        </div>
    );
}

export default FiltroPorto;
