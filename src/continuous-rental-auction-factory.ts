import {
  ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
} from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"

import { ContinuousRentalAuction as ContinuousRentalAuctionTemplate } from "../generated/templates";

import { ContinuousRentalAuction } from "../generated/schema";

// import { ContinuousRentalAuctionFactory } from "../generated/schema"

export function handleContinuousRentalAuctionDeployed(
  event: ContinuousRentalAuctionDeployedEvent
): void {
  ContinuousRentalAuctionTemplate.create(event.params.auctionAddress);
  let entity = new ContinuousRentalAuction(event.params.auctionAddress);
  entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  entity.controllerObserver = event.params.controllerObserverAddress;
  entity.inboundStreams = [];
  entity.save(); 
}
