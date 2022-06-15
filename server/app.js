//const { response } = require('express');
const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001;
const helmet = require("helmet");
app.use(helmet());

//function to fetch gitHub user information 
const getGitHubUserData = async (username) => {
    try{
        const request = await fetch('https://api.github.com/users/' + username);
        const data = await request.json();
        return(data);
    } catch(err) {
        return(err)
    }

}

//functions to fetch five commits for one github repo
const getCommitsForOneRepo = async(username, repo_name) => {

    try {
        let request = await fetch(`https://api.github.com/repos/${username}/${repo_name}/commits?per_page=5`)
        let response = await request.json() 
        return (response)
    }catch(err) {
        return(err)
    }
            
}

//gets three gitHub repos for the username passed as an argument
const getGitHubRepos = async (username) => {

    try {
        const request = await fetch(`https://api.github.com/users/${username}/repos?per_page=3`)
        const response = await request.json();
        return (response)
    } catch(err) {
        return(err)
    }

}

//gets the commits for a gitHub repo
app.get('/gitHubCommits/:username/:repo_name', async (req, res) => {
    
    try {
        let request = await getCommitsForOneRepo(req.params.username, req.params.repo_name);
        const response = await request
        res.send(response)
    } catch(err) {
        res.send(err)
    }
})

// gets three repos owned by the username sent as a req. parameter and sends them to the client
app.get('/githubrepos/:username', async (req, res) => {

    try {
        const username = req.params.username
        let response = await getGitHubRepos(username);
        let repos = response
        res.send(repos)
    } catch(err) {
        res.send(err);
    }
      
})

//gets gitHub user information by passing the username from the req parameters to the getGitHubUserData method. Returns the userInfo to the client
app.get('/github/:username', async (req, res) =>{

    try {
        const userInfo = await getGitHubUserData(req.params.username)
        res.send(userInfo);
    } catch (error){
        console.log(error);
        res.send({message: err});
    }
});

//gets the basic user information and projects for a gitlab user. Returns the information to the client
app.get('/gitlab/:username', async (req, res) => {

    try {

        let user = {}
        let response = await fetch('https://gitlab.com/api/v4/users?username=' + req.params.username)
        let userInfo = await response.json();
        user = userInfo[0];

        if (user !== undefined) {
    
        response = await fetch('https://gitlab.com/api/v4/users/' + user.id + '/projects')
        user.projects = await response.json();

        res.send(user);
        }
        
        else res.send({message: "No gitlab users found"})

    } catch (error) {
        console.log(error);
        return({message: error});
    }

});

//get commits for gitlab repo and returns the details to the client
app.get('/gitlabrepo_commits/:repo_id', async (req, res) => {

    try {
        let request = await fetch(`https://gitlab.com/api/v4/projects/${req.params.repo_id}/repository/commits`)
        let response = await request.json();
        res.send(response)
    }
    catch (error) {
        res.send('something went wrong')
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });