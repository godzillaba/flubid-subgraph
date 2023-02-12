// import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
// import {
//   ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
// } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
// import { ContinuousRentalAuction, Stream, StreamHistory } from "../generated/schema";

import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { EnglishRentalAuction } from "../generated/schema";


import {
  Initialized as InitializedEvent,
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";
import { IRentalAuctionControllerObserver as IRentalAuctionControllerObserverContract } from "../generated/templates/IRentalAuctionControllerObserver/IRentalAuctionControllerObserver";
import { ERC4907Metadata as ERC4907MetadataContract } from "../generated/templates/ERC4907Metadata/ERC4907Metadata";
import { createIdFromAddress } from "./helpers";

export function handleInitialized(event: InitializedEvent): void {
  // const entity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", event.address));
  // if (entity === null) return;
  // entity.acceptedToken = event.params.acceptedToken;
  // entity.beneficiary = event.params.beneficiary;
  // entity.minimumBidFactorWad = event.params.minimumBidFactorWad;
  // entity.reserveRate = event.params.reserveRate;

  // entity.minRentalDuration = event.params.minRentalDuration;
  // entity.maxRentalDuration = event.params.maxRentalDuration;
  // entity.biddingPhaseDuration = event.params.biddingPhaseDuration;
  // entity.biddingPhaseExtensionDuration = event.params.biddingPhaseExtensionDuration;

  // entity.save();


  // const genericEntity = new RentalAuction(createIdFromAddress("RentalAuction", event.address));

  // const controllerContract = IRentalAuctionControllerObserverContract.bind(Address.fromBytes(entity.controllerObserver));
  // const erc721MetadataContract = ERC4907MetadataContract.bind(controllerContract.underlyingTokenContract());
  // genericEntity.type = "english";
  // genericEntity.address = event.address;
  // genericEntity.controllerObserver = entity.controllerObserver;
  // genericEntity.controllerObserverImplementation = entity.controllerObserverImplementation;
  // genericEntity.acceptedToken = event.params.acceptedToken;
  // genericEntity.underlyingTokenContract = controllerContract.underlyingTokenContract();
  // genericEntity.underlyingTokenID = controllerContract.underlyingTokenID();
  // genericEntity.underlyingTokenName = erc721MetadataContract.name();
  // genericEntity.underlyingTokenURI = erc721MetadataContract.tokenURI(controllerContract.underlyingTokenID());

  // genericEntity.save();
}
