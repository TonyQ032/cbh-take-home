const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  /*
  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
  */

  // Checks if event is truthy
  if (event) {

    // Checks if the event already has a partitionKey value AND if it is a string
    if (event.partitionKey && typeof event.partitionKey === "string") {
      candidate = event.partitionKey;
    }

    // If it fails then we stringify the event and set equal to candidate
    else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }

  } else {
    // If event isn't truthy then candidate is set to TRIVIAL_PARTITION_KEY
    candidate = TRIVIAL_PARTITION_KEY
  }

  // Final check if candidate length is longer than MAX_PARTITION_KEY_LENGTH
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }

  return candidate

};