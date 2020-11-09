import crypto from "crypto";
import fs from "fs/promises";

const issuerDid = `did:example:issuer`;

await shell(`openssl genrsa -out ./${issuerDid}.rsa.private 1024`);
await shell(`openssl rsa -in ./${issuerDid}.rsa.private -out ./${issuerDid}.rsa.public -pubout -outform PEM`);

/** PUBLIC_KEY - example: "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n" */
const PUBLIC_KEY = await shell(`cat ./${issuerDid}.rsa.public`);
const ID_CRYPTOSUITE_REGISTRY = {
    RsaSignature2018: "RsaSignature2018",
    RsaVerificationKey2018: "RsaVerificationKey2018"
}
const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
const now = new Date()

const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",
    "id": issuerDid,
    "verificationMethod": [
        {
            "id": `${issuerDid}#verification-method-rsa`,
            "type": ID_CRYPTOSUITE_REGISTRY.RsaVerificationKey2018,
            "controller": issuerDid,
            "expires": oneYearFromNow.toISOString(),
            "publicKeyPem": PUBLIC_KEY,
        }
    ],
}

await fs.writeFile(`${issuerDid}.document`, JSON.stringify(didDocument, null, 2))

/**
 * Generate verifiable credential signed by ¨did'
 */
const credentialId = 1868;
const unverifiableCredential = {
    "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://www.w3.org/2018/credentials/examples/v1"
    ],
    "id": `${issuerDid}/credentials/${credentialId}?service=credentialService`,
    "type": ["VerifiableCredential", "WPMHighscoreCredential"],
    "issuer": issuerDid,
    "issued": now.toISOString(),
    "issuanceDate": now.toISOString(), // @deprecated in favor of "issued"
    "validFrom": now.toISOString(),
    "expirationDate": oneYearFromNow.toISOString(),
    "credentialStatus": {
        "id": `${issuerDid}/credentials/${credentialId}/status?service=credentialService`,
        "type": "CredentialStatusList2017"
    },
};

await fs.writeFile(`${issuerDid}.document`, JSON.stringify(didDocument, null, 2))

const proof = {
    "proof": {
        "type": ID_CRYPTOSUITE_REGISTRY.RsaSignature2018,
        "created": now.toISOString(),
        "proofPurpose": "assertionMethod",
        "verificationMethod": `${issuerDid}#verification-method-rsa`,
    }
}

await fs.writeFile(`${issuerDid}.credential.${credentialId}`, JSON.stringify(didDocument, null, 2))




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
