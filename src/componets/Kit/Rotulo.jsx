/*
 * Rótulo técnico em fonte monoespaçada, acima de títulos ("01 · SUPERFÍCIE", "ESTUDANDO AGORA").
 * fundo: "auto" segue o tema do site; "claro" ou "escuro" quando a seção tem fundo próprio.
 */
const TONS = {
    auto: "text-oceano/60 dark:text-areia/55",
    claro: "text-oceano/60",
    escuro: "text-areia/55",
};

function Rotulo({ fundo = "auto", className = "", children }) {
    return (
        <p className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${TONS[fundo]} ${className}`}>
            {children}
        </p>
    );
}

export default Rotulo;
