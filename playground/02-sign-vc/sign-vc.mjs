import { writeFile } from "fs/promises";
import { rsaProof, LD_CRYPTOSUITE_REGISTRY } from "../../lib/ld-proofs.mjs"
import { writeRsaKeyPair, readRsaPublicKey, readRsaPrivateKey } from "../../lib/did-keys.mjs"

const verificationMethodRsa = "rsa";
const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));
const now = new Date()

async function makeDid(did) {
    await writeRsaKeyPair(did, 1024)

    const PUBLIC_KEY = await readRsaPublicKey(did)

    const didDocument = {
        "@context": "https://www.w3.org/ns/did/v1",
        "id": did,
        "verificationMethod": [
            {
                "id": `${did}#${verificationMethodRsa}`,
                "type": LD_CRYPTOSUITE_REGISTRY.RsaVerificationKey2018,
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

    await writeFile(`${did}.document`, JSON.stringify(didDocument, null, 2))
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

const PRIVATE_KEY = await readRsaPrivateKey(issuerDid);

const proof = await rsaProof(PRIVATE_KEY, unverifiableCredential, {
    "created": now.toISOString(),
    "proofPurpose": "assertionMethod",
    "domain": issuerDid,
    "verificationMethod": `${issuerDid}#${verificationMethodRsa}`,
})

const veriafiableCredential = {
    ...unverifiableCredential,
    proof
}

await writeFile(`${issuerDid}.credential.${credentialId}.verifiable`, JSON.stringify(veriafiableCredential, null, 2))
