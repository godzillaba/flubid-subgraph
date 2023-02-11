// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class ContinuousRentalAuctionFactory extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save ContinuousRentalAuctionFactory entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ContinuousRentalAuctionFactory must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set(
        "ContinuousRentalAuctionFactory",
        id.toBytes().toHexString(),
        this
      );
    }
  }

  static load(id: Bytes): ContinuousRentalAuctionFactory | null {
    return changetype<ContinuousRentalAuctionFactory | null>(
      store.get("ContinuousRentalAuctionFactory", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }
}

export class Stream extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Stream entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Stream must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Stream", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Stream | null {
    return changetype<Stream | null>(store.get("Stream", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value!.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }

  get flowRate(): BigInt {
    let value = this.get("flowRate");
    return value!.toBigInt();
  }

  set flowRate(value: BigInt) {
    this.set("flowRate", Value.fromBigInt(value));
  }
}

export class StreamHistory extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save StreamHistory entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type StreamHistory must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("StreamHistory", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): StreamHistory | null {
    return changetype<StreamHistory | null>(
      store.get("StreamHistory", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get sender(): Bytes {
    let value = this.get("sender");
    return value!.toBytes();
  }

  set sender(value: Bytes) {
    this.set("sender", Value.fromBytes(value));
  }

  get receiver(): Bytes {
    let value = this.get("receiver");
    return value!.toBytes();
  }

  set receiver(value: Bytes) {
    this.set("receiver", Value.fromBytes(value));
  }

  get flowRate(): BigInt | null {
    let value = this.get("flowRate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set flowRate(value: BigInt | null) {
    if (!value) {
      this.unset("flowRate");
    } else {
      this.set("flowRate", Value.fromBigInt(<BigInt>value));
    }
  }

  get operation(): string {
    let value = this.get("operation");
    return value!.toString();
  }

  set operation(value: string) {
    this.set("operation", Value.fromString(value));
  }
}

export class ContinuousRentalAuction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(
      id != null,
      "Cannot save ContinuousRentalAuction entity without an ID"
    );
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type ContinuousRentalAuction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("ContinuousRentalAuction", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): ContinuousRentalAuction | null {
    return changetype<ContinuousRentalAuction | null>(
      store.get("ContinuousRentalAuction", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get controllerObserverImplementation(): Bytes {
    let value = this.get("controllerObserverImplementation");
    return value!.toBytes();
  }

  set controllerObserverImplementation(value: Bytes) {
    this.set("controllerObserverImplementation", Value.fromBytes(value));
  }

  get controllerObserver(): Bytes {
    let value = this.get("controllerObserver");
    return value!.toBytes();
  }

  set controllerObserver(value: Bytes) {
    this.set("controllerObserver", Value.fromBytes(value));
  }

  get acceptedToken(): Bytes | null {
    let value = this.get("acceptedToken");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set acceptedToken(value: Bytes | null) {
    if (!value) {
      this.unset("acceptedToken");
    } else {
      this.set("acceptedToken", Value.fromBytes(<Bytes>value));
    }
  }

  get beneficiary(): Bytes | null {
    let value = this.get("beneficiary");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set beneficiary(value: Bytes | null) {
    if (!value) {
      this.unset("beneficiary");
    } else {
      this.set("beneficiary", Value.fromBytes(<Bytes>value));
    }
  }

  get minimumBidFactorWad(): BigInt | null {
    let value = this.get("minimumBidFactorWad");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minimumBidFactorWad(value: BigInt | null) {
    if (!value) {
      this.unset("minimumBidFactorWad");
    } else {
      this.set("minimumBidFactorWad", Value.fromBigInt(<BigInt>value));
    }
  }

  get reserveRate(): BigInt | null {
    let value = this.get("reserveRate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reserveRate(value: BigInt | null) {
    if (!value) {
      this.unset("reserveRate");
    } else {
      this.set("reserveRate", Value.fromBigInt(<BigInt>value));
    }
  }

  get currentRenter(): Bytes | null {
    let value = this.get("currentRenter");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set currentRenter(value: Bytes | null) {
    if (!value) {
      this.unset("currentRenter");
    } else {
      this.set("currentRenter", Value.fromBytes(<Bytes>value));
    }
  }

  get inboundStreams(): Array<Bytes> | null {
    let value = this.get("inboundStreams");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set inboundStreams(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("inboundStreams");
    } else {
      this.set("inboundStreams", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }
}

export class EnglishRentalAuction extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save EnglishRentalAuction entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type EnglishRentalAuction must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("EnglishRentalAuction", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): EnglishRentalAuction | null {
    return changetype<EnglishRentalAuction | null>(
      store.get("EnglishRentalAuction", id.toHexString())
    );
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get controllerObserverImplementation(): Bytes {
    let value = this.get("controllerObserverImplementation");
    return value!.toBytes();
  }

  set controllerObserverImplementation(value: Bytes) {
    this.set("controllerObserverImplementation", Value.fromBytes(value));
  }

  get controllerObserver(): Bytes {
    let value = this.get("controllerObserver");
    return value!.toBytes();
  }

  set controllerObserver(value: Bytes) {
    this.set("controllerObserver", Value.fromBytes(value));
  }

  get acceptedToken(): Bytes | null {
    let value = this.get("acceptedToken");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set acceptedToken(value: Bytes | null) {
    if (!value) {
      this.unset("acceptedToken");
    } else {
      this.set("acceptedToken", Value.fromBytes(<Bytes>value));
    }
  }

  get beneficiary(): Bytes | null {
    let value = this.get("beneficiary");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set beneficiary(value: Bytes | null) {
    if (!value) {
      this.unset("beneficiary");
    } else {
      this.set("beneficiary", Value.fromBytes(<Bytes>value));
    }
  }

  get minimumBidFactorWad(): BigInt | null {
    let value = this.get("minimumBidFactorWad");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minimumBidFactorWad(value: BigInt | null) {
    if (!value) {
      this.unset("minimumBidFactorWad");
    } else {
      this.set("minimumBidFactorWad", Value.fromBigInt(<BigInt>value));
    }
  }

  get reserveRate(): BigInt | null {
    let value = this.get("reserveRate");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set reserveRate(value: BigInt | null) {
    if (!value) {
      this.unset("reserveRate");
    } else {
      this.set("reserveRate", Value.fromBigInt(<BigInt>value));
    }
  }

  get minRentalDuration(): BigInt | null {
    let value = this.get("minRentalDuration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set minRentalDuration(value: BigInt | null) {
    if (!value) {
      this.unset("minRentalDuration");
    } else {
      this.set("minRentalDuration", Value.fromBigInt(<BigInt>value));
    }
  }

  get maxRentalDuration(): BigInt | null {
    let value = this.get("maxRentalDuration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set maxRentalDuration(value: BigInt | null) {
    if (!value) {
      this.unset("maxRentalDuration");
    } else {
      this.set("maxRentalDuration", Value.fromBigInt(<BigInt>value));
    }
  }

  get biddingPhaseDuration(): BigInt | null {
    let value = this.get("biddingPhaseDuration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set biddingPhaseDuration(value: BigInt | null) {
    if (!value) {
      this.unset("biddingPhaseDuration");
    } else {
      this.set("biddingPhaseDuration", Value.fromBigInt(<BigInt>value));
    }
  }

  get biddingPhaseExtensionDuration(): BigInt | null {
    let value = this.get("biddingPhaseExtensionDuration");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set biddingPhaseExtensionDuration(value: BigInt | null) {
    if (!value) {
      this.unset("biddingPhaseExtensionDuration");
    } else {
      this.set(
        "biddingPhaseExtensionDuration",
        Value.fromBigInt(<BigInt>value)
      );
    }
  }

  get currentRenter(): Bytes | null {
    let value = this.get("currentRenter");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set currentRenter(value: Bytes | null) {
    if (!value) {
      this.unset("currentRenter");
    } else {
      this.set("currentRenter", Value.fromBytes(<Bytes>value));
    }
  }
}
