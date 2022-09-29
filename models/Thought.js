const { Schema, model } = require("mongoose");

// Schema for thoughts
const thoughtSchema = new Schema({
  thoughtText: { type: String, require: true, minLength: 1, maxLength: 280 },
  createdAt: {
    type: Date,
    default: Date.now,
    //getter to format the timestamp
    get: formatDateTime,
  },
  //user that created the thought
  username: {type: String, require: true},
  //reactions are like replies
  reactions: [reactionSchema]
});

//Formatting the timestamp
const formatDateTime = () => {
  //creating a new date object with current date
  const timestamp = new Date();

  //setting requirements for the formatting -- refer to MDN Date doc
  const dateOptions = { year: "numeric", month: "short", day: "numeric" };
  const timeOptions = {
    timeZoneName: "short",
    hour: "2-digit",
    minute: "2-digit",
  };

  // date should look something like - Jan 01, 2000
  const date = timestamp.toDateString("en-US", dateOptions);
  // time should look something like - 12:00 PM MST
  const time = timestamp.toLocaleTimeString("en-US", timeOptions);

  //returning the formatted timestamp - Jan 01, 2000 at 12:00 PM MST
  return `${date} at ${time}`;
};


// Reaction (SCHEMA ONLY)

// reactionId

// Use Mongoose's ObjectId data type
// Default value is set to a new ObjectId
// reactionBody

// String
// Required
// 280 character maximum
// username

// String
// Required
// createdAt

// Date
// Set default value to the current timestamp
// Use a getter method to format the timestamp on query
// Schema Settings

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
