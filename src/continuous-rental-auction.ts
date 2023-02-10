import { BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent
} from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
import { ContinuousRentalAuction, Stream, StreamHistory } from "../generated/schema";

import {
  Initialized as InitializedEvent,
  RenterChanged as RenterChangedEvent,
  NewInboundStream as NewInboundStreamEvent,
  StreamUpdated as StreamUpdatedEvent,
  StreamTerminated as StreamTerminatedEvent
} from "../generated/templates/ContinuousRentalAuction/ContinuousRentalAuction";

function createId(prefix: string, txHash: Bytes, logIndex: BigInt): Bytes {
  return Bytes.fromUTF8(prefix).concat(txHash.concat(Bytes.fromHexString(logIndex.toHex())));
}

export function handleInitialized(event: InitializedEvent): void {
  const entity = new ContinuousRentalAuction(event.address);
  entity.acceptedToken = event.params.acceptedToken;
  entity.beneficiary = event.params.beneficiary;
  entity.minimumBidFactorWad = event.params.minimumBidFactorWad;
  entity.reserveRate = event.params.reserveRate;
  entity.save();
}

export function handleRenterChanged(event: RenterChangedEvent): void {
  const entity = new ContinuousRentalAuction(event.address);

  entity.currentRenter = event.params.newRenter;

  entity.save();
}
export function handleNewInboundStream(event: NewInboundStreamEvent): void {
  const entity = new ContinuousRentalAuction(event.address);

  // entity.currentRenter = event.params.newRenter;
  // const streamId = event.params.streamer.concat(event.address);

  const streamId = createId("Stream", event.transaction.hash, event.logIndex);
  const stream = new Stream(streamId);
  stream.flowRate = event.params.flowRate;
  stream.sender = event.params.streamer;
  stream.receiver = event.address;
  stream.save();

  let inboundStreams = entity.inboundStreams;
  if (inboundStreams === null) {
    inboundStreams = [];
  }
  inboundStreams.push(streamId);
  entity.inboundStreams = inboundStreams;

  entity.save();


  // stream history
  const streamHistoryId = createId("StreamHistory", event.transaction.hash, event.logIndex);;
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "create";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.flowRate = event.params.flowRate;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}

export function handleStreamUpdated(event: StreamUpdatedEvent): void {
  const entity = new ContinuousRentalAuction(event.address);

  // find the stream in the inboundStreams array to update
  let inboundStreams = entity.inboundStreams;
  if (inboundStreams === null) {
    inboundStreams = [];
  }

  for (let i = 0; i < inboundStreams.length; i++) {
    const streamId = inboundStreams[i];

    const streamEntity = new Stream(streamId);

    if (streamEntity.sender == event.params.streamer) {
      streamEntity.flowRate = event.params.flowRate;
      streamEntity.save();
    }
  }

  // stream history
  const streamHistoryId = createId("StreamHistory", event.transaction.hash, event.logIndex);;
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "update";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.flowRate = event.params.flowRate;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}
export function handleStreamTerminated(event: StreamTerminatedEvent): void {
  const entity = new ContinuousRentalAuction(event.address);

  let inboundStreams = entity.inboundStreams;
  if (inboundStreams === null) inboundStreams = [];

  for (let i = 0; i < inboundStreams.length; i++) {
    const streamEntity = new Stream(inboundStreams[i]);
    if (streamEntity.sender == event.params.streamer) {
      entity.inboundStreams = inboundStreams.splice(i, 1);
    }
  }

  entity.save();

  // stream history
  const streamHistoryId = createId("StreamHistory", event.transaction.hash, event.logIndex);;
  const streamHistoryEntity = new StreamHistory(streamHistoryId);
  streamHistoryEntity.operation = "delete";
  streamHistoryEntity.sender = event.params.streamer;
  streamHistoryEntity.receiver = event.address;
  streamHistoryEntity.save();
}

// export function handleContinuousRentalAuctionDeployed(
//   event: ContinuousRentalAuctionDeployedEvent
// ): void {
//   let entity = new ContinuousRentalAuctionDeployed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.auctionAddress = event.params.auctionAddress
//   entity.controllerObserverAddress = event.params.controllerObserverAddress

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }

// export function handleRentalAuctionControllerObserverDeployed(
//   event: RentalAuctionControllerObserverDeployedEvent
// ): void {
//   let entity = new RentalAuctionControllerObserverDeployed(
//     event.transaction.hash.concatI32(event.logIndex.toI32())
//   )
//   entity.controllerObserverImplementation =
//     event.params.controllerObserverImplementation
//   entity.controllerObserverAddress = event.params.controllerObserverAddress
//   entity.auctionAddress = event.params.auctionAddress

//   entity.blockNumber = event.block.number
//   entity.blockTimestamp = event.block.timestamp
//   entity.transactionHash = event.transaction.hash

//   entity.save()
// }
