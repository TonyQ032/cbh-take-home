const { deterministicPartitionKey } = require("./dpk");

const event1 = {
  partitionKey: "37f558134baa535903c6a88931c8122e334368bf951f2cada569b11774ef9795ef6d2ac961d13ee44a0c837db3817bb9db68ac3bdfb8b19a1308618484a9da8f"
}

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Properly creates a hash when a number is input", () => {
    const partitionKey = deterministicPartitionKey(4555);
    expect(partitionKey).toBe("6648f883adaf72141573873eeb13e43d544a8caeb3d19ad38f286aef8b0f4119ef5377a7eda0f795b3c738581cbc1b6d7e7189a4bc62acf8355aaef2fd5e2c6a");
  });

  it("Returns partitionKey if event is an object with an already created partitionKey", () => {
    const partitionKey = deterministicPartitionKey(event1);
    expect(partitionKey).toBe(event1.partitionKey);
  });

  it("Returns a string", () => {
    const partitionKey = deterministicPartitionKey(event1);

    expect(typeof partitionKey).toBe("string");
  });

});
