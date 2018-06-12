The "index.js" file is used to set initialize connnections and routes to other models of the site.
first you'd need to install mongodb and start the mongodb server

after run 

"node index.js"

or if you want to the server to refresh the changes after making changes
to the source files install nodemon using npm 

"npm install -g nodemon --save"

and then run "nodemon index.js"

////////////////////////////////
/The config folder/
is used to store configurations data like other api keys or secret key
*note before production all the keys will be changed for security reasons so feel free to abuse
this one to your hearts content

/The database folder/
sets the schemas for any collections (tables for those who are familiar with SQL) in the database

/models folder/
Holds all the .js logic of the api server.

/models > features folder/
They hold the logic for the features of the system from complex logic to other asyn operations of the system
