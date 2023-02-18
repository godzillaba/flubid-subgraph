import { ERC721ControllerObserver } from "../generated/schema";
import {
    OwnershipTransferred as OwnershipTransferredEvent
} from "../generated/templates/ERC721ControllerObserver/ERC721ControllerObserver";
import { createIdFromAddress } from "./helpers";

import { log } from "@graphprotocol/graph-ts";

export function handleOwnershipTransferred(event: OwnershipTransferredEvent): void {
    log.warning("handleOwnershipTransferred", []);
    const entity = ERC721ControllerObserver.load(createIdFromAddress("ERC721ControllerObserver", event.address));
    if (!entity) return;

    entity.owner = event.params.newOwner;
    entity.save();
}