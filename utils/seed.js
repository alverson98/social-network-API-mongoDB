//server connection
const connection = require("../config/connection");

//models
const { User, Thought } = require("../models");

//data
const { userSeed, thoughtSeed } = require("./data");

connection.on("error", (err) => err);

// Once connection is established
connection.once("open", async () => {
  //Delete whatever exists
  await User.deleteMany({});
  await Thought.deleteMany({});

  //seeding data
  await User.insertMany(userSeed);
  await Thought.insertMany(thoughtSeed);

  process.exit(0);
});
