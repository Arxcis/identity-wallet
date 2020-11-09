import crypto from "crypto";
import fs from "fs/promises";

/** @see https://www.w3.org/TR/did-core/#did-syntax */
const randomDid = `did:random:${crypto.randomBytes(16).toString('hex')}`;

await shell(`openssl genrsa -out ./${randomDid}.rsa.private 1024`);
await shell(`openssl rsa -in ./${randomDid}.rsa.private -out ./${randomDid}.rsa.public -pubout -outform PEM`);

/** PUBLIC_KEY - example: "-----BEGIN PUBLIC KEY...END PUBLIC KEY-----\r\n" */
const PUBLIC_KEY = await shell(`cat ./${randomDid}.rsa.public`);

/** 
 * @see https://www.w3.org/TR/did-core/#key-types-and-formats
 *  and
 * @see https://w3c-ccg.github.io/ld-cryptosuite-registry/ 
 */
const ID_CRYPTOSUITE_REGISTRY = {RsaVerificationKey2018: "RsaVerificationKey2018"}

const oneYearFromNow = new Date(new Date().setFullYear(new Date().getFullYear() + 1));


/** 
 * The did-document below intentionally uses all possible keys, as a learning exercice.
 * Thus it is overly verbose, and most of the keys could have been left out.
 * 
 * Example of a minimal version of the document below:
 * 
 * const didDocument = {
 *   "@context": "https://www.w3.org/ns/did/v1",
 *   "id": randomDid,
 *   "verificationMethod": [{
 *     "id": `${randomDid}#verification-method-rsa`,
 *     "type": ID_CRYPTOSUITE_REGISTRY.RsaVerificationKey2018,
 *     "controller": randomDid,
 *     "expires": oneYearFromNow.toISOString(),
 *     "publicKeyPem": PUBLIC_KEY,
 *   }],
 * };
 */
const didDocument = {
    "@context": "https://www.w3.org/ns/did/v1",

    /** @see https://www.w3.org/TR/did-core/#did-subject */
    "id": randomDid,

    /** @see https://www.w3.org/TR/did-core/#alsoknownas */
    "alsoKnownAs": [],

    /** @see https://www.w3.org/TR/did-core/#control */
    "controller": [randomDid],

    /** @see https://www.w3.org/TR/did-core/#verification-methods */
    "verificationMethod": [
        {
            "id": `${randomDid}#verification-method-rsa`,
            "type": ID_CRYPTOSUITE_REGISTRY.RsaVerificationKey2018,
            "controller": randomDid,
            "expires": oneYearFromNow.toISOString(),
            "publicKeyPem": PUBLIC_KEY,
        }
    ],

    /** @see https://www.w3.org/TR/did-core/#authentication */
    "authentication": [
        "#verification-method-rsa"
    ],

    /** @see https://www.w3.org/TR/did-core/#assertionmethod */
    "assertionMethod": [
        "#verification-method-rsa"
    ],

    /** @see https://www.w3.org/TR/did-core/#keyagreement */
    "keyAgreement": [
        "#verification-method-rsa"
    ],

    /** @see https://www.w3.org/TR/did-core/#capabilityinvocation */
    "capabilityInvocation": [
        "#verification-method-rsa"
    ],

    /** @see https://www.w3.org/TR/did-core/#capabilitydelegation */
    "capabilityDelegation": [
        "#verification-method-rsa"
    ],

    /** @see https://www.w3.org/TR/did-core/#service-endpoints */
    "service": []
}

await fs.writeFile(`${randomDid}.document`, JSON.stringify(didDocument, null, 2))

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
