import {
  EnglishRentalAuctionDeployed as EnglishRentalAuctionDeployedEvent
} from "../generated/EnglishRentalAuctionFactory/EnglishRentalAuctionFactory"

import { EnglishRentalAuction as EnglishRentalAuctionTemplate } from "../generated/templates";

import { EnglishRentalAuction } from "../generated/schema";

export function handleEnglishRentalAuctionDeployed(
  event: EnglishRentalAuctionDeployedEvent
): void {
  EnglishRentalAuctionTemplate.create(event.params.auctionAddress);
  let entity = new EnglishRentalAuction(event.params.auctionAddress);
  entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  entity.controllerObserver = event.params.controllerObserverAddress;
  entity.save(); 
}
