# Social Network API
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description

A API using Mongoose and Express to be used for a social network application where users can share their thoughts, react to friends' thoughts, and create a friend list.

## Built With

- JavaScript
- Node
- Mongoose
- Express.js
- Insomnia

## Installation
- Clone repo down to your local machine
- Start the application by opening an intergrated terminal and running `npm install` to install all necessary packages.
- After everything has installed, run `npm start` and the application will the start running on port 3001.
- You can use Insomnia to test the different routes to add/create users, add friends and reactions, etc.

## Usage
``
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
``

## Preview
[social-network-api.webm](https://user-images.githubusercontent.com/113260005/222977915-3239066f-d8c0-4cd7-82f3-e39dbd0fe67a.webm)
## License 

See license in repo