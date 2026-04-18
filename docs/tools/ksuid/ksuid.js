/**
 * Vanilla JavaScript KSUID Implementation
 * A K-Sortable Unique IDentifier library
 * Compatible with the Go reference implementation
 */

const KSUID = (() => {
  // Constants
  const EPOCH_TIME = 1400000000;
  const TIMESTAMP_LENGTH = 4;
  const PAYLOAD_LENGTH = 16;
  const KSUID_LENGTH = TIMESTAMP_LENGTH + PAYLOAD_LENGTH;

  // Base62 alphabet for encoding
  const BASE62_ALPHABET =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

  /**
   * Generate cryptographically secure random bytes
   */
  function randomBytes(length) {
    const bytes = new Uint8Array(length);
    if (typeof crypto !== "undefined" && crypto.getRandomValues) {
      crypto.getRandomValues(bytes);
    } else if (typeof require !== "undefined") {
      // Node.js fallback
      const nodeCrypto = require("crypto");
      return nodeCrypto.randomBytes(length);
    } else {
      throw new Error("No secure random source available");
    }
    return bytes;
  }

  /**
   * Get current timestamp in KSUID epoch
   */
  function getTimestamp() {
    return Math.floor(Date.now() / 1000) - EPOCH_TIME;
  }

  /**
   * Encode bytes to Base62 string
   */
  function encodeBase62(bytes) {
    let str = "";
    let num = 0n;

    // Convert bytes to big integer
    for (let byte of bytes) {
      num = num * 256n + BigInt(byte);
    }

    // Convert to base62
    if (num === 0n) {
      return "0";
    }

    while (num > 0n) {
      str = BASE62_ALPHABET[Number(num % 62n)] + str;
      num = num / 62n;
    }

    // Pad with zeros to ensure consistent length
    const expectedLength = Math.ceil((bytes.length * 8) / Math.log2(62));
    while (str.length < expectedLength) {
      str = "0" + str;
    }

    return str;
  }

  /**
   * Decode Base62 string to bytes
   */
  function decodeBase62(str) {
    let num = 0n;

    for (let char of str) {
      const index = BASE62_ALPHABET.indexOf(char);
      if (index === -1) {
        throw new Error(`Invalid base62 character: ${char}`);
      }
      num = num * 62n + BigInt(index);
    }

    // Convert big integer to bytes
    const bytes = [];
    if (num === 0n) {
      return new Uint8Array(KSUID_LENGTH);
    }

    while (num > 0n) {
      bytes.unshift(Number(num % 256n));
      num = num / 256n;
    }

    // Pad to correct length
    while (bytes.length < KSUID_LENGTH) {
      bytes.unshift(0);
    }

    return new Uint8Array(bytes);
  }

  /**
   * Convert bytes to hex string
   */
  function bytesToHex(bytes) {
    return Array.from(bytes)
      .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
      .join("");
  }

  /**
   * Convert hex string to bytes
   */
  function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
      bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return new Uint8Array(bytes);
  }

  /**
   * KSUID Class
   */
  class KSUID {
    constructor(bytes) {
      if (bytes && bytes.length !== KSUID_LENGTH) {
        throw new Error(
          `Invalid KSUID length: expected ${KSUID_LENGTH}, got ${bytes.length}`,
        );
      }
      this.bytes = bytes || new Uint8Array(KSUID_LENGTH);
    }

    /**
     * Generate a random KSUID
     */
    static random() {
      const timestamp = getTimestamp();
      const payload = randomBytes(PAYLOAD_LENGTH);
      return KSUID.fromParts(timestamp, payload);
    }

    /**
     * Create KSUID from timestamp and payload
     */
    static fromParts(timestamp, payload) {
      const bytes = new Uint8Array(KSUID_LENGTH);

      // Write timestamp (4 bytes, big-endian)
      bytes[0] = (timestamp >>> 24) & 0xFF;
      bytes[1] = (timestamp >>> 16) & 0xFF;
      bytes[2] = (timestamp >>> 8) & 0xFF;
      bytes[3] = timestamp & 0xFF;

      // Write payload
      bytes.set(payload, TIMESTAMP_LENGTH);

      return new KSUID(bytes);
    }

    /**
     * Parse KSUID from string
     */
    static parse(str) {
      if (typeof str !== "string" || str.length !== 27) {
        throw new Error("Invalid KSUID string");
      }
      return new KSUID(decodeBase62(str));
    }

    /**
     * Parse KSUID from bytes
     */
    static fromBytes(bytes) {
      return new KSUID(new Uint8Array(bytes));
    }

    /**
     * Convert to string representation
     */
    toString() {
      return encodeBase62(this.bytes).padStart(27, "0");
    }

    /**
     * Convert to raw hex string
     */
    toRaw() {
      return bytesToHex(this.bytes);
    }

    /**
     * Get timestamp component
     */
    getTimestamp() {
      return (
        ((this.bytes[0] << 24) >>> 0) |
        ((this.bytes[1] << 16) >>> 0) |
        ((this.bytes[2] << 8) >>> 0) |
        this.bytes[3]
      );
    }

    /**
     * Get timestamp as Date
     */
    getTime() {
      return new Date((this.getTimestamp() + EPOCH_TIME) * 1000);
    }

    /**
     * Get payload bytes
     */
    getPayload() {
      return this.bytes.slice(TIMESTAMP_LENGTH);
    }

    /**
     * Get payload as hex string
     */
    getPayloadString() {
      return bytesToHex(this.getPayload());
    }

    /**
     * Generate next KSUID with incremented payload
     */
    next() {
      const bytes = new Uint8Array(this.bytes);

      // Increment from the end
      for (let i = KSUID_LENGTH - 1; i >= TIMESTAMP_LENGTH; i--) {
        if (bytes[i] === 255) {
          bytes[i] = 0;
        } else {
          bytes[i]++;
          break;
        }
      }

      return new KSUID(bytes);
    }

    /**
     * Generate previous KSUID with decremented payload
     */
    prev() {
      const bytes = new Uint8Array(this.bytes);

      // Decrement from the end
      for (let i = KSUID_LENGTH - 1; i >= TIMESTAMP_LENGTH; i--) {
        if (bytes[i] === 0) {
          bytes[i] = 255;
        } else {
          bytes[i]--;
          break;
        }
      }

      return new KSUID(bytes);
    }

    /**
     * Compare with another KSUID
     */
    compare(other) {
      for (let i = 0; i < KSUID_LENGTH; i++) {
        if (this.bytes[i] < other.bytes[i]) return -1;
        if (this.bytes[i] > other.bytes[i]) return 1;
      }
      return 0;
    }

    /**
     * Check equality
     */
    equals(other) {
      return this.compare(other) === 0;
    }

    /**
     * Get bytes
     */
    toBytes() {
      return new Uint8Array(this.bytes);
    }
  }

  return {
    KSUID,
    random: () => KSUID.random(),
    parse: (str) => KSUID.parse(str),
    fromBytes: (bytes) => KSUID.fromBytes(bytes),
    fromParts: (timestamp, payload) => KSUID.fromParts(timestamp, payload),
  };
})();

// Export for different environments
if (typeof module !== "undefined" && module.exports) {
  module.exports = KSUID;
}

export default KSUID;