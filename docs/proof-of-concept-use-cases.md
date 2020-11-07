# Proof of concept use cases

## Use case 1: Do you want the receipt?

You just bought a coffee in the cafeteria, and you want the counter to give you a digital receipt. You want the receipt to be a cryptographically signed certificate, verifying that the transaction took place, issued by the counter. The counter generates the receipt (verifiable certificate) on in their phone. You move your phone near the counters phone and a prompt appears on both screens. The counter accepts to send. You accept to receive, and the receipt is transferred to your phone directly - peer-to-peer. No 3rd party involved.

## Use case 2: Transferring a prescription from the doctor to the pharmacy

Your are at the doctors office. The doctor tells you that you are sick, and that he will prescribe you medication. He pulls up his phone, and generates a prescription (verifiable certificate) with the correct medicine. You open up your wallet app on your phone and move it close the the doctors phone. Both approves the transfer with their respective authentication-method of choice, and the prescription is transferred to your phone.

Later that day you are at the pharmacy. You present your prescription (verifiable certificate) to the counter. The counter verifies that the prescription indeed is prescribed by a authroized physician, and approves your request for medication.
