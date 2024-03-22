const crypto = require("crypto");
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash("sha256");
  hash.update(inputs.sort().join("")); //helloworld ,worldhello
  return hash.digest("hex");
};

// let result = cryptoHash("world", "hello", ['hello']);
// console.log(result);
// f7a8edb802259ed6337935be288248adac61fea517a779f25826629955c5aebd

module.exports = cryptoHash;
