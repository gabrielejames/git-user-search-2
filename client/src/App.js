
import './App.css';
import React from 'react';
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { Search } from './components/Search';
import { GitHubUserDetails } from './components/GitHubUserDetails';
import GitLabUserDetails from './components/GitLabUserDetails';

/*
This app allows the user to search for users on gitHub and gitLab and returns the results
The user information can be viewed on user results components.
The requests to the Git APIs are handled by the app's server.
*/

export class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
        gitHubUser: {},
        gitLabUser: {},
        gitHubUserName: '',
        username: '',
    }

  this.handleSearchResults = this.handleSearchResults.bind(this);
}

//receives the searched username from the search element so that it can be passed to the results components
  handleSearchResults(username) {
    this.setState({
      username: username,
     
    })
  }

  render () {

  return (
    <div className="App">
      <h1 className='text-center'>GITHUB AND GITLAB USER SEARCH!</h1>
      <Router>
      <Routes>
        <Route path="/*" element={<Search handleSearchResults={this.handleSearchResults} />}></Route>
        <Route path={'/gitHubUser/'} element={<GitHubUserDetails username={this.state.username}  />}></Route>
        <Route path={'/gitLabUser'} element={<GitLabUserDetails username={this.state.username}/>}></Route>
      </Routes>
      </Router>

    </div>
  );
  }
}


