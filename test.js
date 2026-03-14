const assert = require('assert');

// Test simple
function addition(a, b) {
  return a + b;
}

assert.strictEqual(addition(2, 3), 5);
assert.strictEqual(addition(0, 0), 0);

console.log('✅ Tous les tests sont passés !');
