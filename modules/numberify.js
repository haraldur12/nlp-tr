exports.toLetter = function( n ) {

    var string = n.toString(), units, tens, scales, start, end, chunks, chunksLen, chunk, ints, i, word, words;
    if( parseInt( string ) === 0 ) {
        return 'sıfır';
    }
    units = [ '', 'bir', 'iki', 'üç', 'dört', 'beş', 'altı', 'yedi', 'sekiz', 'dokuz', 'on', 'on bir', 'on iki', 'on üç', 'on dört', 'on beş', 'on altı', 'on yedi', 'on sekiz', 'on dokuz' ];
    tens = [ '', '', 'yirmi', 'otuz', 'kırk', 'elli', 'altmış', 'yetmiş', 'seksen', 'doksan' ];
    scales = [ '', 'bin', 'milyon', 'milyar', 'trilyon', 'katrilyon', 'quintillion', 'sextillion', 'septillion', 'octillion', 'nonillion', 'decillion', 'undecillion', 'duodecillion', 'tredecillion', 'quatttuor-decillion', 'quindecillion', 'sexdecillion', 'septen-decillion', 'octodecillion', 'novemdecillion', 'vigintillion', 'centillion' ];

    start = string.length;
    chunks = [];
    while( start > 0 ) {
        end = start;
        chunks.push( string.slice( ( start = Math.max( 0, start - 3 ) ), end ) );
    }

    /* Check if function has enough scale words to be able to stringify the user argument */
    chunksLen = chunks.length;
    if( chunksLen > scales.length ) {
        return '';
    }

    /* Stringify each integer in each chunk */
    words = [];
    for( i = 0; i < chunksLen; i++ ) {

        chunk = parseInt( chunks[i] );

        if( chunk ) {

            ints = chunks[i].split( '' ).reverse().map( parseFloat );
            if( ints[1] === 1 ) {
                ints[0] += 10;
            }
            if( ( word = scales[i] ) ) {
                words.push( word );
            }
            if( ( word = units[ ints[0] ] ) ) {
                words.push( word );
            }
            if( ( word = tens[ ints[1] ] ) ) {
                words.push( word );
            }
            if( ( word = units[ ints[2] ] ) ) {
                if(word === 'bir'){
                  words.push('yüz');
                }else {
                  words.push( word + ' yüz' );

                }
            }

        }

    }

    return words.reverse().join( ' ' );

}
