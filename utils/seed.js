//server connection
const connection = require("../config/connection");

//models
const { User, Thought } = require("../models");
const { insertMany } = require("../models/Thought");

//data
const { userSeed, thoughtSeed } = require("./data");

connection.on("error", (err) => err);

// Once connection is established
connection.once("open", async () => {
  //Delete whatever exists
  await User.deleteMany({});
  await Thought.deleteMany({});

  //seeding data
  await insertMany(userSeed);
  await insertMany(thoughtSeed);

  process.exit(0);
});
