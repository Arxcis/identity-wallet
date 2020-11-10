/**
 * ## canonicalize()
 *
 * Copied and modified from Appendix A in json-canonicalization-scheme:
 * @see https://tools.ietf.org/html/draft-rundgren-json-canonicalization-scheme-15#appendix-A
 *
 * @param {object|array|number|string|boolean} input value to be canonicalized
 *
 * @returns canonicalized (aka normalized) representation of input
 */
export function canonicalize(input) {
    if (input === null || typeof input !== 'object') {
        /////////////////////////////////////////////////
        // Primitive data type - Use ES6/JSON          //
        /////////////////////////////////////////////////
        return JSON.stringify(input);

    } else if (Array.isArray(input)) {
        /////////////////////////////////////////////////
        // Array - Maintain element order              //
        /////////////////////////////////////////////////
        return `[${input.map(element => canonicalize(element)).join(",")}]`;

    } else {
        /////////////////////////////////////////////////
        // Object - Sort keys before serializing       //
        /////////////////////////////////////////////////
        return `{${
            Object.keys(input).sort()
            .filter(key => input[key] !== undefined)
            .map(key => {
                ///////////////////////////////////////////////
                // Keys are strings - Use ES6/JSON           //
                ///////////////////////////////////////////////
                return JSON.stringify(key) + ':'
                    //////////////////////////////////////////
                    // value - Recursive expansion          //
                    //////////////////////////////////////////
                    + canonicalize(input[key]);
            })
            .join(",")
        }}`;
    }
};
