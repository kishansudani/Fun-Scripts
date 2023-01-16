const prompt = require("prompt-sync")({ sigint: true });
const hex = prompt("Input Hex ");

function reverse(hex) {
  return reverseBuffer(Buffer.from(hex, 'hex')).toString('hex');
}

function reverseBuffer(buff) {
  const reversed = Buffer.alloc(buff.length);
  for (let i = buff.length - 1; i >= 0; i--) {
    reversed[buff.length - i - 1] = buff[i];
  }
  return reversed;
};

console.log(reverse(hex));