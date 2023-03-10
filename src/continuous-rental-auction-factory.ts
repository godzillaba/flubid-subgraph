import { ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory";

import { ContinuousRentalAuction as ContinuousRentalAuctionTemplate } from "../generated/templates";
import { ERC721ControllerObserver as ERC721ControllerObserverTemplate } from "../generated/templates";

import { ContinuousRentalAuction, ERC721ControllerObserver, GenericRentalAuction } from "../generated/schema";
import { createIdFromAddress, isSupportedControllerImplementation } from "./helpers";
import {
  ContinuousRentalAuction as ContinuousRentalAuctionContract
} from "../generated/templates/ContinuousRentalAuction/ContinuousRentalAuction"
import {
  ERC721ControllerObserver as ERC721ControllerObserverContract
} from "../generated/templates/ERC721ControllerObserver/ERC721ControllerObserver"
import {
  IERC721Metadata as TokenContract
} from "../generated/templates/IERC721Metadata/IERC721Metadata"

import { Address, BigInt } from "@graphprotocol/graph-ts";

// import { ContinuousRentalAuctionFactory } from "../generated/schema"

export function handleContinuousRentalAuctionDeployed(
  event: ContinuousRentalAuctionDeployedEvent
): void {
  // make ContinuousRentalAuction
  // make GenericRentalAuction
  // make ERC721ControllerObserver

  // make sure the controller observer is supported
  if (!isSupportedControllerImplementation(event.params.controllerObserverImplementation)) return;

  // create contract objects
  const auctionContract = ContinuousRentalAuctionContract.bind(event.params.auctionAddress);
  const controllerContract = ERC721ControllerObserverContract.bind(event.params.controllerObserverAddress);
  const tokenContract = TokenContract.bind(controllerContract.underlyingTokenContract());

  // ContinuousRentalAuction
  ContinuousRentalAuctionTemplate.create(event.params.auctionAddress);
  const continuousRentalAuctionEntity = new ContinuousRentalAuction(
    createIdFromAddress("ContinuousRentalAuction", event.params.auctionAddress)
  );
  continuousRentalAuctionEntity.address = event.params.auctionAddress;
  continuousRentalAuctionEntity.inboundStreams = [];
  
  // GenericRentalAuction
  const genericRentalAuctionEntity = new GenericRentalAuction(
    createIdFromAddress("GenericRentalAuction", event.params.auctionAddress)
  );
  genericRentalAuctionEntity.type = "continuous";
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
  const tryName = tokenContract.try_name();
  const tryTokenURI = tokenContract.try_tokenURI(controllerContract.underlyingTokenID());
  erc721ControllerObserverEntity.address = event.params.controllerObserverAddress;
  erc721ControllerObserverEntity.implementation = event.params.controllerObserverImplementation;
  erc721ControllerObserverEntity.auctionAddress = event.params.auctionAddress;
  erc721ControllerObserverEntity.underlyingTokenContract = controllerContract.underlyingTokenContract();
  erc721ControllerObserverEntity.underlyingTokenID = controllerContract.underlyingTokenID();
  erc721ControllerObserverEntity.underlyingTokenName = tryName.reverted ? "" : tryName.value;
  erc721ControllerObserverEntity.underlyingTokenURI = tryTokenURI.reverted ? "" : tryTokenURI.value;
  erc721ControllerObserverEntity.owner = controllerContract.owner();
  erc721ControllerObserverEntity.genericRentalAuction = createIdFromAddress("GenericRentalAuction", event.params.auctionAddress);



  erc721ControllerObserverEntity.save();
  genericRentalAuctionEntity.save();
  continuousRentalAuctionEntity.save();
  // ContinuousRentalAuctionTemplate.create(event.params.auctionAddress);
  // let entity = new ContinuousRentalAuction(createIdFromAddress("ContinuousRentalAuction", event.params.auctionAddress));
  // entity.address = event.params.auctionAddress;
  // entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  // entity.controllerObserver = event.params.controllerObserverAddress;
  // entity.inboundStreams = [];
  // // todo: we can set the other constants here by reading the contract. we can get rid of Initialized event too.
  // entity.save();
}
