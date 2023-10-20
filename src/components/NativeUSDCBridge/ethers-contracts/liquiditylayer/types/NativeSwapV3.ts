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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "./common";

export type OrderResponseStruct = {
  encodedWormholeMessage: PromiseOrValue<BytesLike>;
  circleBridgeMessage: PromiseOrValue<BytesLike>;
  circleAttestation: PromiseOrValue<BytesLike>;
};

export type OrderResponseStructOutput = [string, string, string] & {
  encodedWormholeMessage: string;
  circleBridgeMessage: string;
  circleAttestation: string;
};

export declare namespace NativeSwapBase {
  export type RecvSwapInParametersStruct = {
    estimatedAmount: PromiseOrValue<BigNumberish>;
    recipientAddress: PromiseOrValue<BytesLike>;
    path: [PromiseOrValue<string>, PromiseOrValue<string>];
    deadline: PromiseOrValue<BigNumberish>;
    poolFee: PromiseOrValue<BigNumberish>;
    relayerFee: PromiseOrValue<BigNumberish>;
  };

  export type RecvSwapInParametersStructOutput = [
    BigNumber,
    string,
    [string, string],
    BigNumber,
    number,
    BigNumber
  ] & {
    estimatedAmount: BigNumber;
    recipientAddress: string;
    path: [string, string];
    deadline: BigNumber;
    poolFee: number;
    relayerFee: BigNumber;
  };

  export type ExactInParametersStruct = {
    amountIn: PromiseOrValue<BigNumberish>;
    amountOutMinimum: PromiseOrValue<BigNumberish>;
    targetAmountOutMinimum: PromiseOrValue<BigNumberish>;
    targetChainRecipient: PromiseOrValue<BytesLike>;
    deadline: PromiseOrValue<BigNumberish>;
    poolFee: PromiseOrValue<BigNumberish>;
  };

  export type ExactInParametersStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber,
    number
  ] & {
    amountIn: BigNumber;
    amountOutMinimum: BigNumber;
    targetAmountOutMinimum: BigNumber;
    targetChainRecipient: string;
    deadline: BigNumber;
    poolFee: number;
  };
}

