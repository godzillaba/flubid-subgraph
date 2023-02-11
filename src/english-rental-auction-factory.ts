import {
  EnglishRentalAuctionDeployed as EnglishRentalAuctionDeployedEvent
} from "../generated/EnglishRentalAuctionFactory/EnglishRentalAuctionFactory"

import { EnglishRentalAuction as EnglishRentalAuctionTemplate } from "../generated/templates";

import { EnglishRentalAuction } from "../generated/schema";
import { createIdFromAddress } from "./helpers";

export function handleEnglishRentalAuctionDeployed(
  event: EnglishRentalAuctionDeployedEvent
): void {
  EnglishRentalAuctionTemplate.create(event.params.auctionAddress);
  let entity = new EnglishRentalAuction(createIdFromAddress("EnglishRentalAuction", event.params.auctionAddress));
  entity.address = event.params.auctionAddress;
  entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  entity.controllerObserver = event.params.controllerObserverAddress;
  entity.save(); 
}
