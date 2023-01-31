import {
  ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent,
  RentalAuctionControllerObserverDeployed as RentalAuctionControllerObserverDeployedEvent
} from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
import {
  ContinuousRentalAuctionDeployed,
  RentalAuctionControllerObserverDeployed
} from "../generated/schema"

export function handleContinuousRentalAuctionDeployed(
  event: ContinuousRentalAuctionDeployedEvent
): void {
  let entity = new ContinuousRentalAuctionDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.auctionAddress = event.params.auctionAddress
  entity.controllerObserverAddress = event.params.controllerObserverAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRentalAuctionControllerObserverDeployed(
  event: RentalAuctionControllerObserverDeployedEvent
): void {
  let entity = new RentalAuctionControllerObserverDeployed(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.controllerObserverImplementation =
    event.params.controllerObserverImplementation
  entity.controllerObserverAddress = event.params.controllerObserverAddress
  entity.auctionAddress = event.params.auctionAddress

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
