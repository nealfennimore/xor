/**
 * Convert character string to binary
 *
 * @param {String} str Character string
 * @returns Binary String
 */
export function toBinary( str ) {
    let binary = '';
    for ( let i = 0, l = str.length; i < l; i++ ) {
        binary += str.codePointAt( i ).toString( 2 ).padStart( 8, '0' );
    }
    return binary;
}

/**
 * Convert binary string to character string
 *
 * @param {String} binary Binary String
 * @returns Character String
 */
export function toChar( binary ) {
    let str = '';
    for ( let i = 0, l = binary.length / 8; i < l; i++ ) {
        const start = i * 8;
        const byte = binary.slice( start, start + 8 );
        const codePoint = parseInt( byte, 2 );
        str += String.fromCodePoint( codePoint );
    }
    return str;
}

/**
 * Perform exclusive OR operation
 *
 * @param {Number|String} a
 * @param {Number|String} b
 * @returns {Number} 0 or 1
 * @exports
 */
export function xor( a, b ) {
    return +( a !== b );
}

/**
 * Perform XOR operations with a key
 *
 * @param {String} key Key to XOR
 * @param {String} text Text to XOR
 * @returns {String} XOR'd string
 * @exports
 */
export function xorStrings( key, text ) {
    const keyBin = toBinary( key );
    const keyLength = keyBin.length;
    const textBin = toBinary( text );
    const textLength = textBin.length;

    let xorText = '';

    for ( let i = 0; i < textLength; i++ ) {
        const ctElement = textBin[i];
        const keyElement = keyBin[i % keyLength];

        xorText += xor( ctElement, keyElement ).toString();
    }

    return xorText;
}

