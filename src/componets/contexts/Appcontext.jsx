import { createContext, useState, useEffect } from 'react';
// 1. AQUI ESTAVA O ERRO! Agora importamos a função exata que existe no seu arquivo.
import { getGithubRepos } from '../../Services/apiServices.js';

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
    // Agora o contexto vai guardar os seus repositórios do GitHub em vez de "textos/idiomas"
    const [repos, setRepos] = useState([]);
    const [loading, setLoading] = useState(true);

    // Lógica do Dark Mode (Intacta e funcionando)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('theme');
        return savedTheme === 'dark';
    });

    const toggleTheme = () => {
        setIsDarkMode(prev => {
            const newTheme = !prev;
            localStorage.setItem('theme', newTheme ? 'dark' : 'light');
            return newTheme;
        });
    };

    // Busca de dados usando a sua função real
    useEffect(() => {
        const fetchDadosDoGithub = async () => {
            try {
                setLoading(true);
                // 2. Chamamos a função correta
                const data = await getGithubRepos(); 
                setRepos(data);
            } catch (error) {
                console.error("Erro ao buscar repositórios do GitHub:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchDadosDoGithub();
    }, []);

    return (
        // 3. O Provider agora distribui seus repositórios, o loading e as funções de tema
        <AppContext.Provider value={{ repos, loading, isDarkMode, toggleTheme }}>
            <div className={isDarkMode ? 'dark-mode' : 'light-mode'} style={{ minHeight: '100vh' }}>
                {children}
            </div>
        </AppContext.Provider>
    );
};