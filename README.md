# About

BluBot is a Twitch chatbot that I'm developing for use during my streams. While not fully capable I will slowly be working on this project over time and giving it more fun, exciting, and intereactive features. While the bot will continuously be updated as I come up with new ideas and impliment new features you can track the current progress by clicking [here](https://trello.com/b/SGyEYo5u/blubot).

## Why a Twitch Bot?

I've spent a lot of time on Twitch throuhgout my life. The website has really introduced me to welcoming communities and interseting streamers, so much so that I became interested in streaming myself. I noticed that most popular streamers had instances of bots like "Nightbot" or "Moobot" in their chat to assist with moderation and allow for a moderate amount of chat interaction. I thought that with my programming knowledge I could do something similar so I setout to read up on the Twitch api. While my motivation to stream dwindled I still enjoyed working on learning the technologies that go into stuff such as webhooks, hosting a webserver, and sending out dynamic api requests. I learned so many real world techniques and applications through this project that I consider it the turning point in my web development hobby.

## Installation

As of now this project is for personal use. It isn't finished (and never will be) and isn't nearly as polished and fucntional as [NightBot](https://nightbot.tv/) is, however if someone is looking to make their own twitch bot using Node and prefers to disect already written code this project may serve as a good starting point.

If you wanted, this is how you could set up your own version:

1. Download and install [ngrok](https://ngrok.com/), get familiarized with how it works

2. Clone this project using the following steps:

```Bash
# clone the project
git clone https://github.com/Blugil/blubot.git

# cd to the project directory
cd blubot

# install dependencies
npm install

# cd to where you installed ngrok (I recommend the home directory)
cd

# start the server
./ngrok http 8080
```

3. Edit the config-sample.json file and fill in all of the generic information with information specific to you.

4. cd into the server directory and run `node server.js`.

5. cd into the api directory and run `node api.js`. This will call the function to make a subscription to all the current categories I have subcsriptions to, remove and add as many as you like.

6. Happy hacking!

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This software is for educational purposes only, do not use software for any reason other
than educational.
