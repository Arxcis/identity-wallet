# DIN Wiki

## Index
- [SSI Overview](./overview.md)
- [Layer 1: Decentralized Identifiers (DID)](#layer1)
- [Layer 2: Agent Layer (Communication, Storage, Key Management)](#layer2)
- [Layer 3: Verifiable Credentials (VC)](#layer3)
- [Layer 4: Application Layer (Use Cases)](#layer4)
- [Crosscutting topics](#crosscutting)


<h2 id="layer1">Layer 1: Decentralized Identifiers (DID)</h1>

### DID Core

- did-core - https://www.w3.org/TR/did-core/
- did-use-cases - https://www.w3.org/TR/did-use-cases
- did-spec-registries - https://www.w3.org/TR/did-spec-registries/
- did-resolution - https://w3c-ccg.github.io/did-resolution/ (draft)

### DID Methods

- did:ipid - https://did-ipid.github.io/ipid-did-method/
- did:sidetree - https://identity.foundation/sidetree/spec/
- did:web - https://github.com/decentralized-identity/web-did-resolver
- did:github - https://github.com/decentralized-identity/github-did/blob/master/docs/did-method-spec/index.md
- did:key - https://w3c-ccg.github.io/did-method-key/
- did:peer - https://identity.foundation/peer-did-method-spec/



<h2 id="layer2">Layer 2: Agent Layer (Communication, Storage, Key Management)</h1>

### Wallets
- [Hackmd.io / Wallet credentials format support grid](https://hackmd.io/t1cotiReTXCnkpDG8k2tVA)
- [docs.google.com / Open Wallet Architecture design proposal](https://docs.google.com/document/u/4/d/e/2PACX-1vR6GMNrBzDuMvhHGlVeENEMZjijHTVKUueG5f6KshFlsIfcqt1QjsTGNgB8vjEGfDVFRB-dWhe5-Hxc/pub)
- [youtube.com / SSI-Meetup Webinar / The state of Digital Wallets with Darell O'Donnell](https://www.youtube.com/watch?v=vWsLZnfRyyo)
- [youtube.com / SSI-Meetup Webinar / Hyperledger Aries](https://ssimeetup.org/hyperledger-aries-open-source-interoperable-identity-solutions-nathan-george-webinar-30/)


### Browser API's

- [developer.mozilla.org / Credentials Management API](https://developer.mozilla.org/en-US/docs/Web/API/Credential_Management_API)
- [developer.mozilla.org / Web Authentication API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Authentication_API)

### Android API's

- [developers.google.com / Fido2ApiClient](https://developers.google.com/android/reference/com/google/android/gms/fido/fido2/Fido2ApiClient#getRegisterIntent(com.google.android.gms.fido.fido2.api.common.MakeCredentialOptions))
- [developer.android.com / KeyChain](https://developer.android.com/reference/android/security/KeyChain)
- [developer.android.com  / KeyStore](https://developer.android.com/reference/java/security/KeyStore)


<h2 id="layer3">Layer 3: Verifiable Credentials (VC)</h1>

- vc-data-model - https://www.w3.org/TR/vc-data-model/
- vc-use-cases - https://www.w3.org/TR/vc-use-cases/
- vc-imp-guide - https://www.w3.org/TR/vc-imp-guide/
- vc-extension-registry - https://w3c-ccg.github.io/vc-extension-registry/ (draft)
- vc-csl2017 - https://w3c-ccg.github.io/vc-csl2017/
- vc-status-rl-2020 Revocation List - https://w3c-ccg.github.io/vc-status-rl-2020/ (draft)


<h2 id="layer4">Layer 4: Application Layer (Use Cases)</h1>

- [pdf / The necessity of vaccination passporting in Pakistan report](https://trello-attachments.s3.amazonaws.com/5e592c38d62eec435a19f0f5/5f76cc084712fd1c0ff5eff6/90bf84c1e97e0d6bb6214b9cb2e4f12d/Whitepaper_-_Necessity_Of_Vaccination_Passporting.pdf)

<h2 id="crosscutting">Crosscutting topics</h1>

### JSON Linked Data (LD)

- json-ld11 - https://www.w3.org/TR/json-ld11/
- draft-json-schema - https://tools.ietf.org/html/draft-handrews-json-schema-02 (draft)
- ld-proofs - https://w3c-ccg.github.io/ld-proofs/ (draft)
- ld-cryptosuite-registry - https://w3c-ccg.github.io/ld-cryptosuite-registry/ (draft)
- ld-rsa2018 - https://w3c-ccg.github.io/lds-rsa2018/
- ld-normalization - https://json-ld.github.io/normalization/spec/

### JSON Legacy

- JWS - https://tools.ietf.org/html/rfc7515
- JWE - https://tools.ietf.org/html/rfc7516
- JWK - https://tools.ietf.org/html/rfc7517
- JWA - https://tools.ietf.org/html/rfc7518
- JWT - https://tools.ietf.org/html/rfc7519
- JWS Unencoded option - https://tools.ietf.org/html/rfc7797
- JCS - https://tools.ietf.org/html/draft-rundgren-json-canonicalization-scheme-15
- JSON - https://tools.ietf.org/html/rfc8259

### URI and IRI

- rfc3986 URI - https://tools.ietf.org/html/rfc3986
- rfc3987 IRI - https://tools.ietf.org/html/rfc3987
