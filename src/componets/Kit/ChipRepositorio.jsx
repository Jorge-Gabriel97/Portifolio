import { GITHUB } from "../Habilidades/dadosHabilidades";

// Link para um repositório do GitHub, no formato de etiqueta técnica
const TONS = {
    auto: "border-oceano/20 text-oceano/75 hover:border-coral hover:text-coral focus-visible:outline-coral dark:border-white/20 dark:text-areia/75 dark:hover:border-[#F6AD55] dark:hover:text-[#F6AD55] dark:focus-visible:outline-[#F6AD55]",
    claro: "border-oceano/20 text-oceano/75 hover:border-coral hover:text-coral focus-visible:outline-coral",
    escuro: "border-white/20 text-areia/75 hover:border-[#F6AD55] hover:text-[#F6AD55] focus-visible:outline-[#F6AD55]",
};

function ChipRepositorio({ repo, fundo = "auto" }) {
    return (
        <a
            href={`${GITHUB}/${repo}`}
            target="_blank"
            rel="noreferrer"
            className={`inline-block rounded border px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider transition focus-visible:outline focus-visible:outline-2 ${TONS[fundo]}`}
        >
            {repo} ↗
        </a>
    );
}

export default ChipRepositorio;
