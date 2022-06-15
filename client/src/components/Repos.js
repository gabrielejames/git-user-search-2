import React from "react";

class Repos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            repos : this.props.repos,
            isLoaded: true,
            items: {}
        };   
    }


    componentDidMount() {
        fetch("https://api.github.com/users/gabrielejames/repos")
          .then(res => res.json())
          .then(
            (result) => {
                this.setState({
                  isLoaded: true,
                  items: result
                });  
            },
            (error) => {
              this.setState({
                isLoaded: true,
                error }); 
            }) 
        }
         
    


    render () {
       const repos = this.state.items
      const RepoList = repos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
      )) 

    
  

        return (
            
            <div>
                
                <ul>{RepoList}</ul>
                
            </div>
        )
    }

}

export default Repos;