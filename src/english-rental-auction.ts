// import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
// import {
//   ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
// } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
// import { ContinuousRentalAuction, Stream, StreamHistory } from "../generated/schema";

import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import { EnglishRentalAuction, GenericRentalAuction } from "../generated/schema";
import {
  Paused as PausedEvent,
  Unpaused as UnpausedEvent,
  NewTopBid as NewTopBidEvent,
  DepositClaimed as DepositClaimedEvent,
  TransitionedToRentalPhase as TransitionedToRentalPhaseEvent,
  TransitionedToBiddingPhase as TransitionedToBiddingPhaseEvent,
  TransitionToRentalPhaseFailed as TransitionToRentalPhaseFailedEvent,
  TransitionedToBiddingPhaseEarly as TransitionedToBiddingPhaseEarlyEvent,
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";

import {
  EnglishRentalAuction as EnglishRentalAuctionContract
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";


import {
  Initialized as InitializedEvent,
} from "../generated/templates/EnglishRentalAuction/EnglishRentalAuction";
// import { IRentalAuctionControllerObserver as IRentalAuctionControllerObserverContract } from "../generated/templates/IRentalAuctionControllerObserver/IRentalAuctionControllerObserver";
// import { ERC4907Metadata as ERC4907MetadataContract } from "../generated/templates/ERC4907Metadata/ERC4907Metadata";
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

export function handlePaused(event: PausedEvent): void {
  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  genericEntity!.paused = true;
  genericEntity!.lastInteractionTimestamp = event.block.timestamp;
  genericEntity!.save();
}

export function handleUnpaused(event: UnpausedEvent): void {
  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  genericEntity!.paused = false;
  genericEntity!.lastInteractionTimestamp = event.block.timestamp;
  genericEntity!.save();
}

export function handleNewTopBid(event: NewTopBidEvent): void {
  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  genericEntity!.topBid = event.params.flowRate;
  genericEntity!.lastInteractionTimestamp = event.block.timestamp;
  genericEntity!.save();

  const englishEntity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", event.address));
  const englishContract = EnglishRentalAuctionContract.bind(event.address);
  englishEntity!.topBidder = event.params.bidder;
  englishEntity!.currentPhaseEndTime = englishContract.currentPhaseEndTime();
  englishEntity!.save();
}

export function handleDepositClaimed(event: DepositClaimedEvent): void {
  const englishEntity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", event.address));
  englishEntity!.depositClaimed = true;
  englishEntity!.save();

  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  genericEntity!.lastInteractionTimestamp = event.block.timestamp;
  genericEntity!.save();
}

export function handleTransitionedToRentalPhase(event: TransitionedToRentalPhaseEvent): void {
  const englishEntity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", event.address));
  englishEntity!.isBiddingPhase = false;
  englishEntity!.currentPhaseEndTime = event.block.timestamp.plus(englishEntity!.maxRentalDuration);
  englishEntity!.save();

  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  genericEntity!.currentRenter = event.params.renter;
  genericEntity!.lastInteractionTimestamp = event.block.timestamp;
  genericEntity!.save();
}

function transitionedToBiddingPhase(address: Address, timestamp: BigInt): void {
  const englishEntity = EnglishRentalAuction.load(createIdFromAddress("EnglishRentalAuction", address));
  englishEntity!.topBidder = Address.fromHexString("0x0000000000000000000000000000000000000000");
  englishEntity!.depositClaimed = false;
  englishEntity!.isBiddingPhase = true;
  englishEntity!.currentPhaseEndTime = BigInt.fromI32(0);
  englishEntity!.save();

  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", address));
  genericEntity!.currentRenter = Address.fromHexString("0x0000000000000000000000000000000000000000");
  genericEntity!.topBid = BigInt.fromI32(0);
  genericEntity!.lastInteractionTimestamp = timestamp;
  genericEntity!.save();
}

export function handleTransitionedToBiddingPhase(event: TransitionedToBiddingPhaseEvent): void {
  transitionedToBiddingPhase(event.address, event.block.timestamp);
}

export function handleTransitionToRentalPhaseFailed(event: TransitionToRentalPhaseFailedEvent): void {
  transitionedToBiddingPhase(event.address, event.block.timestamp);
}

export function handleTransitionedToBiddingPhaseEarly(event: TransitionedToBiddingPhaseEarlyEvent): void {
  transitionedToBiddingPhase(event.address, event.block.timestamp);
}
