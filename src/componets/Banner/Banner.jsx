import Reveal from "../../Utils/Reveal";
import { useRef } from "react";
import Ondas from "../Praia/Ondas";
import PorDoSol from "../Praia/PorDoSol";
import TextoRevelado from "../Kit/TextoRevelado";

/*
 * BANNER das páginas internas: o mesmo fim de tarde do topo da página inicial, em versão curta,
 * com o mesmo pôr do sol que acompanha a rolagem.
 * Props: title (obrigatório) e subtitle (opcional).
 * A prop "image" das versões anteriores não é mais usada; ficou aceita para não quebrar chamadas antigas.
 */
function Banner({ title, subtitle }) {
    const secaoRef = useRef(null);
    return (
        <section
            ref={secaoRef}
            id="inicio"
            aria-label={title}
            className="relative isolate flex h-72 items-end overflow-hidden rounded-t-[40px] bg-gradient-to-b from-oceano via-[#2C5282] to-[#E9A46A] md:h-80"
        >
            <PorDoSol alvoRef={secaoRef} variante="banner" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oceano/85 via-oceano/40 to-transparent" />

            {/* z-10 mantém o texto acima das ondas */}
            <div className="relative z-10 w-full px-6 md:px-16">
                <Reveal className="pb-24 md:pb-28">
                    <TextoRevelado como="h1" texto={title} aoCarregar atraso={0.9} className="font-serif text-4xl text-white md:text-5xl" />
                    {subtitle && <p className="mt-3 max-w-xl text-lg text-slate-100">{subtitle}</p>}
                </Reveal>
            </div>

            <Ondas />
        </section>
    )
}

export default Banner;
