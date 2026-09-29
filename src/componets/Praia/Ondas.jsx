/**
 * Ondas animadas para a base de uma seção.
 *
 * Cada camada é um SVG com o dobro da largura da tela, andando meia largura em loop
 * (keyframe "onda" em main.css). Camadas com velocidades diferentes dão profundidade.
 *
 * Props:
 *  - corDaFrente: classe de cor (fill) da onda mais próxima. Use a cor da seção seguinte
 *    para a onda "encaixar" nela. Ex.: "fill-areia dark:fill-oceano-fundo".
 */

// Um período de onda; repetido duas vezes para o loop ficar contínuo
const CAMINHO = 'M0 40 C 120 10, 240 10, 360 40 S 600 70, 720 40 S 960 10, 1080 40 S 1320 70, 1440 40 V100 H0 Z';

function Camada({ className, animacao, deslocamento = 0 }) {
    return (
        <div className={`absolute inset-x-0 bottom-0 w-[200%] ${animacao}`} style={{ left: `${deslocamento}%` }}>
            <svg viewBox="0 0 2880 100" preserveAspectRatio="none" className="h-16 w-full md:h-24" aria-hidden="true">
                <path d={CAMINHO} className={className} />
                <path d={CAMINHO} className={className} transform="translate(1440 0)" />
            </svg>
        </div>
    );
}

function Ondas({ corDaFrente = 'fill-areia dark:fill-oceano-fundo' }) {
    return (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 overflow-hidden md:h-24" aria-hidden="true">
            <Camada className="fill-mar/40" animacao="animate-onda-lenta" deslocamento={-10} />
            <Camada className="fill-mar/60" animacao="animate-onda-rapida" deslocamento={-35} />
            <Camada className={corDaFrente} animacao="animate-onda-lenta" />
        </div>
    );
}

export default Ondas;
