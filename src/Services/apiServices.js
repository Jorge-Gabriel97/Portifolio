export const getGithubRepos = async (username) => {
    try {
        
        const url = `https://api.github.com/users/Jorge-Gabriel97/repos`;
        
        const response = await fetch(url, {
            method: 'GET',
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return []; 
        }
        
        const data = await response.json();
        return data;
        
    } catch (e) {
        console.error('Catch error:', e);
        return []; 
    }
}