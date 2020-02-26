import * as plugin from '../index';

function encrypt( key, clearText ) {
    return plugin.toChar( plugin.xorStrings( key, clearText ) );
}

function decrypt( key, cipherText ) {
    return plugin.toChar( plugin.xorStrings( key, cipherText ) );
}

describe( 'XOR Plugin', ()=>{

    describe( 'toChar', ()=>{
        it( 'should convert a buffer to string', ()=>{
            const buffer = new ArrayBuffer( 2 );
            const uint16 = new Uint16Array( buffer );

            uint16[0] = 'a'.codePointAt( 0 );

            expect( plugin.toChar( buffer ) ).toEqual( 'a' );
        } );
        it( 'should convert a buffer to string', ()=>{
            const buffer = new ArrayBuffer( 6 );
            const uint16 = new Uint16Array( buffer );

            uint16[0] = 'a'.codePointAt( 0 );
            uint16[1] = 'b'.codePointAt( 0 );
            uint16[2] = 'c'.codePointAt( 0 );

            expect( plugin.toChar( buffer ) ).toEqual( 'abc' );
        } );
    } );

    describe( 'xorStrings', ()=>{
        const tests = [
            { args: ['a', 'b'], result: [3] },
            { args: ['ab', 'ac'], result: [0,1]},
            { args: ['abdiejw', 'oiwjeweojfwe'], result: [ 14, 11, 19, 3, 0, 29, 18, 14, 8, 2, 30, 0, ] },
            { args: ['a', '🐶'] , result: [ 62551, 56407 ] }
        ];

        tests.forEach( ( test, i ) => {
            it( `should XOR two strings ${i}`, ()=>{
                const arrBuffer = plugin.xorStrings( ...test.args );
                const buffer = new Uint16Array( arrBuffer );
                const values = Array.from( buffer.values() );
                expect( values ).toEqual( test.result );
            } );
        } );
    } );

    describe( 'Encrypt', ()=>{
        const tests = [
            { args: ['a', 'bc'], result: null },
            { args: ['🐶', '👩‍❤️‍👩'], result: null },
            { args: ['👩‍❤️‍👩', '🐶'], result: null },

        ];

        tests.forEach( ( test, i ) => {
            it( `should encrypt properly ${i}`, ()=>{
                expect( encrypt( ...test.args ) ).toMatchSnapshot();
            } );
        } );
    } );

    describe( 'Decrypt', ()=>{
        const tests = [
            { args: ['key', 'abc'], result: 'abc' },
            { args: ['whatever', 'what is this sentence huh'], result: 'what is this sentence huh' },
            { args: ['abc', 'cba'], result: 'cba' },
            // { args: ['a', '🐶'], result: '🐶' }, // TODO: Add astral plane support
        ];

        tests.forEach( ( test, i ) => {
            it( `should decrypt properly ${i}`, ()=>{
                expect(
                    decrypt( test.args[0], encrypt( ...test.args ) )
                ).toEqual( test.result );
            } );
        } );

        expect(
            decrypt( 'wrong-key', encrypt( 'whatever', 'I should not work' ) )
        ).not.toEqual( 'I should not work' );

    } );
} );
