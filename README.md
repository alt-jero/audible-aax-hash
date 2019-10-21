# audible-aax-hash

## Description
Node.Js module for calculating an Audible aax file's hash based on the activation_bytes used to decode with ffmpeg

## Usage
### Importing
```JavaScript
// ES2015 Import
import { createAudibleHash } from 'audible-aax-hash'
// CommonJs Require
const { createAudibleHash } = require('audible-aax-hash')
```
### Creating input Buffer
```JavaScript
// Create Input Buffer from hex string
const inputBytes = Buffer.from('6279ba06', 'hex')

// Use Integer
const inputInt = 0x6279ba06
const inputBytes = Buffer.alloc(4)
inputBytes.writeUInt32BE(inputInt)

// Use Byte Array
const inputBytes = Buffer.from([ 0x62, 0x79, 0xba, 0x06 ])
```
### Calculate a hash
```JavaScript
// Outputs another Buffer
console.log(createAudibleHash(inputBytes))
// <Buffer 8b 2b df 18 67 b2 07 3e 35 d1 4e 51 19 73 02 12 8b 75 61 34>
```

## Testing
```
$ npm t
```

## Story
In trying to decrypt my Audible audiobooks, I found the current methods of obtaining the key lacking on Mac OS, so I started experimenting with rainbow tables and brute force in Node.Js. This algorithm is cobbled together from a couple other implementations in C/C++, since there was none available for node.
