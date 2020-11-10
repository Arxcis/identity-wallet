import { shell } from "./shell.mjs"

/**
 * @param {string} did
 * @param {number} bits
 */
export async function writeRsaKeyPair(did, bits) {
    await shell(`openssl genrsa -out ./${did}.rsa.private ${bits}`);
    await shell(`openssl rsa -in ./${did}.rsa.private -out ./${did}.rsa.public -pubout -outform PEM`);
}

/**
 * @param {string} did
 *
 * @returns {string}
 */
export async function readRsaPublicKey(did) {
    return await shell(`cat ./${did}.rsa.public`)
}

/**
 * @param {string} did
 *
 * @returns {string}
 */
export async function readRsaPrivateKey(did) {
    return await shell(`cat ./${did}.rsa.private`);
}
