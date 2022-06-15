import React from "react";
import GitHubCommits from "./GitHubCommits";

/*
This component takes a gitHub username as props. It fetches the user's repos and renders them. It has a child component that takes the username and repo name
as props and fetches and renders the last commits for that that repo
*/

class GitHubRepos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user : this.props.username,
            reposLoaded: false,
            repos: [] 
        };  
    };

    componentDidMount() {

        //fetches the repos for the user and returns them. they are then saved as state and rendered by the app
        try {
            fetch('/githubrepos/' + this.props.username)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                          repos: result,
                          reposLoaded: true
                        })
                        console.log(result)
                    },
                    (error) => {
                        this.setState({error})
                        console.log(error)
                    }
                ) 
            } catch {
                console.log('Something went wrong');
            }    
    }

    render () {
        
        if (!this.state.reposLoaded) {
            return <div>Loading</div>
        }else return (
            <div>
                   {this.state.repos.map(repo => (
                       
                        <div className="repo-info">
                            <h4>{repo.name}</h4>
                            <p>
                            {repo.description} <br />
                            {repo.created_at} <br />
                            {repo.updated_at} <br />
                            Last commits: <br />
                            
                            </p>
                            <GitHubCommits repo_name={repo.name} username={this.props.username}/>
                            <hr />
                        </div>
                    ))}
            </div>
        )
    }
}

export default GitHubRepos;