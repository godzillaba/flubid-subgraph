import { GenericControllerObserver } from "../generated/schema";
import {
    OwnershipTransferred as OwnershipTransferredEvent
  } from "../generated/templates/ERC721ControllerObserver/ERC721ControllerObserver";
import { createIdFromAddress } from "./helpers";

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
  const entity = GenericControllerObserver.load(createIdFromAddress("GenericControllerObserver", event.address));
  if (!entity) return;

  entity.owner = event.params.newOwner;
  entity.save();
}