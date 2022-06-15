import React from "react";
import GitLabCommits from "./GitLabCommits";

/*
This component takes the gitLab user's projects as props and maps them to generate elements that show their details. It has a 
child component that takes the project id as props and renders the commits
*/

class GitLabProjects extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            projects: this.props.projects,    
        };  
    };

    render () {

        return (
            <div>
                   {this.state.projects.map(project => ( 
                        <div className="project-details">
                            <h5>{project.name}</h5>
                            <a href={project.web_url} target="_blank" rel="noreferrer">  <button className="btn-external"> Go to project repo</button> </a>
                            <p className="date">
                            {project.description} <br />
                            {project.created_at} <br />
                            {project.updated_at} <br />
                            </p>
                            <GitLabCommits project_id={project.id} />
                            <hr />
                        </div>
                   ))
                    }
            </div>  
        )
    }
}

export default GitLabProjects;