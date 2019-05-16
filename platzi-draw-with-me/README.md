# What to install for the app to work

## Step by step
### Node.js <!important>
1. download and install from http://nodejs.org

### (A) Express.js 
1. installation instructions are in https://expressjs.com/en/starter/installing.html
2. run ```npm install express --save``` on the command line
3. run ```express -e -c stylus dibujemos``` to use the stylus feature
4. run ```cd dibujemos && npm install``` to go to the folder and install node modules

### (B) Socket.io
1. run ```npm install --save socket.io``` to install dependencies on the package.json



## (A)+(B) all-in-one: express, socket.io, stylus and ejs
or you can simply copy the dependencies in your package.json file, save changes and run ```npm install``` from the same folder where you package.json file lives on.
```
"dependencies": {
    "ejs": "*",
    "express": "^4.16.4",
    "socket.io": "^2.2.0",
    "stylus": "*"
  },
```
