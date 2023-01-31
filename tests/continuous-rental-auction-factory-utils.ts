import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import {
  ContinuousRentalAuctionDeployed,
  RentalAuctionControllerObserverDeployed
} from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"

export function createContinuousRentalAuctionDeployedEvent(
  auctionAddress: Address,
  controllerObserverAddress: Address
): ContinuousRentalAuctionDeployed {
  let continuousRentalAuctionDeployedEvent = changetype<
    ContinuousRentalAuctionDeployed
  >(newMockEvent())

  continuousRentalAuctionDeployedEvent.parameters = new Array()

  continuousRentalAuctionDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionAddress",
      ethereum.Value.fromAddress(auctionAddress)
    )
  )
  continuousRentalAuctionDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "controllerObserverAddress",
      ethereum.Value.fromAddress(controllerObserverAddress)
    )
  )

  return continuousRentalAuctionDeployedEvent
}

export function createRentalAuctionControllerObserverDeployedEvent(
  controllerObserverImplementation: Address,
  controllerObserverAddress: Address,
  auctionAddress: Address
): RentalAuctionControllerObserverDeployed {
  let rentalAuctionControllerObserverDeployedEvent = changetype<
    RentalAuctionControllerObserverDeployed
  >(newMockEvent())

  rentalAuctionControllerObserverDeployedEvent.parameters = new Array()

  rentalAuctionControllerObserverDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "controllerObserverImplementation",
      ethereum.Value.fromAddress(controllerObserverImplementation)
    )
  )
  rentalAuctionControllerObserverDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "controllerObserverAddress",
      ethereum.Value.fromAddress(controllerObserverAddress)
    )
  )
  rentalAuctionControllerObserverDeployedEvent.parameters.push(
    new ethereum.EventParam(
      "auctionAddress",
      ethereum.Value.fromAddress(auctionAddress)
    )
  )

  return rentalAuctionControllerObserverDeployedEvent
}
