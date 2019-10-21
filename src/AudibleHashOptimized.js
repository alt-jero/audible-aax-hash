/**
 * Audible Hash - This file contains optimized code
 * Optimization: Minimize computational overhead
 * @module audible-aax-hash
 * @requires crypto
 * @exports createAudibleHash
 */
const { createHash } = require('crypto')

/**
 * @constant fixedKey An audible-specific constant for the algorithm; 16 bytes
 */
const fixedKey = Buffer.from([
  0x77, 0x21, 0x4d, 0x4b,
  0x19, 0x6a, 0x87, 0xcd,
  0x52, 0x00, 0x45, 0xfd,
  0x20, 0xa5, 0x1d, 0x67
])

/**
 * Use Buffers allocated on module instatiation
 * - They will be fully filled by input and so don't need
 * to be zeroed between calls.
 */
const keyInput = Buffer.alloc(20)
const ivInput = Buffer.alloc(40)
const resultInput = Buffer.alloc(32)

/**
 * Hash a value using the Audible hash algorithm. Input should be
 * a buffer containing 4 bytes.
 * @param {Buffer} inputBytes a Buffer containing input-bytes
 * @returns {Buffer}
 */
function createAudibleHash(inputBytes) {
  // First Hash round: 16 + 4 = 20 bytes in, 20 out
  fixedKey.copy(keyInput, 0)
  inputBytes.copy(keyInput, 16)
  const intermediateKey = createHash('sha1')
  .update(keyInput)
  .digest()
  
  // Second Hash round: Sandwich previous result into 
  fixedKey.copy(ivInput, 0)
  intermediateKey.copy(ivInput, 16)
  inputBytes.copy(ivInput, 36)
  const intermediateIV = createHash('sha1')
  .update(ivInput)
  .digest()

  
  // Third Hash round: Previous two; 32 Bytes in, 20 out
  intermediateKey.copy(resultInput, 0, 0, 16)
  intermediateIV.copy(resultInput, 16, 0, 16)
  return createHash('sha1')
  .update(resultInput)
  .digest()
}

module.exports = {
  createAudibleHash
}