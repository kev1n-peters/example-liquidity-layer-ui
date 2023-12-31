/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export declare namespace ICircleIntegration {
  export type TransferParametersStruct = {
    token: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
    targetChain: PromiseOrValue<BigNumberish>;
    mintRecipient: PromiseOrValue<BytesLike>;
  };

  export type TransferParametersStructOutput = [
    string,
    BigNumber,
    number,
    string
  ] & {
    token: string;
    amount: BigNumber;
    targetChain: number;
    mintRecipient: string;
  };

  export type RedeemParametersStruct = {
    encodedWormholeMessage: PromiseOrValue<BytesLike>;
    circleBridgeMessage: PromiseOrValue<BytesLike>;
    circleAttestation: PromiseOrValue<BytesLike>;
  };

  export type RedeemParametersStructOutput = [string, string, string] & {
    encodedWormholeMessage: string;
    circleBridgeMessage: string;
    circleAttestation: string;
  };

  export type DepositWithPayloadStruct = {
    token: PromiseOrValue<BytesLike>;
    amount: PromiseOrValue<BigNumberish>;
    sourceDomain: PromiseOrValue<BigNumberish>;
    targetDomain: PromiseOrValue<BigNumberish>;
    nonce: PromiseOrValue<BigNumberish>;
    fromAddress: PromiseOrValue<BytesLike>;
    mintRecipient: PromiseOrValue<BytesLike>;
    payload: PromiseOrValue<BytesLike>;
  };

  export type DepositWithPayloadStructOutput = [
    string,
    BigNumber,
    number,
    number,
    BigNumber,
    string,
    string,
    string
  ] & {
    token: string;
    amount: BigNumber;
    sourceDomain: number;
    targetDomain: number;
    nonce: BigNumber;
    fromAddress: string;
    mintRecipient: string;
    payload: string;
  };
}

export interface ICircleIntegrationInterface extends utils.Interface {
  functions: {
    "transferTokensWithPayload((address,uint256,uint16,bytes32),uint32,bytes)": FunctionFragment;
    "redeemTokensWithPayload((bytes,bytes,bytes))": FunctionFragment;
    "chainId()": FunctionFragment;
    "getDomainFromChainId(uint16)": FunctionFragment;
    "getChainIdFromDomain(uint32)": FunctionFragment;
    "isMessageConsumed(bytes32)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "transferTokensWithPayload"
      | "redeemTokensWithPayload"
      | "chainId"
      | "getDomainFromChainId"
      | "getChainIdFromDomain"
      | "isMessageConsumed"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "transferTokensWithPayload",
    values: [
      ICircleIntegration.TransferParametersStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BytesLike>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "redeemTokensWithPayload",
    values: [ICircleIntegration.RedeemParametersStruct]
  ): string;
  encodeFunctionData(functionFragment: "chainId", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getDomainFromChainId",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getChainIdFromDomain",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "isMessageConsumed",
    values: [PromiseOrValue<BytesLike>]
  ): string;

  decodeFunctionResult(
    functionFragment: "transferTokensWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "redeemTokensWithPayload",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "chainId", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getDomainFromChainId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getChainIdFromDomain",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isMessageConsumed",
    data: BytesLike
  ): Result;

  events: {};
}

export interface ICircleIntegration extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ICircleIntegrationInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    transferTokensWithPayload(
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    redeemTokensWithPayload(
      params: ICircleIntegration.RedeemParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    chainId(overrides?: CallOverrides): Promise<[number]>;

    getDomainFromChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    getChainIdFromDomain(
      domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[number]>;

    isMessageConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;
  };

  transferTokensWithPayload(
    transferParams: ICircleIntegration.TransferParametersStruct,
    batchId: PromiseOrValue<BigNumberish>,
    payload: PromiseOrValue<BytesLike>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  redeemTokensWithPayload(
    params: ICircleIntegration.RedeemParametersStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  chainId(overrides?: CallOverrides): Promise<number>;

  getDomainFromChainId(
    chainId_: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  getChainIdFromDomain(
    domain: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<number>;

  isMessageConsumed(
    hash: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  callStatic: {
    transferTokensWithPayload(
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    redeemTokensWithPayload(
      params: ICircleIntegration.RedeemParametersStruct,
      overrides?: CallOverrides
    ): Promise<ICircleIntegration.DepositWithPayloadStructOutput>;

    chainId(overrides?: CallOverrides): Promise<number>;

    getDomainFromChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getChainIdFromDomain(
      domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    isMessageConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<boolean>;
  };

  filters: {};

  estimateGas: {
    transferTokensWithPayload(
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    redeemTokensWithPayload(
      params: ICircleIntegration.RedeemParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    chainId(overrides?: CallOverrides): Promise<BigNumber>;

    getDomainFromChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getChainIdFromDomain(
      domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isMessageConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    transferTokensWithPayload(
      transferParams: ICircleIntegration.TransferParametersStruct,
      batchId: PromiseOrValue<BigNumberish>,
      payload: PromiseOrValue<BytesLike>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    redeemTokensWithPayload(
      params: ICircleIntegration.RedeemParametersStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    chainId(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getDomainFromChainId(
      chainId_: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getChainIdFromDomain(
      domain: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isMessageConsumed(
      hash: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
