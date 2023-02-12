import { ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory";

import { ContinuousRentalAuction as ContinuousRentalAuctionTemplate } from "../generated/templates";

import { ContinuousRentalAuction, GenericControllerObserver, GenericRentalAuction } from "../generated/schema";
import { createIdFromAddress } from "./helpers";
import {
  ContinuousRentalAuction as ContinuousRentalAuctionContract
} from "../generated/templates/ContinuousRentalAuction/ContinuousRentalAuction"
import {
  IRentalAuctionControllerObserver as ControllerObserverContract
} from "../generated/templates/IRentalAuctionControllerObserver/IRentalAuctionControllerObserver"
import {
  ERC4907Metadata as TokenContract
} from "../generated/templates/ERC4907Metadata/ERC4907Metadata"

import { Address, BigInt } from "@graphprotocol/graph-ts";

// import { ContinuousRentalAuctionFactory } from "../generated/schema"

export function handleContinuousRentalAuctionDeployed(
  event: ContinuousRentalAuctionDeployedEvent
): void {
  // make ContinuousRentalAuction
  // make GenericRentalAuction
  // make GenericControllerObserver

  // create contract objects
  const auctionContract = ContinuousRentalAuctionContract.bind(event.params.auctionAddress);
  const controllerContract = ControllerObserverContract.bind(event.params.controllerObserverAddress);
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
  genericRentalAuctionEntity.controllerObserver = createIdFromAddress("GenericControllerObserver", event.params.controllerObserverAddress);
  genericRentalAuctionEntity.acceptedToken = auctionContract.acceptedToken();
  genericRentalAuctionEntity.beneficiary = auctionContract.beneficiary();
  genericRentalAuctionEntity.minimumBidFactorWad = auctionContract.minimumBidFactorWad();
  genericRentalAuctionEntity.reserveRate = auctionContract.reserveRate();
  genericRentalAuctionEntity.topBid = BigInt.fromI32(0);
  genericRentalAuctionEntity.currentRenter = Address.fromHexString("0x0000000000000000000000000000000000000000");
  
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
  // ContinuousRentalAuctionTemplate.create(event.params.auctionAddress);
  // let entity = new ContinuousRentalAuction(createIdFromAddress("ContinuousRentalAuction", event.params.auctionAddress));
  // entity.address = event.params.auctionAddress;
  // entity.controllerObserverImplementation = event.params.controllerObserverImplementation;
  // entity.controllerObserver = event.params.controllerObserverAddress;
  // entity.inboundStreams = [];
  // // todo: we can set the other constants here by reading the contract. we can get rid of Initialized event too.
  // entity.save();
}
