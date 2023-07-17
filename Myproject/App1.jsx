import React, { useState } from 'react';
const APIURL = 'https://api.github.com/users/';
function GitHubProfile() {
    const [searchValue, setSearchValue] = useState('');
    const [user, setUser] = useState(null);
    const [repos, setRepos] = useState([]);
    const [error, setError] = useState(null);
    const getUser = async (username) => {
        try {
            const response = await fetch(APIURL + username);
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setUser(userData);
                getRepos(username);
            } else {
                throw new Error('No profile with this username');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const getRepos = async (username) => {
        try {
            const response = await fetch(APIURL + username + '/repos?sort=created');
            if (response.ok) {
                const reposData = await response.json();
                setRepos(reposData);
            } else {
                throw new Error('Problem fetching repos');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (searchValue) {
            getUser(searchValue);
            setSearchValue('');
        }
    };

    const handleInputChange = (e) => {
        setSearchValue(e.target.value);
    };

    const renderUserCard = () => {
        if (user) {
            const userID = user.login;
            return (
                <div className="card flex gap-x-10   border border-blue-900 p-5 rounded">
                    <div>
                        <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="w-155 rounded-full border-4 border-purple-900"
                            style={{ maxWidth: '80px' }}
                        />
                    </div>
                    <div className="user-info">
                        <h2>{userID}</h2>
                        <div className="flex">
                            <ul className="flex flex-row">
                                <li className="flex items-center mr-5">
                                    {user.followers} <strong className='mx-2'>Followers</strong>
                                </li>
                                <li className="flex items-center mr-5">
                                    {user.following} <strong className='mx-2'>Following</strong>
                                </li>
                                <li className="flex items-center">
                                    {user.public_repos} <strong className='mx-2'>Repos</strong>
                                </li>
                            </ul>
                        </div>
                        <div id="repos" className="flex flex-wrap">
                            {renderRepos()}
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    };

    const renderRepos = () => {
        return repos.map((repo) => (
            <a
                key={repo.id}
                className="repo inline-block   text-white text-xs px-2 py-1 rounded mr-2 mb-2 bg-purple-900"
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
            >
                {repo.name}
            </a>
        ));
    };

    const renderErrorCard = () => {
        if (error) {
            return (
                <div className="card">
                    <h1>{error}</h1>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="container mx-auto h-screen flex items-center justify-center bg-blue-800">
            <div className="w-full max-w-xl">
                <form className="bg-purple-900 " onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            className=" border-none outline-0 border-rounded w-full py-2 px-3 text-white bg-purple-900 "
                            type="text"
                            placeholder="GitHub username"
                            value={searchValue}
                            onChange={handleInputChange}
                        />
                    </div>
                </form>
                {renderUserCard()}
                {renderErrorCard()}
            </div>
        </div>
    );
}

export default GitHubProfile;
