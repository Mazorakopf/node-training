const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.on('line', (input) => {
    var res = input.split("").reverse().join("");
    console.log(`${res}\n`);
  });
