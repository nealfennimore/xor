/**
 * Convert buffer to character string
 *
 * @param {ArrayBuffer} buffer Buffer of code points
 * @returns Character String
 */
export function toChar( arrBuffer ) {
    return String.fromCodePoint.apply( null, new Uint16Array( arrBuffer ) );
}

/**
 * Perform XOR operations with a key
 *
 * @param {String} key Key to XOR
 * @param {String} text Text to XOR
 * @returns {ArrayBuffer} Buffer of XOR'd code points
 * @exports
 */
export function xorStrings( key, text ) {
    const keyLength = key.length;
    const textLength = text.length;

    const arrBuffer = new ArrayBuffer( textLength * 2 );
    const buffer = new Uint16Array( arrBuffer );

    for ( let i = 0; i < textLength; i++ ) {
        const keyCodePoint = key.codePointAt( i % keyLength );
        const textCodePoint = text.codePointAt( i );

        buffer[i] = keyCodePoint ^ textCodePoint;
    }

    return arrBuffer;
}
