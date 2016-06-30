# Video Feed App

This is a basic video feed that displays data from Vimeo's API. Users can watch embedded videos and also paginate forward/backward through page sets. It's written in vanilla ES6 (there's not even any jQuery!), with a build toolset of Babel, Gulp, Browserify and Sass. 

Check it out at [ahoef.co/video-feed](http://www.ahoef.co/video-feed), or run it locally!

### Running locally in a browser:
Note! This application requires a global version of gulp 3.9.0 or higher. 

To run this global installation if you don't have gulp:
`npm install gulp -g`

To update gulp if you already have gulp installed globally:
`npm update gulp -g`

When you've got gulp squared away, `cd` into this project directory and install dependencies:
`npm install`

Then start the server & compile CSS and JS:
`gulp`

Then head to [localhost:8080/index.html](http://localhost:8080/index.html).

### Running tests:
This application includes Mocha & Chai unit tests - to view test results once you have your local server running, head to [localhost:8080/tests/test.html](http://localhost:8080/tests/test.html). 
