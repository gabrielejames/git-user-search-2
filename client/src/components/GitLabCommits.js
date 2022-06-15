import React from "react";

/*
This component takes a gitLab project id as a prop and then fetches the project commits and renders them
*/

class GitLabCommits extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            project_id : this.props.project_id,
            isLoaded: false,
            items: [],
            error: false
        };
    }

    componentDidMount() {

        //fetches the commits for the project whose id is received as props. the commits are spliced and saved to state
        try {
            fetch(`/gitlabrepo_commits/${this.props.project_id}`)
                .then(res => res.json())
                .then(
                    (result) => {
                        this.setState({
                          items: result.slice(0,5),
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
        const { error, isLoaded,  items } = this.state;
        
        if (error) {
            return(
            <p className="commit-info">Error getting commits</p>
            )
        }
        else if (!isLoaded){
        return (
            <p className="commit-info">Loading commits for {this.props.repo_name}</p>
            
        )}
        else return(
            <div>
                <h6>Commits:</h6>
                <div className="commit-info">
                    <ul className="date">
                    {items.map(item => (
                        <li key={item.id}>{item.message}</li>
                    ))
                    }
                    </ul>
                </div>
                
            </div>
        )
    }

}

export default GitLabCommits;