const express = require('express')
const { OpenRGBClient } = require("openrgb");
const bodyParser = require('body-parser');
const fs = require('fs')

const app = express()



let hearRate = 0;


async function start() {
    const client = new OpenRGBClient({
        host: "192.168.170.211",
        port: 6742,
        name: "Adrenaline Client"
    });
    await client.connect();
    const controllerCount = await client.getControllerCount();
    for (let deviceId = 0; deviceId < controllerCount; deviceId++) {
        const device = await client.getDeviceController(deviceId);
        // console.log(device.leds)
        const colours = Array(device.colors.length).fill("").map((colour) => {
            // let v = Math.floor(Math.random()*255)
            return {
                red: hearRate,
                green: 0,
                blue: 0
            }
        });
        // console.log(colours)
        // console.log(`Setting the color of ${device.name}`);
        await client.updateLeds(deviceId, colours);
    }
    await client.disconnect();
}




app.use(bodyParser.text());

app.post('/heartrate', (req, res) => {
    console.log(req.body)
    hearRate = req.body;
    start()
});



app.listen(3000)




// setInterval(start, 1000)





