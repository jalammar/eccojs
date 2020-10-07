import XRegExp from "XRegExp";

export function token_styler(selection) {
    console.log('styler:', selection, typeof (selection), typeof ('hi'))
    selection
        .classed('token', function (d, i) {
            return true
        })
        .classed('new-line', function (d, i) {
            // console.log('nl', d, d == '\n')
            return d.token === '\n'; // True if new line
        })
        .classed('token-part', function (d, i) {
            // If the first character is a space, then this is a partial token
            // Except if the token only has one character
            if (d.token.length > 1 && d.token[0] !== ' ')
                return true
                // If a single letter, then it's part of the preceeding word
                // This is especially the case with WordPiece, where "It" is
            // broken into the tokens "_T" and "t"
            else if ((d.token.length === 1) && XRegExp("^\\pL+$").test(d.token)) {
                return true
            } else
                return false

        })
        .classed('input-token', function (d, i) {
            return d.type === 'input';
        })
        .classed('output-token', function (d, i) {
            return d.type === 'output';
        })
}

export function display_token(token) {
    if (token === ' ') {
        return '\xa0'
    }
    if (token === '\n') { // Was: '\n'
        // console.log('new line')
        return '\\n'
    }
    return token
}