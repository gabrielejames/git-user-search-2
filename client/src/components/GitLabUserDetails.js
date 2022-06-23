import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Container, Row, Col } from "react-bootstrap";
import GitLabProjects from "./GitLabProjects";

/*
This component fetches a gitlab user's details, including their projects from the server. If the fetch is successful, the user details are saved to the
component's state. They are then rendered by the component. The component has a GitLabProjects child that rakes the user's projects as props and renders those.
*/

class GitLabUserDetails extends React.Component {
  
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        username: this.props.username,
        user: [],
        commits: []
      };
    }
  
   componentDidMount() {
      
    //makes a fetch request for the gitlab user details to the app server. If user details are returned, they are rendered by the app.
      fetch(`/gitlab/${this.state.username}`)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              user: result
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
        });
      }
      )
    }
  
    render() {

      const { error, isLoaded,  user } = this.state;
      if (error) {
        return (
        <div className="main">
            <h1 className="text-center">Something went wrong</h1>
            <a href='/'><h3 className="text-center">Go back to search</h3></a>
        </div>
      )} else if (!isLoaded) {
        return (
        <div className="main">
            <h1 className="text-center">loading...</h1>
        </div>
        )
      } else return (
          <div className="main">  
              <a href='/'><h3 className="text-center">Go back to search</h3></a>
          <Container className="results">
            
            <Row className="text-center head">  
                <h1 className="text-center">GitLab details for {user.username}</h1>
            </Row>
            <Row>
                <Col className="basic-info" xs={12} lg={4}>
                    <div className=" info-box">
                        <img id="img-top" src={user.avatar_url}  alt="..." />   
                    <div className="info-text">
                    <p>Username: {user.username}</p>
                    <p>Name: {user.name} </p>
                    <p>State: {user.state}</p>  
                    </div>
                    <hr />
                    </div> 
                </Col>
                <Col className="repo-info">
                    <GitLabProjects projects={user.projects} />
                </Col>
                <Col className="repo-info">
                    <h3>Links:</h3>
                    <div className="project-details">
                      <a href={user.web_url} target="_blank" rel="noreferrer">  <button className="btn-external"> {user.name}'s GitLab profile</button> </a>
                    </div>
                </Col>
              </Row>
              <Row>
              </Row>
        </Container>
        </div>
        );
      }
}
  

  export default GitLabUserDetails


