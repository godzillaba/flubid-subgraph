import { Address, BigDecimal, BigInt, ByteArray, Bytes } from "@graphprotocol/graph-ts";
import { crypto } from "@graphprotocol/graph-ts";

export function createRandomId(prefix: string, txHash: Bytes, logIndex: BigInt): Bytes {
    return Bytes.fromByteArray(
        crypto.keccak256(Bytes.fromUTF8(prefix).concat(txHash.concat(Bytes.fromHexString(logIndex.toHex()))))
    );
}

export function createIdFromAddress(prefix: string, addr: Address): Bytes {
    return Bytes.fromByteArray(crypto.keccak256(Bytes.fromUTF8(prefix).concat(addr)));
}
