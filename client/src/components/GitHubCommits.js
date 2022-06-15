import React from "react";

/*
This component takes a github repo id and username as props and then fetches the repo commits and renders them
*/

class GitHubCommits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repo_name : this.props.repo_id,
            username: this.props.username,
            isLoaded: false,
            items: [],
            error: false
        };   
    }

    componentDidMount() {

        //fetches the commits from the app server and returns saves them as state for rendering by the component
        try {
            fetch(`/gitHubCommits/${this.props.username}/${this.props.repo_name}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                          items: result,
                          isLoaded: true
                        })
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
        const { error, isLoaded, items } = this.state;
        // put an if state
        if (error) {
            return <p className="commit-info">Error getting commits</p>
        }
        else if (!isLoaded){
        return (
            <p className="commit-info">Loading commits for {this.props.repo_name}</p>     
        )}
        else return(
            <div>
                <h5>Commits:</h5>
                <div className="commit-info">
                    <ul>
                    {items.map(item => (
                        <li key={item.sha}>{item.commit.message}</li>
                    ))
                    }
                    </ul>
                </div>
                
            </div>
        )
    }
}

export default GitHubCommits;