# Transaction-statistics-apis
Tech Stack Used: Node.js, MongoDb

# How to setup
Download the zip file, extract it and open the extracted folder in your editor (VS code preferred).

# Requirements to run/test this on your machine
1. MongoDb installed on your system or have a MongoDb Atlas Account, once this is set-up, you have to make a new file in the folder and name it ".env" and as illustrated in ".env.example" which is already present in the folder enter the URL for connecting to the Database, and the port number.
2. Node installed on your system

# How to Start
1. Run npm install / npm i to install all the dependencies.
2. Open the terminal in the same directory and run : node seeds.js to set up your test account
3. Run npm start to connect to the database and listen on your entered port for requests.

# How to send requests
1. JSON Link to the PostMan Collection : 'https://www.getpostman.com/collections/2485689636a8a33a5082'
2. Send the post link to yourdomain/auth to get your Auth Token.
3. Copy the response token and change the Bearer Token in authorisation in all the other requests where it is required.



