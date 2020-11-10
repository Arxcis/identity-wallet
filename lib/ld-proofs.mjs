import { canonicalize } from "./canonicalize.mjs"
import { sign, constants} from "crypto"

export const LD_CRYPTOSUITE_REGISTRY = {
    RsaSignature2018: "RsaSignature2018",
    RsaVerificationKey2018: "RsaVerificationKey2018"
}

/**
 * @see https://w3c-ccg.github.io/ld-proofs/#example-2-a-simple-signed-linked-data-document 
 * @see https://w3c-ccg.github.io/lds-rsa2018/#examples 
 * 
 * @param {string} privateKey
 * @param {object} LD
 */
export async function rsaProof(privateKey, LD, options) {
    const canonicalizedLD = canonicalize(LD);
    const signature = sign("sha256", Buffer.from(canonicalizedLD), {
        key: privateKey,
        padding: constants.RSA_PKCS1_PSS_PADDING,
    })

    return [{
        ...options,
        "type": LD_CRYPTOSUITE_REGISTRY.RsaSignature2018,
        "signatureValue": signature.toString("base64")
    }]
}
