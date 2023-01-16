const prompt = require("prompt-sync")({ sigint: true });
const str = prompt("Input str ");

const buff = Buffer.from(str, "utf-8");
console.log(str);