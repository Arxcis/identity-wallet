import { canonicalize } from "./canonicalize.mjs"
import { sign, constants, createHash } from "crypto"

export const LD_CRYPTOSUITE_REGISTRY = {
    RsaSignature2018: "RsaSignature2018",
    RsaVerificationKey2018: "RsaVerificationKey2018"
}

/**
 * Proof algorithm - @see https://w3c-ccg.github.io/ld-proofs/#proof-algorithm
 *
 * Example 1 - @see https://w3c-ccg.github.io/ld-proofs/#example-2-a-simple-signed-linked-data-document
 * Example 2 - @see https://w3c-ccg.github.io/lds-rsa2018/#examples
 *
 * @param {string} privateKey
 * @param {object} document
 */
export async function rsaProof(privateKey, document, options) {
    // 2) Generate a canonicalized document
    const canonicalizedDocument = canonicalize(document);

    // 3) Create a value 'tbs' that represents the data to be signed, and set it to the result of running the Create Verify Hash Algorithm.
    const tbs = createVerifyHash(options, canonicalizedDocument)

    // 4) Digitally sign tbs using the privateKey and the the digital proof algorithm
    const proofValue = sign("sha256", Buffer.from(tbs), {
        key: privateKey,
        padding: constants.RSA_PKCS1_PSS_PADDING,
    }).toString("base64")

    return {
        ...options,
        "type": LD_CRYPTOSUITE_REGISTRY.RsaSignature2018,
        "signatureValue": proofValue
    }
}

/**
 * Create Verify Hash algorithm - @see https://w3c-ccg.github.io/ld-proofs/#create-verify-hash-algorithm
 */
function createVerifyHash(options, canonicalizedDocument) {
    // 2) If the proof value parameter, such as jws, exists in options, remove the entry.
    const prunedOptions = options = {
        ...options,
        jws: undefined,
        proofValue: undefined,
        signatureValue: undefined
    }

    // 3) If created does not exist in options, add an entry with a value that is an [ISO8601] combined date and time string containing the current date and time accurate to at least one second, in Universal Time Code format. For example: 2017-11-13T20:21:34Z.
    if (!"created" in prunedOptions) {
        prunedOptions.created = (new Date()).toISOString()
    }

    // 4.1) Creating a canonicalized options document by canonicalizing options
    const canonicalizedOptions = canonicalize(prunedOptions);

    // 4.2) Hash canonicalized options document using the message digest algorithm (e.g. SHA-256) and set output to the result
    const hashedOptions = createHash("sha256")
        .update(canonicalizedOptions)
        .digest("hex")

    // 4.3) Hash canonicalized document using the message digest algorithm (e.g. SHA-256) and append it to output.
    const hashedDocument = createHash("sha256")
        .update(canonicalizedDocument)
        .digest("hex")

    // 6) Return output.
    return `${hashedOptions}${hashedDocument}`;
}
