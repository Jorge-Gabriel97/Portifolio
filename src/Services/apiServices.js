// Busca os repositórios públicos para a vitrine de projetos.
// Ficam de fora: arquivados (projetos antigos) e forks (código de outras pessoas).
export const getGithubRepos = async (username = 'Jorge-Gabriel97') => {
    try {
        const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`;

        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return [];
        }

        const data = await response.json();
        return data.filter((repo) => !repo.archived && !repo.fork);

    } catch (e) {
        console.error('Catch error:', e);
        return [];
    }
}
