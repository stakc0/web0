export class PublicKey {
  toBase58(): string;
  toString(): string;
}

export class Keypair {
  publicKey: PublicKey;
  secretKey: Uint8Array;
  static generate(): Keypair;
  static fromSecretKey(secretKey: Uint8Array): Keypair;
}

export class VersionedTransaction {
  static deserialize(serializedTransaction: Uint8Array): VersionedTransaction;
  sign(signers: Keypair[]): void;
  serialize(): Uint8Array;
}
