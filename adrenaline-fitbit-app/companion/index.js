//Import required classes
import * as messaging from "messaging"; // Messaging to allow for comunication between fitbit and companion app

///Open Messaging connection
messaging.peerSocket.addEventListener("message", (heartRate) => {
  //When message is reccived send post request to nodejs server with the heartrate
  fetch(
    'http://localhost:3000/heartrate', //the URL for the request
    {
    method: 'POST', // The method
    body: heartRate.data //the data to send to the server
  })
});