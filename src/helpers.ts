import { Address, BigDecimal, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { crypto } from "@graphprotocol/graph-ts";

const supportedControllerImplementations = [
    "0x249c6D171dE33d1239Af3c3BD23AD7D75b2B1198", // lens
    "0xA9D61923b9e054fe3353596eFD4DFe743F4b28C5", // erc4907
    "0x558c268716A1067Cc47291CcC197b1401f87d13C", // delegate.cash
];

export function createRandomId(prefix: string, txHash: Bytes, logIndex: BigInt): Bytes {
    return Bytes.fromByteArray(
        crypto.keccak256(
            crypto.keccak256(Bytes.fromUTF8(prefix))
            .concat(crypto.keccak256(txHash))
            .concat(crypto.keccak256(Bytes.fromBigInt(logIndex)))
        )
        // crypto.keccak256(Bytes.fromUTF8(prefix).concat(txHash.concat(Bytes.fromHexString(logIndex.toHex()))))
    );
}

export function createIdFromAddress(prefix: string, addr: Address): Bytes {
    return Bytes.fromByteArray(crypto.keccak256(Bytes.fromUTF8(prefix).concat(addr)));
}

export function isSupportedControllerImplementation(addr: Address): bool {
    for (let i = 0; i < supportedControllerImplementations.length; i++) {
        if (Address.fromHexString(supportedControllerImplementations[i]) == addr) {
            return true;
        }
    }
    return false;
}