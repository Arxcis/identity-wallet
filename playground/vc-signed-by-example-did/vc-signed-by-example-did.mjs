import crypto from "crypto";
import fs from "fs/promises";

const verificationMethodRsa = "rsa";
const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
const now = new Date()
const ID_CRYPTOSUITE_REGISTRY = {
    RsaSignature2018: "RsaSignature2018",
    RsaVerificationKey2018: "RsaVerificationKey2018"
}

async function makeDid(did) { 

    await shell(`openssl genrsa -out ./${did}.${verificationMethodRsa}.private 1024`);
    await shell(`openssl rsa -in ./${did}.${verificationMethodRsa}.private -out ./${did}.${verificationMethodRsa}.public -pubout -outform PEM`);

    /** PUBLIC_KEY - example: "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n" */
    const PUBLIC_KEY = await shell(`cat ./${did}.${verificationMethodRsa}.public`);

    const didDocument = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "verificationMethod": [
            {
                "id": `${did}#${verificationMethodRsa}`,
                "type": ID_CRYPTOSUITE_REGISTRY.RsaVerificationKey2018,
                "controller": did,
                "expires": oneYearFromNow.toISOString(),
                "publicKeyPem": PUBLIC_KEY,
            }
        ],
        "assertionMethod": [
            `#${verificationMethodRsa}`
        ],
        "service": [{
            "id": `${did}#credentials`,
            "type": "CredentialRepositoryService",
            "serviceEndpoint": "https://repository.example.com/credentials"
        }]
    }

    await fs.writeFile(`${did}.document`, JSON.stringify(didDocument, null, 2))
}

const issuerDid = `did:demo:issuer`;
const subjectDid = `did:demo:subject`;
await Promise.all([
    makeDid(issuerDid),
    makeDid(subjectDid),
]);

/**
 * Generate verifiable credential signed by ¨did'
 */
const credentialId = 1868;
const unverifiableCredential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": `${issuerDid}/credentials/${credentialId}`,
    "type": ["VerifiableCredential", "WordsPerMinuteHighscore"],
    "issuer": issuerDid,
    "issued": now.toISOString(),
    "issuanceDate": now.toISOString(), // @deprecated in favor of "issued"
    "validFrom": now.toISOString(),
    "expirationDate": oneYearFromNow.toISOString(),
    "credentialStatus": {
        "id": `${issuerDid}/credentials/${credentialId}/status`,
        "type": "CredentialStatusList2017"
    },
    "credentialSubject": {
        "id": `${subjectDid}`,
        "wordsPerMinute": 158,
        "hitKeys": 1337,
        "missedKeys": 2,
    },
};

const credentialFilename = `${issuerDid}.credential.${credentialId}`;

import { canonicalize } from "../../lib/canonicalize.mjs"

await fs.writeFile(credentialFilename, canonicalize(unverifiableCredential))
await shell(`\
openssl dgst\
    -sha256 \
    -sign ${issuerDid}.rsa.private \
    -out ${credentialFilename}.signature \
    ${credentialFilename}`
);

const file = await fs.readFile(`${credentialFilename}.signature`, { encoding: 'base64' })

/**
 * @see https://w3c-ccg.github.io/ld-proofs/#example-2-a-simple-signed-linked-data-document 
 * @see https://w3c-ccg.github.io/lds-rsa2018/#examples 
 */
const proof = [{
    "type": ID_CRYPTOSUITE_REGISTRY.RsaSignature2018,
    "created": now.toISOString(),
    "proofPurpose": "assertionMethod",
    "domain": issuerDid,
    "verificationMethod": `${issuerDid}#${verificationMethodRsa}`,
    "signatureValue": file.toString()
}]

const veriafiableCredential = {
    ...unverifiableCredential,
    proof
}

await fs.writeFile(`${credentialFilename}.verifiable`, JSON.stringify(veriafiableCredential, null, 2))


/** shell - helper-function to do shell commands */
import { exec } from "child_process";
export function shell(cmd) {
    return new Promise((resolve, reject) => {
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve(stdout ? stdout : stderr);
        });
    });
}
