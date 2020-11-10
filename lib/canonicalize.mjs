/**
 * canonicalize - Copied and modified from Appendix A in json-canonicalization-scheme:
 * @see https://tools.ietf.org/html/draft-rundgren-json-canonicalization-scheme-15#appendix-A
 * 
 * @returns canonicalized (normalized) representation of any javascript value/object
 */
export function canonicalize(object) {
    if (object === null || typeof object !== 'object') {
        /////////////////////////////////////////////////
        // Primitive data type - Use ES6/JSON          //
        /////////////////////////////////////////////////
        return JSON.stringify(object);

    } else if (Array.isArray(object)) {
        /////////////////////////////////////////////////
        // Array - Maintain element order              //
        /////////////////////////////////////////////////
        return `[${object.map(element => canonicalize(element)).join(",")}]`;
    } else {
        /////////////////////////////////////////////////
        // Object - Sort keys before serializing       //
        /////////////////////////////////////////////////
        return `{${
            Object.keys(object).sort()
            .map(key => {
                ///////////////////////////////////////////////
                // Keys are strings - Use ES6/JSON           //
                ///////////////////////////////////////////////
                return JSON.stringify(key) + ':' 
                    //////////////////////////////////////////
                    // value - Recursive expansion          //
                    //////////////////////////////////////////
                    + canonicalize(object[key]);
                   
            })
            .join(",")
        }}`;
    }
};