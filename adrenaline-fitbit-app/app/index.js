//Import required classes
import * as messaging from "messaging"; // Messaging to allow for comunication between fitbit and companion app
import { HeartRateSensor } from "heart-rate"; //Hert rate sensor to detect heart rate

//Open Messaging connection
messaging.peerSocket.addEventListener("open", (evt) => {
  sendMessage();
});

//If connection is lost console.log the error
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

//function to send message
const sendMessage = (inputData) => { 
  //Ensure the socket is open, before 
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(inputData);
  }
}

let hrm;
//Checks that the device has a HR sensor
if (HeartRateSensor) {
  //Create new HR Sensor, with a frequnecy of 1hz
  hrm = new HeartRateSensor({ frequency: 1 });
  //Whenever there is a reading, the reading is sent to the companion app via the sendMessage function
  hrm.addEventListener("reading", () => sendMessage(hrm.heartRate));
}

//Start the sensor
hrm.start();