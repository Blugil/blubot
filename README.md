# BluBot

BluBot is a Twitch chatbot that I'm developing for use on the rare occassion that I stream. 
While not fully capable I will slowly be working on this project over time, the currnet 
progress can be seen by checking the road map section below.

## Installation

As of now this project is for personal use. It likely isn't finished or near anything as quality as [NightBot](https://nightbot.tv/) is, however if someone is looking to make their own bot using
Node this may serve as a good educational project.

If desired, one would set up the project like this:

1. Download and install [ngrok](https://ngrok.com/), get familiarized with how it works

2. Clone this project using the following steps:

```Bash
//clone the project
git clone https://github.com/Blugil/blubot.git

//cd to the project directory
cd blubot

//install dependencies
npm install

//cd to where you installed ngrok (I recommend the home directory)
cd

//start the server
./ngrok http 8080
```

3. Edit the config file with all of your information

4. cd back to the project directory, cd into the server subdirectory, run `node server.js`

5. Happy hacking!


## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This software is for educational purposes only, do not use software for any reason other
than educational.

