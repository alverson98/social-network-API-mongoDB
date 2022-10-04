//seeded user data
const userSeed = [
  {
    username: "johnsmith1",
    email: "johnsmith@email.com",
  },
  {
    username: "janesmith2",
    email: "janesmith@email.com",
  },
  {
    username: "lillyblack3",
    email: "lillyblack@email.com",
  },
  {
    username: "briangoldberg4",
    email: "briangoldberg@email.com",
  },
  {
    username: "victoriasaylor5",
    email: "victoriasaylor@email.com",
  },
];

//seeded thought data
const thoughtSeed = [
  {
    thoughtText:
      "It's officially fall. We all know what that means... pumpkin everything!!",
    username: "johnsmith1",
  },
  {
    thoughtText:
      "I think my favorite fall food is butternut squash soup. There's nothing more warming and satisfying!",
    username: "janesmith2",
  },
  {
    thoughtText:
      "Fall is my least favorite season. Why can't we go back to summer? *shrugs*",
    username: "lillyblack3",
  },
  {
    thoughtText:
      "Halloween is going to be the best this year since I have the best costume planned.",
    username: "briangoldberg4",
  },
  {
    thoughtText:
      "I cannot wait for Thanksgiving this year. I'm craving some green bean casserole!",
    username: "victoriasaylor5",
  },
];

//exporting the data
module.exports = { userSeed, thoughtSeed };
