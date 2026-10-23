const net = require("net");
const readline = require("readline/promises");


const PORT = 4020
const HOST = "127.0.0.1"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    process.stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    process.stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const socket = net.createConnection(
  { host: HOST, port: PORT },
  async () => {
    console.log("Connected to the server");

    const ask = async () => {
      const message = await rl.question("Enter a message > ");
      // move the cursor one line up
      await moveCursor(0, -1);
      // clear the current line
      await clearLine(0);
      socket.write(`${id}-message-${message}`);
    };
    ask();

    socket.on("data", async (data) => {
      // Cursor is on the prompt line; print an empty line to move down
      console.log();
      // Move back up to the prompt line
      await moveCursor(0, -1);
      // Clear the prompt line
      await clearLine(0);
      if (data.toString("utf-8").substring(0, 2) === "id") {
        // when we are getting the id
        id = data.toString("utf-8").substring(3);

        console.log(`Your id is ${id}!\n`);
      } else {
        //when we are getting a message...
        // Print the incoming message in its place
        console.log(data.toString("utf-8"));
      }
      // Show the prompt again
      ask();
    });
  },
);

socket.on("end", () => {
  console.log("Connection was ended");
});
