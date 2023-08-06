# Cemiar-App-Razvan

Web app created by Razvan Soos for Cemiar. Front-end is a vue app, backend is a hapi server.

To run locally, make sure you have mondodb installed and running. I recommend it through MongoDB Compass. Have it connected on "mongodb://localhost:27017", with a "vue_project_db" database and a "texts" collection

In visual studio code open two terminals and run the following commands

First one: 
cd server
node index.js

Second one:
cd vue-project
npm run dev

The server should return:
Connected to MongoDB
Server running on http://localhost:3000

The vue app should return:
> vue-project@0.0.0 dev
> vite

  VITE v4.4.7  ready in 1066 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help


Vite will connect to your IP :5173, make sure that you go on localhost:5173 instead as the google connection is not configured to support other IPs.

Once on the app, I have used the vue3-google-login to automatically login to whatever google account it detects. If no account is detected, you can regularly log in as you normally would. 
The following npm package has all the documentation for the google login: https://www.npmjs.com/package/vue3-google-login
After the login, you can type and add text to the app. It will tell the name of the user and the time of when the comment was made.

You have the option to logout if you wish to login with a different account.
