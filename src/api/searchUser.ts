interface GitHubUser {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

async function searchUser(userName: string): Promise<GitHubUser | false> {
    const response = await fetch(`https://api.github.com/users/${userName}`, {
        headers: {
            Authorization: `Bearer ${import.meta.env.VITE_API_GITHUB_TOKEN}`,
        }
    });
    console.log(import.meta.env.VITE_API_GITHUB_TOKEN);
    
    if (response.status === 200) {
        const userData = await response.json();
        return {
            id: userData.id,
            login: userData.login,
            avatar_url: userData.avatar_url,
            html_url: userData.html_url,
        };
    } else {
        return false;
    }
}

export default searchUser;