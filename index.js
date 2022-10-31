const { deterministicPartitionKey } = require("./dpk");

const event = {
  howdy: "hello!"
}

console.log(deterministicPartitionKey(event));