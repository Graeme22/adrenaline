import * as messaging from "messaging";

// Example POST method implementation:
async function postData(url = '', data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'text/plain'
    },
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: data // body data type must match "Content-Type" header
  });
  return  response; // parses JSON response into native JavaScript objects
}

messaging.peerSocket.addEventListener("message", (evt) => {
  postData('http://localhost:3000/heartrate', evt.data)
  .then(data => {
    console.log(data);
  });

});