## Description of example

This example genereates some intermediate files, which in the end is used to generate a verifiable credential:

1. Generates a did-document for the issuer: `./did:demo:issuer.document`.
2. Generates a did-document for the subject: `./did:demo:subject.document`.
3. Generates an "unverifiable credential": `./did:demo:issuer.credential.1868`.
4. Generates a signature of the "unverifiable credential": `./did:demo:issuer.credential.1868.signature`
5. Generates verified credential using the signature as proof: `./did:demo:issuer.credential.1868.verifiable`

## Demo

Run

```
make
```

[![asciicast](https://asciinema.org/a/GHk1vkDL3mOUBJjSzLNAkGOer.svg)](https://asciinema.org/a/GHk1vkDL3mOUBJjSzLNAkGOer)
