import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import GitHubRepos from "./GitHubRepos";

/*
This component fetches the user details for a github user (username passed in as props) from the app server and renders them.
It has child components to display the repo details for the user.
*/

export class GitHubUserDetails extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
          username: this.props.username,
          user: {},
          userFound: false,
          repos: [],
          reposLoaded: false,
          error: false
        }
    }

    componentDidMount() {

        //makes a fetch request to the server for the github user details. if they are returned, the details are saved to the component state and userFound is set to true so that the component renders the info
        try {
            fetch('/github/' + this.props.username)
                .then(res => res.json())
                .then(
                    (result) => {
                        if ('message' in result){
                            console.log(result.message)
                            this.setState({error: true}) 
                        }
                        else {
                            this.setState({
                                user: result,
                                userFound: true 
                            })
                        } 
                    },
                    (error) => {
                        console.log(error)
                        this.setState({error})
                    }
                )
        } catch {
            this.setState({gitHubUserFound: false});
            console.log('No gitHub user found');
        }
    
    }

    render () {

        const {user, error, userFound} = this.state
       
        if(error){
            return (<div className="main">
                <h1 className="text-center">Something went wrong</h1>
                <a href='/'><h3 className="text-center">Go back to search</h3></a>
                </div>)
        } else if (!userFound) {
            return (<div className="main"><h1 className="text-center">loading...</h1></div>)
        } else return (

            <div className="main">  

                <h1 className="text-center">GitHub details for {user.login} </h1>
                <a href='/'><h3 className="text-center">Go back to search</h3></a>

                <Container className="results">
                    <Row className="text-center">
                    </Row>
                    <Row>
                        <Col className="basic-info" xs={12} lg={4}>
                        <div className="text-center" >
                            <img id="img-top" src={user.avatar_url}  alt="..." />   
                            </div> 
                            <div className="info-text">
                            <p>Username: {user.login}</p>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>  
                            <p>Bio: {user.bio}</p>
                            <p>Location: {user.location}</p>
                            </div>
                        </Col>
                        <Col className="repo-info" lg={7}>
                            <h3 >Recent repos:</h3>
                        <GitHubRepos username={this.state.username} />    
                            <button className="btn-external"> Go to {user.login}'s gitHub repos</button>
                        </Col>
                    </Row>
            </Container>
            </div>
        )
    }
}
