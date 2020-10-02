//Import required modules
const express = require('express')
const { OpenRGBClient } = require("openrgb");
const bodyParser = require('body-parser');

//Set up express
const app = express()
app.use(bodyParser.text());
app.listen(3000) //Port for Express to listen to request on the localhost

const rgbHeartRateCalculator = (heartRate) => {
    //Max and min heart rates, used to calculate the gradient of purple -> red
    const maxHr = 220; 
    const minHR = 60; 
    const rangeOfHearBeats = maxHr - minHR;

    const constant = 35;
    const colourConstant = (255 - constant) / rangeOfHearBeats;
    const red = ((heartRate-minHR) * colourConstant) + constant;
    const green = heartRate <= 127 
    ? ((((heartRate-minHR) * (colourConstant/2)) + (constant/((constant/100)*5.7))) - 10 )
    : 61 - ((heartRate-minHR) * 0.82/2) + (constant/((constant/100)*7));
    const blue = 290 - (((heartRate-minHR) * colourConstant) + constant);

    //Return Object of colours
    return {
        //Using ES6 shorthand to declare object (See: Object Initialization From Variables - https://www.sitepoint.com/es6-enhanced-object-literals/)
            red,
            green,
            blue,
        }
    }


//Fucntion to change the RGB lighting, takes 3 inputs for RGB, from 0 - 225
const changeRGB = async (data) => {
    //Sets up the OpenRGB client
    const client = new OpenRGBClient({
        host: "192.168.170.211", //the address where the OpenRGB server (the app) is running, if on same machine using http://localhost will be fine
        port: 6742,
        name: "Adrenaline Client"
    });

    //Establish a connection with OpenRGB server, using details from the client object
    await client.connect();
    //Returns the number of RGB devices detected by the OpenRGB server
    const controllerCount = await client.getControllerCount();

    //Itterate through the number of devices available
    for (let deviceId = 0; deviceId < controllerCount; deviceId++) {
        //Returns object with information about the specific device - including device.colors, which has the RGB values for each LED zone on that device
        const device = await client.getDeviceController(deviceId);

        //Create an array with as many values as there are RGB LED zones
        const numberOfRgbZonesArray = Array(device.colors.length).fill("");
        //Loops through the array and sets the RGB value for each LED zone
        const colourForEachRgbZone = numberOfRgbZonesArray.map((colour) => {
            //Each zone requires an object with red, green, blue. takes a value from 0 - 255
            return rgbHeartRateCalculator(data)
        });
        //Updates the RGB settings on the device
        // await client.updateLeds(deviceId, colourForEachRgbZone);
    }
    //Close connection with OpenRGB server
    await client.disconnect();
}


//Express POST endpoint
app.post('/heartrate', (req, res) => {
    //Out puts the data recived via the post request
    console.log(req.body)
    changeRGB(req.body) //Runs the function
    res.sendStatus(200) //Sends 200 OK Status as response
});










