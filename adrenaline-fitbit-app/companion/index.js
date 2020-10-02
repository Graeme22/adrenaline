import * as messaging from "messaging";

// Example POST method implementation:
async function postData(url = '', data) {
  console.log('hiiii')
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    headers: {
      'Content-Type': 'text/plain'
    },
    body: data // body data type must match "Content-Type" header
  });
  return  response; // parses JSON response into native JavaScript objects
}

messaging.peerSocket.addEventListener("message", (evt) => {
  console.log(evt.data)
    postData('http://localhost:3000/heartrate', evt.data)
    .then(data => {
      console.log(data)
    });
  
});