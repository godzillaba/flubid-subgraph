import {
  EnglishRentalAuctionDeployed as EnglishRentalAuctionDeployedEvent
} from "../generated/EnglishRentalAuctionFactory/EnglishRentalAuctionFactory"

import { EnglishRentalAuction as EnglishRentalAuctionTemplate } from "../generated/templates";

import { EnglishRentalAuction, GenericControllerObserver, GenericRentalAuction } from "../generated/schema";
import { createIdFromAddress } from "./helpers";
import {
  EnglishRentalAuction as EnglishRentalAuctionContract
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction"
import {
  IRentalAuctionControllerObserver as ControllerObserverContract
} from "../generated/templates/IRentalAuctionControllerObserver/IRentalAuctionControllerObserver"
import {
  ERC4907Metadata as TokenContract
} from "../generated/templates/ERC4907Metadata/ERC4907Metadata"

import { Address, BigInt } from "@graphprotocol/graph-ts";

export function handleEnglishRentalAuctionDeployed(
  event: EnglishRentalAuctionDeployedEvent
): void {
  // make EnglishRentalAuction
  // make GenericRentalAuction
  // make GenericControllerObserver

  // create contract objects
  const auctionContract = EnglishRentalAuctionContract.bind(event.params.auctionAddress);
  const controllerContract = ControllerObserverContract.bind(event.params.controllerObserverAddress);
  const tokenContract = TokenContract.bind(controllerContract.underlyingTokenContract());

  // ContinuousRentalAuction
  EnglishRentalAuctionTemplate.create(event.params.auctionAddress);
  const continuousRentalAuctionEntity = new EnglishRentalAuction(
    createIdFromAddress("EnglishRentalAuction", event.params.auctionAddress)
  );
  continuousRentalAuctionEntity.address = event.params.auctionAddress;
  continuousRentalAuctionEntity.minRentalDuration = auctionContract.minRentalDuration();
  continuousRentalAuctionEntity.maxRentalDuration = auctionContract.maxRentalDuration();
  continuousRentalAuctionEntity.biddingPhaseDuration = auctionContract.biddingPhaseDuration();
  continuousRentalAuctionEntity.biddingPhaseExtensionDuration = auctionContract.biddingPhaseExtensionDuration();
  
  // GenericRentalAuction
  const genericRentalAuctionEntity = new GenericRentalAuction(
    createIdFromAddress("GenericRentalAuction", event.params.auctionAddress)
  );
  genericRentalAuctionEntity.type = "english";
  genericRentalAuctionEntity.address = event.params.auctionAddress;
  genericRentalAuctionEntity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  genericRentalAuctionEntity.controllerObserver = createIdFromAddress("GenericControllerObserver", event.params.controllerObserverAddress);
  genericRentalAuctionEntity.acceptedToken = auctionContract.acceptedToken();
  genericRentalAuctionEntity.beneficiary = auctionContract.beneficiary();
  genericRentalAuctionEntity.minimumBidFactorWad = auctionContract.minimumBidFactorWad();
  genericRentalAuctionEntity.reserveRate = auctionContract.reserveRate();
  genericRentalAuctionEntity.topBid = BigInt.fromI32(0);
  genericRentalAuctionEntity.currentRenter = Address.fromHexString("0x0000000000000000000000000000000000000000");
  genericRentalAuctionEntity.paused = auctionContract.paused();
  
  // GenericControllerObserver
  const genericControllerObserverEntity = new GenericControllerObserver(
    createIdFromAddress("GenericControllerObserver", event.params.controllerObserverAddress)
  );
  genericControllerObserverEntity.address = event.params.controllerObserverAddress;
  genericControllerObserverEntity.implementation = event.params.controllerObserverImplementation;
  genericControllerObserverEntity.auctionAddress = event.params.auctionAddress;
  genericControllerObserverEntity.underlyingTokenContract = controllerContract.underlyingTokenContract();
  genericControllerObserverEntity.underlyingTokenID = controllerContract.underlyingTokenID();
  genericControllerObserverEntity.underlyingTokenName = tokenContract.name();
  genericControllerObserverEntity.underlyingTokenURI = tokenContract.tokenURI(controllerContract.underlyingTokenID());



  genericControllerObserverEntity.save();
  genericRentalAuctionEntity.save();
  continuousRentalAuctionEntity.save();
  // EnglishRentalAuctionTemplate.create(event.params.auctionAddress);
  // let entity = new EnglishRentalAuction(createIdFromAddress("EnglishRentalAuction", event.params.auctionAddress));
  // entity.address = event.params.auctionAddress;
  // entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  // entity.controllerObserver = event.params.controllerObserverAddress;
  // entity.save(); 
}
