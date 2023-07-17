    import { useState } from "react";

    const GithubProfileA = () => {

        const [user, setUser] = useState(null);
        const [repos, setRepos] = useState([]);
        const [searchValue, setSearchValue] = useState("");
        const [error, setError] = useState(null)

        const API_URL = "https://api.github.com/users/";

        const getUser = async (userName) => {
            const response = await fetch(API_URL + userName);
            const data = await response.json();
            setUser(data);
            getRepos(userName);
            fetch(API_URL + userName)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    setUser(data)
                });
        }

        const getRepos = async (userName) => {
            const response = await fetch(API_URL + userName + "/repos?sort=created");
            const data = await response.json();
            setRepos(data);
            console.log(data);
          }

        const handleChange = (e) => {
            setSearchValue(e.target.value);
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            getUser(searchValue);
            setSearchValue("");
        }

        const UserCard = () => {
            console.log(user);
        if(user) {
            return (
                <div className="max-w-200 bg-violet-800 rounded-e-2xl
                shadow-lg flex p-6 m-6">
                    <div>
                        <img src={user.avatar_url} alt={user.login + "image"}
                            className="rounded-full h-36"></img>
                    </div>

                    <div>
                        <h2>{user.login}</h2>
                        <p>{user.bio}</p>

                        <ul className="flex flex-row">
                            <li className="flex items-center mr-5">{user.followers} <strong>Followers</strong></li>
                            <li>{user.following} <strong>Following</strong></li>
                            <li>{user.public_repos} <strong>Repos</strong></li>
                        </ul>

                        <div id="repos" className="flex flex-wrap">
                            {renderRepos()}
                        </div>    
                    </div>
                </div>
            )
        }
        }

        const renderRepos = () => {
            return (
                <div>
                {repos && repos.slice(0, 5).map((repo) => (
                    <a
                    key={repo.id}
                    className="inline-block text-white text-xs bg-purple-900 p-2 m-2"
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    >
                    {repo.name}
                  </a>
                ))}
              </div>
            );
        };
        console.log(repos)

        //   const renderRepos = () => {
        //     console.log(repos)
        
        //     return (
        //         <div>
        //             {repos &&  repos.slice(0,5).map((repo) => {
        //         <a key={repo.id}
        //         className="inline-block text-white text-xs bg-purple-900 p-2 m-2"
        //         href={repo.html_url}
        //         target="_blank"
        //         rel="noopener noreferrer"
        //         >
        //             {repo.name}
        //         </a>
        //     })}
        //         </div>
        //     )
        // }

        return (
            <div className="h-screen bg-sky-900 flex justify-center 
        items-center flex-col text-white">
                <div className="w-full max-w-2xl">

                    <form onSubmit={handleSubmit}>

                        <input type="text" placeholder="Search a Github User"
                            value={searchValue} onChange={handleChange}
                            className="w-full text-black border-none outline-0 
                rounded-lg p-2 bg-purple-900"
                        ></input>

                    </form>

                </div>

                {UserCard()}
                            {/* {ErrorCard()} */}

            </div>
        )
    }
    export default GithubProfileA