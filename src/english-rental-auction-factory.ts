import {
  EnglishRentalAuctionDeployed as EnglishRentalAuctionDeployedEvent
} from "../generated/EnglishRentalAuctionFactory/EnglishRentalAuctionFactory"

import { EnglishRentalAuction as EnglishRentalAuctionTemplate } from "../generated/templates";
import { ERC721ControllerObserver as ERC721ControllerObserverTemplate } from "../generated/templates";

import { EnglishRentalAuction, ERC721ControllerObserver, GenericRentalAuction } from "../generated/schema";
import { createIdFromAddress } from "./helpers";
import {
  EnglishRentalAuction as EnglishRentalAuctionContract
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction"
import {
  ERC721ControllerObserver as ERC721ControllerObserverContract
} from "../generated/templates/ERC721ControllerObserver/ERC721ControllerObserver"
import {
  IERC721Metadata as TokenContract
} from "../generated/templates/IERC721Metadata/IERC721Metadata"

import { Address, BigInt } from "@graphprotocol/graph-ts";

// todo: creation timestamp so the explorer can sort by creation date

export function handleEnglishRentalAuctionDeployed(
  event: EnglishRentalAuctionDeployedEvent
): void {
  // make EnglishRentalAuction
  // make GenericRentalAuction
  // make ERC721ControllerObserver

  // create contract objects
  const auctionContract = EnglishRentalAuctionContract.bind(event.params.auctionAddress);
  const controllerContract = ERC721ControllerObserverContract.bind(event.params.controllerObserverAddress);
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
  continuousRentalAuctionEntity.topBidder = Address.fromHexString("0x0000000000000000000000000000000000000000");
  continuousRentalAuctionEntity.depositClaimed = false;
  continuousRentalAuctionEntity.isBiddingPhase = true;
  continuousRentalAuctionEntity.currentPhaseEndTime = BigInt.fromI32(0);
  
  // GenericRentalAuction
  const genericRentalAuctionEntity = new GenericRentalAuction(
    createIdFromAddress("GenericRentalAuction", event.params.auctionAddress)
  );
  genericRentalAuctionEntity.type = "english";
  genericRentalAuctionEntity.address = event.params.auctionAddress;
  genericRentalAuctionEntity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  genericRentalAuctionEntity.controllerObserver = createIdFromAddress("ERC721ControllerObserver", event.params.controllerObserverAddress);
  genericRentalAuctionEntity.acceptedToken = auctionContract.acceptedToken();
  genericRentalAuctionEntity.beneficiary = auctionContract.beneficiary();
  genericRentalAuctionEntity.minimumBidFactorWad = auctionContract.minimumBidFactorWad();
  genericRentalAuctionEntity.reserveRate = auctionContract.reserveRate();
  genericRentalAuctionEntity.topBid = BigInt.fromI32(0);
  genericRentalAuctionEntity.currentRenter = Address.fromHexString("0x0000000000000000000000000000000000000000");
  genericRentalAuctionEntity.paused = auctionContract.paused();
  genericRentalAuctionEntity.lastInteractionTimestamp = event.block.timestamp;
  
  // ERC721ControllerObserver
  ERC721ControllerObserverTemplate.create(event.params.controllerObserverAddress);
  const erc721ControllerObserverEntity = new ERC721ControllerObserver(
    createIdFromAddress("ERC721ControllerObserver", event.params.controllerObserverAddress)
  );
  erc721ControllerObserverEntity.address = event.params.controllerObserverAddress;
  erc721ControllerObserverEntity.implementation = event.params.controllerObserverImplementation;
  erc721ControllerObserverEntity.auctionAddress = event.params.auctionAddress;
  erc721ControllerObserverEntity.underlyingTokenContract = controllerContract.underlyingTokenContract();
  erc721ControllerObserverEntity.underlyingTokenID = controllerContract.underlyingTokenID();
  const nameCall = tokenContract.try_name();
  erc721ControllerObserverEntity.underlyingTokenName = nameCall.reverted ? "unknown" : nameCall.value;
  const tokenURICall = tokenContract.try_tokenURI(controllerContract.underlyingTokenID());
  erc721ControllerObserverEntity.underlyingTokenURI = tokenURICall.reverted ? "unknown" : tokenURICall.value;
  erc721ControllerObserverEntity.owner = controllerContract.owner();
  erc721ControllerObserverEntity.genericRentalAuction = createIdFromAddress("GenericRentalAuction", event.params.auctionAddress);

  erc721ControllerObserverEntity.save();
  genericRentalAuctionEntity.save();
  continuousRentalAuctionEntity.save();
  // EnglishRentalAuctionTemplate.create(event.params.auctionAddress);
  // let entity = new EnglishRentalAuction(createIdFromAddress("EnglishRentalAuction", event.params.auctionAddress));
  // entity.address = event.params.auctionAddress;
  // entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  // entity.controllerObserver = event.params.controllerObserverAddress;
  // entity.save(); 
}
