import { useState, useContext } from 'react';
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from 'framer-motion';

const MotionOverlay = motion.div;
const MotionNav = motion.nav;
//Assets
import Logo from "../../assets/Logo.png";

import { AppContext } from '../contexts/Appcontext.jsx';

//Components
import Button from '../Button/Button';

const NAV_LINKS = [
    { to: '/', label: 'Início' },
    { to: '/about', label: 'Sobre' },
    { to: '/projects', label: 'Projetos' },
    { to: '/contact', label: 'Contato' },
];

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useContext(AppContext);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <header className="sticky top-0 z-50 border-b border-slate-200 bg-slate-50/80 backdrop-blur-md transition-colors duration-300 dark:border-slate-800 dark:bg-slate-900/80">
            <div className="container">
                <div className="flex items-center justify-between py-4">
                    <Link to="/">
                        <img src={Logo} alt="Logo Jorge Gabriel" className="h-12 w-12 rounded-full object-cover" />
                    </Link>

                    <div className="md:hidden">
                        <Button buttonStyle="secondary" onClick={toggleMenu} className="!px-5 !py-2.5 !text-sm">Menu</Button>
                    </div>

                    <nav className="hidden md:flex md:items-center md:gap-10">
                        <ul className="flex items-center gap-10">
                            {NAV_LINKS.map((link) => (
                                <li key={link.to}>
                                    <Link
                                        to={link.to}
                                        className="text-base font-medium text-slate-700 transition-colors hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                        <ThemeSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                    </nav>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <MotionOverlay
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMenu}
                            className="fixed inset-0 z-40 bg-black/60 md:hidden"
                        />
                        <MotionNav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
                            className="fixed inset-y-0 right-0 z-50 flex w-4/5 max-w-xs flex-col gap-2 bg-slate-900 p-8 md:hidden"
                        >
                            <button
                                onClick={toggleMenu}
                                aria-label="Fechar menu"
                                className="mb-6 self-end cursor-pointer bg-transparent text-3xl leading-none text-white transition-colors hover:text-blue-400"
                            >
                                ×
                            </button>
                            <ul className="flex flex-col gap-1">
                                {NAV_LINKS.map((link) => (
                                    <li key={link.to}>
                                        <Link
                                            to={link.to}
                                            onClick={toggleMenu}
                                            className="block border-b border-white/15 py-3 text-lg text-white"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-6">
                                <ThemeSwitch isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
                            </div>
                        </MotionNav>
                    </>
                )}
            </AnimatePresence>
        </header>
    )
}

function ThemeSwitch({ isDarkMode, toggleTheme }) {
    return (
        <label className="relative inline-flex h-8 w-14 cursor-pointer items-center rounded-full bg-slate-300 transition-colors duration-300 dark:bg-blue-600">
            <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
                aria-label="Alternar tema escuro"
                className="sr-only"
            />
            <span className="pointer-events-none absolute left-2 text-xs">☀️</span>
            <span className="pointer-events-none absolute right-2 text-xs">🌙</span>
            <span
                className={`absolute left-1 inline-block h-6 w-6 rounded-full bg-white shadow transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`}
            />
        </label>
    )
}

export default Header;
