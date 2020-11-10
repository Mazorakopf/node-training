import readline from 'readline';

var terminal = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

terminal.on('line', (input) => {
    var res = input.split("").reverse().join("");
    console.log(`${res}\n`);
  });
