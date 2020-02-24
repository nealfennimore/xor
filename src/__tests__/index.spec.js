import * as plugin from '../index';

function encrypt( key, clearText ) {
    return plugin.toChar( plugin.xorStrings( key, clearText ) );
}

function decrypt( key, cipherText ) {
    return plugin.toChar( plugin.xorStrings( key, cipherText ) );
}

describe( 'XOR Plugin', ()=>{

    describe( 'toBinary', ()=>{
        it( 'should convert a string to it\'s binary representation', ()=>{
            expect( plugin.toBinary( 'a' ) ).toEqual( '0000000001100001' );
            expect( plugin.toBinary( 'abc' ) ).toEqual( '000000000110000100000000011000100000000001100011' );
        } );
    } );

    describe( 'toChar', ()=>{
        it( 'should convert a binary string to it\'s character representation', ()=>{
            expect( plugin.toChar( '0000000001100001' ) ).toEqual( 'a' );
            expect( plugin.toChar( '000000000110000100000000011000100000000001100011' ) ).toEqual( 'abc' );
        } );
    } );

    describe( 'xor', ()=>{
        it( 'should xor a string', ()=>{
            expect( plugin.xor( '1', '0' ) ).toEqual( 1 );
            expect( plugin.xor( '0', '1' ) ).toEqual( 1 );
            expect( plugin.xor( '1', '1' ) ).toEqual( 0 );
            expect( plugin.xor( '0', '0' ) ).toEqual( 0 );
        } );
        it( 'should xor a number', ()=>{
            expect( plugin.xor( 1, 0 ) ).toEqual( 1 );
            expect( plugin.xor( 0, 1 ) ).toEqual( 1 );
            expect( plugin.xor( 1, 1 ) ).toEqual( 0 );
            expect( plugin.xor( 0, 0 ) ).toEqual( 0 );
        } );
    } );

    describe( 'xorStrings', ()=>{
        it( 'should XOR two strings', ()=>{
            expect( plugin.xorStrings( 'a', 'b' ) ).toEqual( '0000000000000011' );
            expect( plugin.xorStrings( 'b', 'a' ) ).toEqual( '0000000000000011' );
            expect( plugin.xorStrings( 'abc', 'cba' ) ).toEqual( '000000000000001000000000000000000000000000000010' );
        } );
    } );

    describe( 'Encrypt', ()=>{
        it( 'should encrypt properly', ()=>{
            expect( encrypt( 'a', 'bc' ) ).toEqual( '' );
        } );
    } );

    describe( 'Decrypt', ()=>{
        it( 'should decrypt properly', ()=>{
            expect(
                decrypt( 'key', encrypt( 'key', 'abc' ) )
            ).toEqual( 'abc' );

            expect(
                decrypt( 'whatever', encrypt( 'whatever', 'what is this sentence huh' ) )
            ).toEqual( 'what is this sentence huh' );

            expect(
                decrypt( 'abc', encrypt( 'abc', 'cba' ) )
            ).toEqual( 'cba' );

            expect(
                decrypt( 'wrong-key', encrypt( 'whatever', 'I should not work' ) )
            ).not.toEqual( 'I should not work' );
        } );

    } );
} );
