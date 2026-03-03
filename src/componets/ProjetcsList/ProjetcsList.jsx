import { useState, useEffect } from "react";
import "./ProjetcsList.css";
import Button from '../Button/Button';

function ProjetcsList() {
    const [projects, setProjects] = useState([]);    
    const [visibleCount, setVisibleCount] = useState(8);    
    const [expandedRepoId, setExpandedRepoId] = useState(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch('https://api.github.com/users/Jorge-Gabriel97/repos');
                const data = await response.json();             
                
                // Lista de projetos favoritos (pode ser ajustada conforme necessário)
                const favoritos = ["Barber-Maneger", "Jorge-Gabriel97", "Timesend"];

                // Filtragem e Ordenação
                const projetosFavoritos = favoritos
                    .map(nome => data.find(repo => repo.name === nome))
                    .filter(Boolean);
                
                const projetosRestantes = data.filter(repo => !favoritos.includes(repo.name));
                const restantesAleatorios = projetosRestantes.sort(() => Math.random() - 0.5);

                setProjects([...projetosFavoritos, ...restantesAleatorios]);

            } catch (error) {
                console.error("Erro ao buscar projetos:", error);
            }
        };

        fetchProjects();
    }, []);

    const showMoreProjects = () => {
        setVisibleCount(visibleCount + 8);
    };

    const toggleDescription = (id) => {
        setExpandedRepoId(expandedRepoId === id ? null : id);
    };

    return (
        <div className="projetcs-section">
            <div className="projetcs-hero">
                <h2>Conheça as soluções que desenvolvi</h2>
                <p>Explore uma coleção de projetos que demonstram minha experiência e habilidades em desenvolvimento web.</p>
            </div>

            <div className="projetcs-grid">
                {projects.slice(0, visibleCount).map((repo) => (
                    <div key={repo.id} className="projetcs-card d-flex jc-center al-center fd-column">
                        <div
                            className="thumb tertiary-background"
                            style={{
                                backgroundImage: `url(https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}?v=${repo.updated_at})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}
                        ></div>
                        
                        <h3>{repo.name}</h3>                        
                        
                        {/* Botão de Detalhes Estilizado */}
                        <button className="desc-btn" onClick={() => toggleDescription(repo.id)}>
                            {expandedRepoId === repo.id ? 'Ocultar detalhes ↑' : 'Ver detalhes ↓'}
                        </button>                        
                        
                        {expandedRepoId === repo.id && (
                            <p className="repo-description">
                                {repo.description ? repo.description : "Projeto em desenvolvimento"}
                            </p>
                        )}
                        <a href={repo.html_url} target="_blank" rel="noreferrer" className="repo-link">
                            Ver Repositório ➔
                        </a>
                    </div>
                ))}
            </div>
            {visibleCount < projects.length && (
                <div className="d-flex jc-center" style={{ marginTop: '40px' }}>
                    <Button buttonStyle="primary" onClick={showMoreProjects}>
                        Ver mais projetos
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ProjetcsList;