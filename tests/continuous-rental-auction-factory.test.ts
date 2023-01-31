import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { ContinuousRentalAuctionDeployed } from "../generated/schema"
import { ContinuousRentalAuctionDeployed as ContinuousRentalAuctionDeployedEvent } from "../generated/ContinuousRentalAuctionFactory/ContinuousRentalAuctionFactory"
import { handleContinuousRentalAuctionDeployed } from "../src/continuous-rental-auction-factory"
import { createContinuousRentalAuctionDeployedEvent } from "./continuous-rental-auction-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let auctionAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let controllerObserverAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newContinuousRentalAuctionDeployedEvent = createContinuousRentalAuctionDeployedEvent(
      auctionAddress,
      controllerObserverAddress
    )
    handleContinuousRentalAuctionDeployed(
      newContinuousRentalAuctionDeployedEvent
    )
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ContinuousRentalAuctionDeployed created and stored", () => {
    assert.entityCount("ContinuousRentalAuctionDeployed", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ContinuousRentalAuctionDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "auctionAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ContinuousRentalAuctionDeployed",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "controllerObserverAddress",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
