import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { NavLink } from "react-router-dom";


/*
This is a simpe search component. The user can enter a username into the form, which is then saved to state. When the form is submitted, the username is sent as two GET requests to the
app server, which then makes a call to the GitLab and GitHub APIs. The results are then sent back and saved to the component's state. The details are then rendered on user Cards, with links to 
the components that will display more deetailed information for each user.
*/

export class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username : '',
            gitHubUserFound: false,
            gitLabUserFound: false,
            gitHubUser: {},
            gitLabUser: {},
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        
    }

    //When the user enters a username, it is saved to state
    onChangeUsername(e) {this.setState({username: e.target.value})}

    //When the user submits the search form
    async handleSubmit(e) {

        this.setState({gitHubUserFound: false, gitLabUserFound: false})

        e.preventDefault();

        // sends a fetch request to the server for a github user with the submitted username
        try {
            fetch('/github/' + this.state.username)
                .then(res => res.json())
                .then(
                    (result) => {
                        if ('message' in result){
                            console.log(result.message)
                        }
                        else {
                        this.setState({
                          gitHubUser: result,
                          gitHubUserFound: true
                          
                        }) 
                        console.log(result)
                    }     
                    },
                    (error) => {
                      console.log(error)
                    }
                )
        } catch {
            this.setState({gitHubUserFound: false});
            console.log('Something went wrong');
        };
        
        // sends a fetch request to the server for a gitlab user with the submitted username
        try {
            fetch('/gitlab/' + this.state.username)
                .then(res => res.json())
                .then(
                    (result) => {
                        if ('message' in result){
                            console.log(result.message)
                        }else {
                        this.setState({
                            gitLabUser: result,
                            gitLabUserFound: true
                        }) 
                        console.log(result.name)
                        }  }   
                )} catch {
                console.log('Something went wrong');
           }
        
        //Sends the username to the parent component   
        this.props.handleSearchResults(this.state.username)
        
    }

    render () {

       const {gitHubUserFound, gitLabUserFound, gitLabUser, gitHubUser} = this.state

        return (
            <div className="main">  
                <Container className="search">

                    <Row>
                        <h2 className="text-center">Enter a username </h2>       
                    </Row>

                    <Row>
                        <form className='text-center' onSubmit={this.handleSubmit}>
                            <input className="search-bar" type="text" name="username" id="username" onChange={this.onChangeUsername}></input>
                            <input type="submit" value="Search!"  className="btn-internal"></input>
                        </form>
                    </Row>

                    <Row className="search-results text-center">
                        <Col></Col>

                    {/* checks whether a gitLab user was returned by the server, and renders a card with search results and NavLink to the user's details page if so. Otherwise returns empty card */}
                    { gitLabUserFound ? 
                        <Card style={{ width: '18rem' }} className="text-center">

                            <Card.Img className="search-img" variant="top" src={gitLabUser.avatar_url} />
                            <Card.Body>
                                    <Card.Title>GitLab: {gitLabUser.name} </Card.Title>
                                    <Card.Text>
                                        {null}
                                    </Card.Text>
                                    <NavLink to="/gitLabUser"><button  className="btn-internal">See user info</button></NavLink>
                                </Card.Body>
                        </Card>
                        :
                        <Card style={{ width: '18rem' }} className="text-center">
                            <Card.Img className="search-img" variant="top" alt="..." />
                            <Card.Body>
                                    <Card.Title>GitLab: {gitLabUser.name} </Card.Title>
                                    <Card.Text>
                                        No gitLab User found
                                    </Card.Text>
                                </Card.Body>
                        </Card>
                    }

                    {/* checks whether a gitHub user was returned by the server, and renders a card with search results and NavLink to the user's details page if so. Otherwise returns empty card */}
                    {gitHubUserFound ?

                        <Card style={{ width: '18rem' }} className="text-center">
                            <Card.Img className="search-img" variant="top" src={gitHubUser.avatar_url}  alt="..."  />
                            <Card.Body>
                                    <Card.Title>GitHub:</Card.Title>
                                    <Card.Text>
                                    {gitHubUser.name} <br />
                                    {gitHubUser.bio}
                                    </Card.Text>
                                    <NavLink to="/gitHubUser"><button  className="btn-internal">See user info</button></NavLink>
                            </Card.Body>
                        </Card> 
                        :
                        <Card style={{ width: '18rem' }} className="text-center">

                            <Card.Img className="search-img" variant="top"  alt="..."  />
                            <Card.Body>
                                    <Card.Title>GitHub:</Card.Title>
                                    <Card.Text>
                                    No gitHub user found
                                    </Card.Text>        
                            </Card.Body>
                        </Card> 
                    }   
                        <Col></Col>    
                    </Row>
                </Container>
            </div>
           
        )
    }

     
}