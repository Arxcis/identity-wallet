import { canonicalize } from "./canonicalize.mjs"
import { writeFile, readFile } from "fs/promises";
import { shell } from "./shell.mjs"

export const LD_CRYPTOSUITE_REGISTRY = {
    RsaSignature2018: "RsaSignature2018",
    RsaVerificationKey2018: "RsaVerificationKey2018"
}

/**
 * @see https://w3c-ccg.github.io/ld-proofs/#example-2-a-simple-signed-linked-data-document 
 * @see https://w3c-ccg.github.io/lds-rsa2018/#examples 
 */
export async function rsaProof(privateKeyFile, unverifiableCredential, options) {

    await writeFile("./tmp.credential", canonicalize(unverifiableCredential))
    await shell(`\
    openssl dgst\
        -sha256 \
        -sign ${privateKeyFile} \
        -out ./tmp.signature \
        ./tmp.credential
    `);

    const file = await readFile(`./tmp.signature`, { encoding: 'base64' })

    return [{
        ...options,
        "type": LD_CRYPTOSUITE_REGISTRY.RsaSignature2018,
        "signatureValue": file.toString()
    }]
}
