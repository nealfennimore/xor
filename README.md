[![codecov](https://codecov.io/gh/nealfennimore/xor/branch/master/graph/badge.svg)](https://codecov.io/gh/nealfennimore/xor)

# Simple XOR module

Small module for running strings through a XOR cipher

## Basic encryption and decryption example

```js
const { toChar, xorStrings } = require( '@nfen/xor' );

function encrypt( key, clearText ) {
    return toChar( xorStrings( key, clearText ) );
}

function decrypt( key, cipherText ) {
    return toChar( xorStrings( key, cipherText ) );
}

console.assert(
    decrypt( 'whatever', encrypt( 'whatever', 'what is this sentence huh' ) ) === 'what is this sentence huh'
);
```