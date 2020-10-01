# adrenaline
Control your PC's RGB lighting with your Garmin/Apple watch heart rate monitor!

Both color and pulse rate will be impacted. For example, if your heart rate is high, the light will pulse quickly and be a bright red color.

### Implementation details
- We will use the OpenRGB SDK to provide support for the largest number of RGB devices on both Windows and Linux.
- Heart rate should be grabbed every second. The output will be some sort of weighted average with a recency bias.
- Application will have two parts: the watch app, which acts as a client and connects to your PC and sends the heart rate data at 1 hz, and the PC server, which receives the information and updates the RGB devices accordingly.

### How to contribute
Easy! Just open an issue or submit a pull request.

### When will this project be available?
For now, we don't have a timeline, but know we're working on it!
