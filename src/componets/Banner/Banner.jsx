import Reveal from "../../Utils/Reveal";
import Ondas from "../Praia/Ondas";

/*
 * BANNER das páginas internas: o mesmo fim de tarde do topo da página inicial, em versão curta.
 * Props: title (obrigatório) e subtitle (opcional).
 * A prop "image" das versões anteriores não é mais usada; ficou aceita para não quebrar chamadas antigas.
 */
function Banner({ title, subtitle }) {
    return (
        <section
            aria-label={title}
            className="relative isolate flex h-72 items-end overflow-hidden bg-gradient-to-b from-oceano via-[#2C5282] to-[#E9A46A] md:h-80"
        >
            <div className="animate-sol absolute bottom-10 right-[8%] -z-10 h-24 w-24 rounded-full bg-gradient-to-b from-[#F6AD55] to-sol shadow-[0_0_90px_30px_rgba(221,107,32,0.4)] md:h-32 md:w-32" />
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-oceano/85 via-oceano/40 to-transparent" />

            {/* O espaçamento fica num elemento separado: a classe .container do main.css
                redefine o padding e anularia um pb-* aplicado nela. z-10 mantém o texto acima das ondas. */}
            <div className="container relative z-10">
                <Reveal className="pb-24 md:pb-28">
                    <h1 className="font-serif text-4xl text-white md:text-5xl">{title}</h1>
                    {subtitle && <p className="mt-3 max-w-xl text-lg text-slate-100">{subtitle}</p>}
                </Reveal>
            </div>

            <Ondas />
        </section>
    )
}

export default Banner;
