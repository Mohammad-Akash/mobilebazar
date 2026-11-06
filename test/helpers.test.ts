import assert from 'node:assert'
import { validateIMEI } from '../src/lib/utils/imei'
import { generateAdTitle } from '../src/lib/utils/ad-title'

console.log('--- RUNNING HELPERS UNIT TESTS ---')

// 1. IMEI Validation Tests
// Valid IMEI: 356938035643803 (known valid Luhn)
// Let's test standard IMEI examples:
// 490154203237518 -> check Luhn
assert.strictEqual(validateIMEI('490154203237518'), true, 'Valid 15-digit IMEI should pass')
assert.strictEqual(validateIMEI('49-015420-323751-8'), true, 'Valid IMEI with hyphens should pass')
assert.strictEqual(validateIMEI('490154203237519'), false, 'IMEI with incorrect checksum digit should fail')
assert.strictEqual(validateIMEI('12345'), false, 'Short IMEI should fail')
assert.strictEqual(validateIMEI('490154203237518123'), false, 'Long IMEI should fail')
assert.strictEqual(validateIMEI('abcdefghijklmno'), false, 'Non-numeric string should fail')
assert.strictEqual(validateIMEI(''), false, 'Empty string should fail')

console.log('✓ IMEI Tests Passed')

// 2. Title Generation Tests
assert.strictEqual(
  generateAdTitle({
    brandName: 'Apple',
    modelName: 'iPhone 13',
    storageGb: 128,
    ptaStatus: 'pta_approved',
  }),
  'Apple iPhone 13 128GB PTA Approved',
  'Title should correctly format iPhone 13'
)

assert.strictEqual(
  generateAdTitle({
    brandName: 'Samsung',
    modelName: 'Samsung Galaxy S23',
    storageGb: 256,
    ptaStatus: 'non_pta',
  }),
  'Samsung Galaxy S23 256GB Non-PTA',
  'Title should not duplicate brand if model already starts with brand name'
)

assert.strictEqual(
  generateAdTitle({
    brandName: 'Apple',
    modelName: 'iPhone 15 Pro Max',
    storageGb: 1024,
    ptaStatus: 'jv',
  }),
  'Apple iPhone 15 Pro Max 1TB JV',
  'Title should format 1024GB as 1TB'
)

console.log('✓ Title Generator Tests Passed')
console.log('--- ALL HELPER TESTS PASSED SUCCESSFULLY ---')