export interface NativeSwapV3Interface extends utils.Interface {
  functions: {
    "ORDER_ROUTER()": FunctionFragment;
    "SWAP_FAILED()": FunctionFragment;
    "SWAP_ROUTER()": FunctionFragment;
    "SWAP_SUCCEEDED()": FunctionFragment;
    "USDC_ADDRESS()": FunctionFragment;
    "WORMHOLE()": FunctionFragment;
    "WRAPPED_NATIVE_ADDRESS()": FunctionFragment;
    "decodeSwapInParameters(bytes)": FunctionFragment;
    "deployer()": FunctionFragment;
    "encodeSwapInParameters((uint256,uint256,uint256,bytes32,uint256,uint24),address[],uint256)": FunctionFragment;
    "handleOrderRevert((bytes,bytes,bytes))": FunctionFragment;
    "recvAndSwapExactNativeIn((bytes,bytes,bytes))": FunctionFragment;
    "registerContract(uint16,bytes32)": FunctionFragment;
    "registeredContracts(uint16)": FunctionFragment;
    "relayerFees(uint16)": FunctionFragment;
    "setRelayerFee(uint16,uint256)": FunctionFragment;
    "swapExactNativeInAndTransfer((uint256,uint256,uint256,bytes32,uint256,uint24),address[],uint16,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "ORDER_ROUTER"
      | "SWAP_FAILED"
      | "SWAP_ROUTER"
      | "SWAP_SUCCEEDED"
      | "USDC_ADDRESS"
      | "WORMHOLE"
      | "WRAPPED_NATIVE_ADDRESS"
      | "decodeSwapInParameters"
      | "deployer"
      | "encodeSwapInParameters"
      | "handleOrderRevert"
      | "recvAndSwapExactNativeIn"
      | "registerContract"
      | "registeredContracts"
      | "relayerFees"
      | "setRelayerFee"
      | "swapExactNativeInAndTransfer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "ORDER_ROUTER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SWAP_FAILED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SWAP_ROUTER",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "SWAP_SUCCEEDED",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "USDC_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "WORMHOLE", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "WRAPPED_NATIVE_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "decodeSwapInParameters",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(functionFragment: "deployer", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "encodeSwapInParameters",
    values: [
      NativeSwapBase.ExactInParametersStruct,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "handleOrderRevert",
    values: [OrderResponseStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "recvAndSwapExactNativeIn",
    values: [OrderResponseStruct]
  ): string;
  encodeFunctionData(
    functionFragment: "registerContract",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "registeredContracts",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "relayerFees",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "setRelayerFee",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "swapExactNativeInAndTransfer",
    values: [
      NativeSwapBase.ExactInParametersStruct,
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "ORDER_ROUTER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SWAP_FAILED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SWAP_ROUTER",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "SWAP_SUCCEEDED",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "USDC_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "WORMHOLE", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "WRAPPED_NATIVE_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "decodeSwapInParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "deployer", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "encodeSwapInParameters",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "handleOrderRevert",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "recvAndSwapExactNativeIn",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registerContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "registeredContracts",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "relayerFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setRelayerFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "swapExactNativeInAndTransfer",
    data: BytesLike
  ): Result;

  events: {
    "SwapResult(address,address,address,uint256,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "SwapResult"): EventFragment;
}

export interface SwapResultEventObject {
  _recipient: string;
  _tokenOut: string;
  _from: string;
  _amountOut: BigNumber;
  _success: number;
}
export type SwapResultEvent = TypedEvent<
  [string, string, string, BigNumber, number],
  SwapResultEventObject
>;

export type SwapResultEventFilter = TypedEventFilter<SwapResultEvent>;

export interface NativeSwapV3 extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NativeSwapV3Interface;

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
    ORDER_ROUTER(overrides?: CallOverrides): Promise<[string]>;

    SWAP_FAILED(overrides?: CallOverrides): Promise<[number]>;

    SWAP_ROUTER(overrides?: CallOverrides): Promise<[string]>;

    SWAP_SUCCEEDED(overrides?: CallOverrides): Promise<[number]>;

    USDC_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    WORMHOLE(overrides?: CallOverrides): Promise<[string]>;

    WRAPPED_NATIVE_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    decodeSwapInParameters(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<
      [NativeSwapBase.RecvSwapInParametersStructOutput] & {
        params: NativeSwapBase.RecvSwapInParametersStructOutput;
      }
    >;

    deployer(overrides?: CallOverrides): Promise<[string]>;

    encodeSwapInParameters(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    handleOrderRevert(
      response: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    recvAndSwapExactNativeIn(
      orderResponse: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerContract(
      chainId: PromiseOrValue<BigNumberish>,
      contractAddress: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registeredContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[string]>;

    relayerFees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    setRelayerFee(
      chainId: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    swapExactNativeInAndTransfer(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      targetChainId: PromiseOrValue<BigNumberish>,
      wormholeSlippage: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  ORDER_ROUTER(overrides?: CallOverrides): Promise<string>;

  SWAP_FAILED(overrides?: CallOverrides): Promise<number>;

  SWAP_ROUTER(overrides?: CallOverrides): Promise<string>;

  SWAP_SUCCEEDED(overrides?: CallOverrides): Promise<number>;

  USDC_ADDRESS(overrides?: CallOverrides): Promise<string>;

  WORMHOLE(overrides?: CallOverrides): Promise<string>;

  WRAPPED_NATIVE_ADDRESS(overrides?: CallOverrides): Promise<string>;

  decodeSwapInParameters(
    encoded: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<NativeSwapBase.RecvSwapInParametersStructOutput>;

  deployer(overrides?: CallOverrides): Promise<string>;

  encodeSwapInParameters(
    swapParams: NativeSwapBase.ExactInParametersStruct,
    path: PromiseOrValue<string>[],
    relayerFee: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  handleOrderRevert(
    response: OrderResponseStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  recvAndSwapExactNativeIn(
    orderResponse: OrderResponseStruct,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerContract(
    chainId: PromiseOrValue<BigNumberish>,
    contractAddress: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registeredContracts(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<string>;

  relayerFees(
    arg0: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  setRelayerFee(
    chainId: PromiseOrValue<BigNumberish>,
    fee: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  swapExactNativeInAndTransfer(
    swapParams: NativeSwapBase.ExactInParametersStruct,
    path: PromiseOrValue<string>[],
    targetChainId: PromiseOrValue<BigNumberish>,
    wormholeSlippage: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    ORDER_ROUTER(overrides?: CallOverrides): Promise<string>;

    SWAP_FAILED(overrides?: CallOverrides): Promise<number>;

    SWAP_ROUTER(overrides?: CallOverrides): Promise<string>;

    SWAP_SUCCEEDED(overrides?: CallOverrides): Promise<number>;

    USDC_ADDRESS(overrides?: CallOverrides): Promise<string>;

    WORMHOLE(overrides?: CallOverrides): Promise<string>;

    WRAPPED_NATIVE_ADDRESS(overrides?: CallOverrides): Promise<string>;

    decodeSwapInParameters(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<NativeSwapBase.RecvSwapInParametersStructOutput>;

    deployer(overrides?: CallOverrides): Promise<string>;

    encodeSwapInParameters(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    handleOrderRevert(
      response: OrderResponseStruct,
      overrides?: CallOverrides
    ): Promise<void>;

    recvAndSwapExactNativeIn(
      orderResponse: OrderResponseStruct,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    registerContract(
      chainId: PromiseOrValue<BigNumberish>,
      contractAddress: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    registeredContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<string>;

    relayerFees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setRelayerFee(
      chainId: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    swapExactNativeInAndTransfer(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      targetChainId: PromiseOrValue<BigNumberish>,
      wormholeSlippage: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "SwapResult(address,address,address,uint256,uint8)"(
      _recipient?: PromiseOrValue<string> | null,
      _tokenOut?: null,
      _from?: null,
      _amountOut?: null,
      _success?: null
    ): SwapResultEventFilter;
    SwapResult(
      _recipient?: PromiseOrValue<string> | null,
      _tokenOut?: null,
      _from?: null,
      _amountOut?: null,
      _success?: null
    ): SwapResultEventFilter;
  };

  estimateGas: {
    ORDER_ROUTER(overrides?: CallOverrides): Promise<BigNumber>;

    SWAP_FAILED(overrides?: CallOverrides): Promise<BigNumber>;

    SWAP_ROUTER(overrides?: CallOverrides): Promise<BigNumber>;

    SWAP_SUCCEEDED(overrides?: CallOverrides): Promise<BigNumber>;

    USDC_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    WORMHOLE(overrides?: CallOverrides): Promise<BigNumber>;

    WRAPPED_NATIVE_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    decodeSwapInParameters(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    deployer(overrides?: CallOverrides): Promise<BigNumber>;

    encodeSwapInParameters(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    handleOrderRevert(
      response: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    recvAndSwapExactNativeIn(
      orderResponse: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerContract(
      chainId: PromiseOrValue<BigNumberish>,
      contractAddress: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registeredContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    relayerFees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    setRelayerFee(
      chainId: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    swapExactNativeInAndTransfer(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      targetChainId: PromiseOrValue<BigNumberish>,
      wormholeSlippage: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    ORDER_ROUTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SWAP_FAILED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SWAP_ROUTER(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SWAP_SUCCEEDED(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    USDC_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WORMHOLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    WRAPPED_NATIVE_ADDRESS(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    decodeSwapInParameters(
      encoded: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    deployer(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    encodeSwapInParameters(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      relayerFee: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    handleOrderRevert(
      response: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    recvAndSwapExactNativeIn(
      orderResponse: OrderResponseStruct,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerContract(
      chainId: PromiseOrValue<BigNumberish>,
      contractAddress: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registeredContracts(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    relayerFees(
      arg0: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    setRelayerFee(
      chainId: PromiseOrValue<BigNumberish>,
      fee: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    swapExactNativeInAndTransfer(
      swapParams: NativeSwapBase.ExactInParametersStruct,
      path: PromiseOrValue<string>[],
      targetChainId: PromiseOrValue<BigNumberish>,
      wormholeSlippage: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
