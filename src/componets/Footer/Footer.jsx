import { Link } from "react-router-dom";
import LinkedinIcon from "../../assets/Linkedin.svg";
import Logo from "../../assets/Logo.png";

function Footer() {
    return (
        <footer className="border-t border-slate-200 bg-slate-50 py-16 transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900">
            <div className="container">
                <div className="flex flex-col gap-10 md:flex-row md:justify-between">
                    <div className="flex max-w-sm flex-col gap-5">
                        <img src={Logo} alt="Logo Jorge Gabriel" className="h-14 w-14 rounded-full object-cover" />
                        <p className="text-slate-600 dark:text-slate-400">
                            Software que resolve problema real, do primeiro commit ao deploy em produção.
                        </p>
                        <div>
                            <a href="https://www.linkedin.com/in/jorge-gabriel-579605228/" target="_blank" rel="noopener noreferrer">
                                <img src={LinkedinIcon} alt="LinkedIn" className="h-8 w-8 transition-transform duration-300 hover:-translate-y-1 hover:opacity-80" />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-5 font-semibold text-slate-900 dark:text-white">Páginas</h3>
                        <ul className="flex flex-col gap-3">
                            <li><Link to="/" className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Início</Link></li>
                            <li><Link to="/about" className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Sobre mim</Link></li>
                            <li><Link to="/projects" className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Projetos</Link></li>
                            <li><Link to="/contact" className="text-slate-600 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400">Contato</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-5 font-semibold text-slate-900 dark:text-white">Contato</h3>
                        <p className="text-slate-600 dark:text-slate-400">jg3043505@gmail.com</p>
                    </div>
                </div>

                <div className="mt-14 border-t border-slate-200 pt-6 dark:border-slate-800">
                    <p className="text-sm text-slate-500 dark:text-slate-500">© 2026 Jorge Gabriel. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
