import test from 'ava'
const { createAudibleHash } = require('./AudibleHashOptimized')

test('Test Hash Algorithm with known values', t => {
  // Known valid key from: http://archive.is/U0c83
  const input = '6279ba06'
  const output = '8b2bdf1867b2073e35d14e51197302128b756134'
  const result = createAudibleHash(Buffer.from(input, 'hex')).toString('hex')
  t.assert(result === output)
})