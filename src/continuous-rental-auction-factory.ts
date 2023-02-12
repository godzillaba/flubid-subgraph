import {
  ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
} from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"

import { ContinuousRentalAuction as ContinuousRentalAuctionTemplate } from "../generated/templates";

import { ContinuousRentalAuction } from "../generated/schema";
import { createIdFromAddress } from "./helpers";

// import { ContinuousRentalAuctionFactory } from "../generated/schema"

export function handleContinuousRentalAuctionDeployed(
  event: ContinuousRentalAuctionDeployedEvent
): void {
  ContinuousRentalAuctionTemplate.create(event.params.auctionAddress);
  let entity = new ContinuousRentalAuction(createIdFromAddress("ContinuousRentalAuction", event.params.auctionAddress));
  entity.address = event.params.auctionAddress;
  entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  entity.controllerObserver = event.params.controllerObserverAddress;
  entity.inboundStreams = [];
  // todo: we can set the other constants here by reading the contract. we can get rid of Initialized event too.
  entity.save(); 
}
