# GitHub and GitLab User Search

This project uses express and react to allow a user to run a search for gitHub and gitLab users. The requests to the git APIs is handled by the express server.

The project demonstrates my understanding of using express and react to build an app that interfaces with third-party APIs to fetch and serve data to the user.

## How to install

Download the repo to your local directory. 
In the terminal navigate to the project directory, then to the server. Here you will need to begin by installing various packages using the following commands: 

$ npm i helmet express

Then start the server: 

$npm start

In the client folder, install react by issuing the following command:

$ npm i react

Then start the react app:

$npm start

The app should then automatically load in your default browser. 


## How to use

The UI presents the user with a search bar, where a username can be entered to search the gitHub and gitLab APIs. If a user is found, their details will be displayed in the search results. Clicking the button on a resault card will take the user to a separate page which will give information about the git user's repositories, commits, and other profie information. 



