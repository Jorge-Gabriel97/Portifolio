import Reveal from "../../Utils/Reveal";
import Rotulo from "./Rotulo";

// Abertura padrão de seção: rótulo opcional, título serifado e um parágrafo de introdução
function TituloSecao({ id, rotulo, titulo, children, className = "" }) {
    return (
        <Reveal className={`max-w-2xl ${className}`}>
            {rotulo && <Rotulo className="mb-3">{rotulo}</Rotulo>}
            <h2 id={id} className="font-serif text-3xl md:text-4xl">
                {titulo}
            </h2>
            {children && <p className="mt-4 text-lg text-oceano/80 dark:text-slate-300">{children}</p>}
        </Reveal>
    );
}

export default TituloSecao;
