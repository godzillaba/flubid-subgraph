// import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
// import {
//   ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
// } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
// import { ContinuousRentalAuction, Stream, StreamHistory } from "../generated/schema";

import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { EnglishRentalAuction, RentalAuction } from "../generated/schema";


import {
  Initialized as InitializedEvent,
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";
import { createIdFromAddress } from "./helpers";

export function handleInitialized(event: InitializedEvent): void {
  const entity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", event.address));
  if (entity === null) return;
  entity.acceptedToken = event.params.acceptedToken;
  entity.beneficiary = event.params.beneficiary;
  entity.minimumBidFactorWad = event.params.minimumBidFactorWad;
  entity.reserveRate = event.params.reserveRate;

  entity.minRentalDuration = event.params.minRentalDuration;
  entity.maxRentalDuration = event.params.maxRentalDuration;
  entity.biddingPhaseDuration = event.params.biddingPhaseDuration;
  entity.biddingPhaseExtensionDuration = event.params.biddingPhaseExtensionDuration;

  entity.save();


  const genericEntity = new RentalAuction(createIdFromAddress("RentalAuction", event.address));
  genericEntity.type = "english";
  genericEntity.address = event.address;
  genericEntity.controllerObserver = entity.controllerObserver;
  genericEntity.controllerObserverImplementation = entity.controllerObserverImplementation;
  genericEntity.acceptedToken = event.params.acceptedToken;
  genericEntity.save();
}
