import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  ContinuousRentalAuction as ContinuousRentalAuctionContract
} from "../generated/templates/ContinuousRentalAuction/ContinuousRentalAuction"
import { IRentalAuctionControllerObserver as IRentalAuctionControllerObserverContract } from "../generated/templates/IRentalAuctionControllerObserver/IRentalAuctionControllerObserver";
import { ERC4907Metadata as ERC4907MetadataContract } from "../generated/templates/ERC4907Metadata/ERC4907Metadata";
import { ContinuousRentalAuction, GenericRentalAuction, Stream, StreamHistory } from "../generated/schema";
import { log } from '@graphprotocol/graph-ts'

import {
  Initialized as InitializedEvent,
  RenterChanged as RenterChangedEvent,
  NewInboundStream as NewInboundStreamEvent,
  StreamUpdated as StreamUpdatedEvent,
  StreamTerminated as StreamTerminatedEvent
} from "../generated/templates/ContinuousRentalAuction/ContinuousRentalAuction";
import { createIdFromAddress, createRandomId } from "./helpers";

import { store } from '@graphprotocol/graph-ts'


export function handleInitialized(event: InitializedEvent): void {
  // const entity = ContinuousRentalAuction.load(createIdFromAddress("ContinuousRentalAuction", event.address));
  // if (entity === null) return;
  // entity.acceptedToken = event.params.acceptedToken;
  // entity.beneficiary = event.params.beneficiary;
  // entity.minimumBidFactorWad = event.params.minimumBidFactorWad;
  // entity.reserveRate = event.params.reserveRate;
  
  // const genericEntity = new RentalAuction(createIdFromAddress("RentalAuction", event.address));

  // const controllerContract = IRentalAuctionControllerObserverContract.bind(Address.fromBytes(entity.controllerObserver));
  // const erc721MetadataContract = ERC4907MetadataContract.bind(controllerContract.underlyingTokenContract());
  // genericEntity.type = "continuous";
  // genericEntity.address = event.address;
  // genericEntity.controllerObserver = entity.controllerObserver;
  // genericEntity.controllerObserverImplementation = entity.controllerObserverImplementation;
  // genericEntity.acceptedToken = event.params.acceptedToken;
  // genericEntity.underlyingTokenContract = controllerContract.underlyingTokenContract();
  // genericEntity.underlyingTokenID = controllerContract.underlyingTokenID();
  // genericEntity.underlyingTokenName = erc721MetadataContract.name();
  // genericEntity.underlyingTokenURI = erc721MetadataContract.tokenURI(controllerContract.underlyingTokenID());
  
  // entity.save();
  // genericEntity.save();
}

export function handleRenterChanged(event: RenterChangedEvent): void {
  const contract = ContinuousRentalAuctionContract.bind(event.address);

  const genericEntity = GenericRentalAuction.load(createIdFromAddress("GenericRentalAuction", event.address));
  if (genericEntity === null) return;
  genericEntity.currentRenter = event.params.newRenter;
  genericEntity.topBid = contract.senderInfo(event.params.newRenter).getFlowRate();
  genericEntity.save();
}
export function handleNewInboundStream(event: NewInboundStreamEvent): void {
  const entity = ContinuousRentalAuction.load(createIdFromAddress("ContinuousRentalAuction", event.address));
  if (entity === null) return;

  // entity.currentRenter = event.params.newRenter;
  // const streamId = event.params.streamer.concat(event.address);

  const streamId = createRandomId("Stream", event.transaction.hash, event.logIndex);
  const stream = new Stream(streamId);
  stream.flowRate = event.params.flowRate;
  stream.sender = event.params.streamer;
  stream.receiver = event.address;
  stream.save();

  let inboundStreams = entity.inboundStreams;
  inboundStreams.push(streamId);
  entity.inboundStreams = inboundStreams;

  entity.save();


  // stream history
  const streamHistoryId = createRandomId("StreamHistory", event.transaction.hash, event.logIndex);;
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "create";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.flowRate = event.params.flowRate;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}

export function handleStreamUpdated(event: StreamUpdatedEvent): void {
  const entity = ContinuousRentalAuction.load(createIdFromAddress("ContinuousRentalAuction", event.address));
  if (entity === null) return;

  // find the stream in the inboundStreams array to update
  let inboundStreams = entity.inboundStreams;

  for (let i = 0; i < inboundStreams.length; i++) {
    const streamId = inboundStreams[i];

    const streamEntity = Stream.load(streamId);
    if (streamEntity === null) return;

    if (streamEntity.sender == event.params.streamer) {
      streamEntity.flowRate = event.params.flowRate;
      streamEntity.save();
    }
  }

  // stream history
  const streamHistoryId = createRandomId("StreamHistory", event.transaction.hash, event.logIndex);;
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "update";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.flowRate = event.params.flowRate;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}
export function handleStreamTerminated(event: StreamTerminatedEvent): void {
  const entity = ContinuousRentalAuction.load(createIdFromAddress("ContinuousRentalAuction", event.address));
  if (entity === null) return;

  const inboundStreams = entity.inboundStreams;
  const newInboundStreams: Bytes[] = [];

  for (let i = 0; i < inboundStreams.length; i++) {
    const streamEntity = Stream.load(inboundStreams[i]);
    if (streamEntity === null) return;
    
    if (streamEntity.sender != event.params.streamer) {
      // entity.inboundStreams = inboundStreams.splice(i, 1);
      // store.remove("Stream", streamEntity.id.toHexString());
      newInboundStreams.push(inboundStreams[i]);
    }
  }

  entity.inboundStreams = newInboundStreams;

  entity.save();

  // stream history
  const streamHistoryId = createRandomId("StreamHistory", event.transaction.hash, event.logIndex);
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "delete";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}
