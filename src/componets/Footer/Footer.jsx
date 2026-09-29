import { Link } from "react-router-dom";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import Logo from "../../assets/foto-jorge.jpg";
import Ondas from "../Praia/Ondas";
import { CONTATO } from "../../dados/perfil";

const PAGINAS = [
    { to: "/", label: "Início" },
    { to: "/about", label: "Sobre mim" },
    { to: "/projects", label: "Projetos" },
    { to: "/contact", label: "Contato" },
];

const REDES = [
    { href: CONTATO.linkedin, label: "LinkedIn", icone: FaLinkedin },
    { href: CONTATO.github, label: "GitHub", icone: FaGithub },
    { href: `mailto:${CONTATO.email}`, label: "E-mail", icone: FaEnvelope },
];

const linkClasse = "text-slate-200 transition-colors hover:text-[#FBD38D] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#FBD38D]";

/*
 * RODAPÉ: a página "termina no mar". As ondas no topo saem da areia e viram o fundo azul do rodapé.
 */
function Footer() {
    return (
        <footer className="mt-10">
            {/* Faixa de ondas: a onda da frente tem a cor do rodapé */}
            <div className="relative h-16 md:h-24" aria-hidden="true">
                <Ondas corDaFrente="fill-oceano" />
            </div>

            <div className="bg-oceano pb-10 pt-8 text-slate-200">
                <div className="container">
                    <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                        <div className="flex max-w-sm flex-col gap-5">
                            <img src={Logo} alt="Foto de Jorge Gabriel" className="h-14 w-14 rounded-full object-cover" />
                            <p className="font-serif text-2xl text-white">Vamos construir algo juntos sob o sol?</p>
                            <p>Desenvolvedor Full Stack em Salvador, BA.</p>
                            <ul className="flex gap-4">
                                {REDES.map(({ href, label, icone }) => {
                                    const Icone = icone;
                                    return (
                                    <li key={label}>
                                        <a
                                            href={href}
                                            target={href.startsWith("mailto:") ? undefined : "_blank"}
                                            rel="noopener noreferrer"
                                            aria-label={label}
                                            className={`${linkClasse} inline-block transition-transform hover:-translate-y-1`}
                                        >
                                            <Icone size={28} aria-hidden="true" />
                                        </a>
                                    </li>
                                    );
                                })}
                            </ul>
                        </div>

                        <nav aria-label="Páginas">
                            <h3 className="mb-5 font-semibold text-white">Páginas</h3>
                            <ul className="flex flex-col gap-3">
                                {PAGINAS.map((p) => (
                                    <li key={p.to}>
                                        <Link to={p.to} className={linkClasse}>
                                            {p.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div>
                            <h3 className="mb-5 font-semibold text-white">Contato</h3>
                            <a href={`mailto:${CONTATO.email}`} className={linkClasse}>
                                {CONTATO.email}
                            </a>
                        </div>
                    </div>

                    <div className="mt-14 border-t border-white/15 pt-6">
                        <p className="text-sm text-slate-300">
                            © {new Date().getFullYear()} Jorge Gabriel. Feito em Salvador, com React e Tailwind CSS.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
