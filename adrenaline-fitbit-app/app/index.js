import { HeartRateSensor } from "heart-rate";
import * as messaging from "messaging";

messaging.peerSocket.addEventListener("open", (evt) => {
  sendMessage();
});
messaging.peerSocket.addEventListener("error", (err) => {
  console.error(`Connection error: ${err.code} - ${err.message}`);
});

function sendMessage(inputData) { 
  if (messaging.peerSocket.readyState === messaging.peerSocket.OPEN) {
    // Send the data to peer as a message
    messaging.peerSocket.send(inputData);
  }
}


if (HeartRateSensor) {
  const hrm = new HeartRateSensor({ frequency: 1 });
  hrm.addEventListener("reading", () => {
    let {heartRate} = hrm
    // console.log(`Current heart rate: ${heartRate}`);
    sendMessage(heartRate)
    
  });
  hrm.start();
}