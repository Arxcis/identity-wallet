# Proof of concept use cases

## Use case 1: Do you want the receipt?

You just bought a coffee in the cafeteria, and you want the counter to give you a digital receipt. You want the receipt to be a cryptographically signed certificate, verifying that the transaction took place, issued by the counter. The counter generates the receipt (verifiable certificate) on in their phone. You move your phone near the counters phone and a prompt appears on both screens. The counter accepts to send. You accept to receive, and the receipt is transferred to your phone directly - peer-to-peer. No 3rd party involved. The receipt also includes claims that the counter actually works for the cafeteria, and is allowed to issue receipts to you. You verify the claims against the cafeteria owner's public key, just to make sure. Everything checks out.

## Use case 2: Transferring a prescription from the doctor to the pharmacy

Your are at the doctors office. The doctor tells you that you are sick, and that he will prescribe you medication. He pulls up his phone, and generates a prescription (verifiable certificate) with the correct medicine. You open up your wallet app on your phone and move it close the the doctors phone. Both approves the transfer with their respective authentication-method of choice, and the prescription is transferred to your phone.

Later that day you are at the pharmacy. You present your prescription (verifiable certificate) to the counter. The counter verifies that the prescription indeed is prescribed by a authroized physician, and approves your request for medication.

## Use case 3: Digital decentralized birth certificates in Gjøvik

In Gjøvik people are born every day. Today a very special person is born. It will be the first person in Norway where the "jordmor" will issue a birth certificate as a decentralized verifiable credential. The mother of the person, Lisa, is the recipient of the birth certificate. She will be the holder of the certificate, as long as the chid is young. When the child is old enough to have a smartphone, her mother will be able to transfer the birth certificate using the digital wallet app. The "jordmor" will also keep a copy of certificates she has issued, to keep a record of all the people she has helped get into this world.
