import readline from "readline";

const terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

terminal.on("line", (input) => {
  let res = input.split("").reverse().join("");
  console.log(`${res}\n`);
});
