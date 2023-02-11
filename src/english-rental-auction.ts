// import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
// import {
//   ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
// } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
// import { ContinuousRentalAuction, Stream, StreamHistory } from "../generated/schema";

import { EnglishRentalAuction } from "../generated/schema";

import {
  Initialized as InitializedEvent,
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";

// function createId(prefix: string, txHash: Bytes, logIndex: BigInt): Bytes {
//   return Bytes.fromUTF8(prefix).concat(txHash.concat(Bytes.fromHexString(logIndex.toHex())));
// }

export function handleInitialized(event: InitializedEvent): void {
  const entity = new EnglishRentalAuction(event.address);
  entity.acceptedToken = event.params.acceptedToken;
  entity.beneficiary = event.params.beneficiary;
  entity.minimumBidFactorWad = event.params.minimumBidFactorWad;
  entity.reserveRate = event.params.reserveRate;

  entity.minRentalDuration = event.params.minRentalDuration;
  entity.maxRentalDuration = event.params.maxRentalDuration;
  entity.biddingPhaseDuration = event.params.biddingPhaseDuration;
  entity.biddingPhaseExtensionDuration = event.params.biddingPhaseExtensionDuration;

  entity.save();
}
