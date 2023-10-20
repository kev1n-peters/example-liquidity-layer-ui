/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type { NativeSwapV3, NativeSwapV3Interface } from "../NativeSwapV3";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_swapRouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wormholeAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_orderRouterAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_usdcAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "_wrappedNativeAddress",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "addr",
        type: "bytes32",
      },
    ],
    name: "AddressOverflow",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_recipient",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_tokenOut",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "_from",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amountOut",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint8",
        name: "_success",
        type: "uint8",
      },
    ],
    name: "SwapResult",
    type: "event",
  },
  {
    inputs: [],
    name: "ORDER_ROUTER",
    outputs: [
      {
        internalType: "contract IOrderRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SWAP_FAILED",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SWAP_ROUTER",
    outputs: [
      {
        internalType: "contract IUniswapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "SWAP_SUCCEEDED",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "USDC_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WORMHOLE",
    outputs: [
      {
        internalType: "contract IWormhole",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "WRAPPED_NATIVE_ADDRESS",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "encoded",
        type: "bytes",
      },
    ],
    name: "decodeSwapInParameters",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "estimatedAmount",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "recipientAddress",
            type: "bytes32",
          },
          {
            internalType: "address[2]",
            name: "path",
            type: "address[2]",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint24",
            name: "poolFee",
            type: "uint24",
          },
          {
            internalType: "uint256",
            name: "relayerFee",
            type: "uint256",
          },
        ],
        internalType: "struct NativeSwapBase.RecvSwapInParameters",
        name: "params",
        type: "tuple",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [],
    name: "deployer",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "targetAmountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "targetChainRecipient",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint24",
            name: "poolFee",
            type: "uint24",
          },
        ],
        internalType: "struct NativeSwapBase.ExactInParameters",
        name: "swapParams",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "uint256",
        name: "relayerFee",
        type: "uint256",
      },
    ],
    name: "encodeSwapInParameters",
    outputs: [
      {
        internalType: "bytes",
        name: "",
        type: "bytes",
      },
    ],
    stateMutability: "pure",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "encodedWormholeMessage",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "circleBridgeMessage",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "circleAttestation",
            type: "bytes",
          },
        ],
        internalType: "struct OrderResponse",
        name: "response",
        type: "tuple",
      },
    ],
    name: "handleOrderRevert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "bytes",
            name: "encodedWormholeMessage",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "circleBridgeMessage",
            type: "bytes",
          },
          {
            internalType: "bytes",
            name: "circleAttestation",
            type: "bytes",
          },
        ],
        internalType: "struct OrderResponse",
        name: "orderResponse",
        type: "tuple",
      },
    ],
    name: "recvAndSwapExactNativeIn",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "bytes32",
        name: "contractAddress",
        type: "bytes32",
      },
    ],
    name: "registerContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "registeredContracts",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "",
        type: "uint16",
      },
    ],
    name: "relayerFees",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint16",
        name: "chainId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
    ],
    name: "setRelayerFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "amountIn",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "amountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "targetAmountOutMinimum",
            type: "uint256",
          },
          {
            internalType: "bytes32",
            name: "targetChainRecipient",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "deadline",
            type: "uint256",
          },
          {
            internalType: "uint24",
            name: "poolFee",
            type: "uint24",
          },
        ],
        internalType: "struct NativeSwapBase.ExactInParameters",
        name: "swapParams",
        type: "tuple",
      },
      {
        internalType: "address[]",
        name: "path",
        type: "address[]",
      },
      {
        internalType: "uint16",
        name: "targetChainId",
        type: "uint16",
      },
      {
        internalType: "uint256",
        name: "wormholeSlippage",
        type: "uint256",
      },
    ],
    name: "swapExactNativeInAndTransfer",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
] as const;

const _bytecode =
  "0x61014034620001af57601f6200234c38819003918201601f19168301916001600160401b03831184841017620001b45780849260a094604052833981010312620001af576200004e81620001ca565b6200005c60208301620001ca565b916200006b60408201620001ca565b906200008860806200008060608401620001ca565b9201620001ca565b90610100948561ffff1960005416176000553360805260018060a01b03938480921660a0521660c05260e0528352610120911681526040519061216c9283620001e08439608051838181610173015281816103f80152610b76015260a0518381816105ce0152818161061d0152610e15015260c0518381816101b8015281816107680152818161088401528181610cea0152611928015260e0518381816102870152818161054d0152818161078c01528181610c83015281816118c801528181611976015281816119ee01528181611b8901528181611bc601528181611c9201528181611cd00152611f60015251828181610242015281816105020152611a3e0152518181816101fd0152818161071501528181611a9401528181611b460152611c090152f35b600080fd5b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620001af5756fe608080604052600436101561001d575b50361561001b57600080fd5b005b60003560e01c9081630a99545914610e445750806335e78cfe14610dff5780633be5746f14610c5757806351e2d7b514610b54578063721a432614610b305780637a3abca214610473578063820576011461043e57806393900f07146103d7578063943650e9146102f7578063a6aa2772146102d6578063b38f92c5146102b6578063bb09d9b714610271578063be80a3911461022c578063c6005893146101e7578063c60c961a146101a2578063d5f394881461015d5763f533217f146100e5573861000f565b34610158576101003660031901126101585761010036610f5b565b60c4356001600160401b03811161015857366023820112156101585761015491610137610140923690602481600401359101610faf565b60e4359161134d565b604051918291602083526020830190611038565b0390f35b600080fd5b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346101585760206102ce6102c936610e86565b61189b565b604051908152f35b3461015857600036600319011261015857602060ff60005416604051908152f35b3461015857602080600319360112610158576004356001600160401b038111610158573660238201121561015857806004013561033381610f40565b906103416040519283610f1f565b8082523660248285010111610158578381600092602461036996018386013783010152611447565b604051908051825282810151838301526040810151926040830193906000945b600286106103b85760e08560a0866060810151608084015262ffffff60808201511682840152015160c0820152f35b82516001600160a01b0316815260019590950194918101918101610389565b346101585760403660031901126101585761ffff6103f3610e75565b6104277f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316331461171d565b166000526002602052602435604060002055600080f35b346101585760203660031901126101585761ffff61045a610e75565b1660005260026020526020604060002054604051908152f35b366003190161012081126101585760c0136101585760c4356001600160401b0381116101585736602382011215610158576001600160401b0381600401351161015857366024826004013560051b830101116101585760e43561ffff811681036101585760048281013503610afc57816004013515610a95576104f860248301611820565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116911603610aab57816004013560011015610a955761054360448301611820565b6001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116911603610a585761ffff81166000526002602052604060002054610595610104358261143a565b6024351115610a135761ffff821660005260016020526040600020549283156109ce57604051631a90a21960e01b8152936020856004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9485156108ed5760009561099a575b50604051631a90a21960e01b81526020816004817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9081156108ed57600091610968575b5034111561092e576106688534611130565b9282600401356002116101585760a4359362ffffff85168503610158576107119460209162ffffff61069c60248801611820565b926106a960448901611820565b604051946106b686610eb7565b6001600160a01b039081168652168585015216604080840191909152306060840152608435608084015260a0830182905260243560c0840152600060e08401525163414bf38960e01b81529687928391829160048301611834565b03917f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19384156108ed576000946108f9575b5060209461ffff916107e4906107b1876001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116907f000000000000000000000000000000000000000000000000000000000000000016611769565b6107c061010435602435611130565b956107de6107cd36610f5b565b913690602481600401359101610faf565b9061134d565b93604051956107f287610ee9565b865286860152166040840152606083015260808201523360a082015260405192838080936359a1c16960e11b82528560048301528051602483015285810151604483015261ffff604082015116606483015260608101516084830152610867608082015160c060a485015260e4840190611038565b60a0909101516001600160a01b0390811660c484015291900392907f0000000000000000000000000000000000000000000000000000000000000000165af180156108ed576108b257005b6020813d6020116108e5575b816108cb60209383610f1f565b8101031261015857516001600160401b0381160361015857005b3d91506108be565b6040513d6000823e3d90fd5b9093506020813d602011610926575b8161091560209383610f1f565b81010312610158575192602061074e565b3d9150610908565b60405162461bcd60e51b8152602060048201526012602482015271696e73756666696369656e742076616c756560701b6044820152606490fd5b90506020813d602011610992575b8161098360209383610f1f565b81010312610158575186610656565b3d9150610976565b9094506020813d6020116109c6575b816109b660209383610f1f565b8101031261015857519385610607565b3d91506109a9565b60405162461bcd60e51b815260206004820152601e60248201527f74617267657420636f6e7472616374206e6f74207265676973746572656400006044820152606490fd5b60405162461bcd60e51b815260206004820152601d60248201527f696e73756666696369656e7420616d6f756e744f75744d696e696d756d0000006044820152606490fd5b60405162461bcd60e51b8152602060048201526015602482015274746f6b656e4f7574206d757374206265205553444360581b6044820152606490fd5b634e487b7160e01b600052603260045260246000fd5b60405162461bcd60e51b8152602060048201526024808201527f746f6b656e496e206d7573742062652077726170706564206e617469766520616044820152631cdcd95d60e21b6064820152608490fd5b60405162461bcd60e51b815260206004820152600c60248201526b0d2dcecc2d8d2c840e0c2e8d60a31b6044820152606490fd5b3461015857600036600319011261015857602060ff60005460081c16604051908152f35b3461015857604036600319011261015857610b6d610e75565b60243590610ba57f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316331461171d565b8115610c035761ffff168015610bc8576000526001602052604060002055600080f35b60405162461bcd60e51b81526020600482015260136024820152720636861696e4964206d757374206265203e203606c1b6044820152606490fd5b60405162461bcd60e51b815260206004820152602660248201527f656d6974746572416464726573732063616e6e6f7420657175616c206279746560448201526573333228302960d01b6064820152608490fd5b3461015857610c6536610e86565b6040516370a0823160e01b8082523060048301526001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116916020918285602481875afa9485156108ed57600095610dcc575b50610ce660409160009596978351968780948193633791a15560e11b8352600483016110c3565b03927f0000000000000000000000000000000000000000000000000000000000000000165af19283156108ed57600093610d84575b506040519081523060048201528181602481875afa9182156108ed57600092610d54575b505061001b93610d4e91611130565b91611153565b90809250813d8311610d7d575b610d6b8183610f1f565b81010312610158575183610d4e610d3f565b503d610d61565b9092506040813d604011610dc4575b81610da060409383610f1f565b81010312610158576001815110156101585781610dbd910161105d565b9185610d1b565b3d9150610d93565b9394508284813d8311610df8575b610de48183610f1f565b810103126101585792519392610ce6610cbf565b503d610dda565b34610158576000366003190112610158576040517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03168152602090f35b346101585760203660031901126101585760209061ffff610e63610e75565b16600052600182526040600020548152f35b6004359061ffff8216820361015857565b6003199060208183011261015857600435916001600160401b03831161015857826060920301126101585760040190565b61010081019081106001600160401b03821117610ed357604052565b634e487b7160e01b600052604160045260246000fd5b60c081019081106001600160401b03821117610ed357604052565b604081019081106001600160401b03821117610ed357604052565b90601f801991011681019081106001600160401b03821117610ed357604052565b6001600160401b038111610ed357601f01601f191660200190565b60c09060031901126101585760405190610f7482610ee9565b6004358252602435602083015260443560408301526064356060830152608435608083015260a4358262ffffff821682036101585760a00152565b9092916001600160401b038411610ed3578360051b6040519260208094610fd882850182610f1f565b809781520191810192831161015857905b828210610ff65750505050565b81356001600160a01b0381168103610158578152908301908301610fe9565b60005b8381106110285750506000910152565b8181015183820152602001611018565b9060209161105181518092818552858086019101611015565b601f01601f1916010190565b51906001600160a01b038216820361015857565b9035601e19823603018112156101585701602081359101916001600160401b03821161015857813603831361015857565b908060209392818452848401376000828201840152601f01601f1916010190565b90606061112d92602081526110eb6110db8480611071565b84602085015260808401916110a2565b9061111e6111136110ff6020870187611071565b601f198587038101604087015295916110a2565b946040810190611071565b939092828603019101526110a2565b90565b9190820391821161113d57565b634e487b7160e01b600052601160045260246000fd5b60405163a9059cbb60e01b60208201526001600160a01b039092166024830152604482019290925261119b9161119682606481015b03601f198101845283610f1f565b61119d565b565b60018060a01b03169061121a6040516111b581610f04565b6020938482527f5361666545524332303a206c6f772d6c6576656c2063616c6c206661696c6564858301526000808587829751910182855af13d156112ac573d916111ff83610f40565b9261120d6040519485610f1f565b83523d868885013e6112b0565b805180611228575b50505050565b818491810103126112a857820151908115918215036112a5575061124e57808080611222565b6084906040519062461bcd60e51b82526004820152602a60248201527f5361666545524332303a204552433230206f7065726174696f6e20646964206e6044820152691bdd081cdd58d8d9595960b21b6064820152fd5b80fd5b5080fd5b6060915b9192901561131257508151156112c4575090565b3b156112cd5790565b60405162461bcd60e51b815260206004820152601d60248201527f416464726573733a2063616c6c20746f206e6f6e2d636f6e74726163740000006044820152606490fd5b8251909150156113255750805190602001fd5b60405162461bcd60e51b815260206004820152908190611349906024830190611038565b0390fd5b9190604083015192606081015191805160021015610a9557606081015190805160031015610a95576080015160a060808401519301519360405196600160f81b6020890152602188015260418701526bffffffffffffffffffffffff19809260601b16606187015260601b166075850152608984015262ffffff60e81b9060e81b1660a983015260ac82015260ac815260e081018181106001600160401b03821117610ed35760405290565b6040519061140682610ee9565b600060a08382815282602082015260405161142081610f04565b604036823760408201528260608201528260808201520152565b9190820180921161113d57565b906114506113f9565b918051156116e257600160ff8183015116036116ab57602181511061166e57602181015183526041815110611631576041810151906020918285015260558151106115f4576061810151906040918286019060601c81515260698251106115b85783607583015160601c9151015260898151106115415760898101516060860152608c81511061157d5761ffff608c82015116608086015260ac8151106115415760ac81015160a08601525160ac03611507575050565b60649250519062461bcd60e51b8252600482015260146024820152731a5b9d985b1a59081cddd85c081c185e5b1bd85960621b6044820152fd5b815162461bcd60e51b8152600481018490526015602482015274746f55696e743235365f6f75744f66426f756e647360581b6044820152606490fd5b815162461bcd60e51b8152600481018490526014602482015273746f55696e7431365f6f75744f66426f756e647360601b6044820152606490fd5b825162461bcd60e51b8152600481018590526015602482015274746f416464726573735f6f75744f66426f756e647360581b6044820152606490fd5b60405162461bcd60e51b8152600481018390526015602482015274746f416464726573735f6f75744f66426f756e647360581b6044820152606490fd5b60405162461bcd60e51b8152602060048201526015602482015274746f427974657333325f6f75744f66426f756e647360581b6044820152606490fd5b60405162461bcd60e51b8152602060048201526015602482015274746f55696e743235365f6f75744f66426f756e647360581b6044820152606490fd5b60405162461bcd60e51b815260206004820152600f60248201526e1a5b9d985b1a59081c185e5b1bd859608a1b6044820152606490fd5b60405162461bcd60e51b8152602060048201526013602482015272746f55696e74385f6f75744f66426f756e647360681b6044820152606490fd5b1561172457565b60405162461bcd60e51b815260206004820152601760248201527f63616c6c6572206e6f7420746865206465706c6f7965720000000000000000006044820152606490fd5b604051636eb1769f60e11b81523060048201526001600160a01b0383811660248301529394936020908290604490829086165afa9081156108ed576000916117ed575b506117be61119b94956111969261143a565b60405163095ea7b360e01b60208201526001600160a01b03909416602485015260448401528260648101611188565b906020823d8211611818575b8161180660209383610f1f565b810103126112a55750516117be6117ac565b3d91506117f9565b356001600160a01b03811681036101585790565b91909160e06101008201938160018060a01b039182815116855282602082015116602086015262ffffff60408201511660408601528260608201511660608601526080810151608086015260a081015160a086015260c081015160c0860152015116910152565b9060009160006118a96113f9565b506040516370a0823160e01b80825230600483015290926020846024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa9384156108ed57600094612101575b50926000611923946040518096819263079d3ea360e31b8352600483016110c3565b0381837f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19384156108ed5760009461201f575b506040519182523060048301526020826024817f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165afa80156108ed57600090611feb575b6119b89250611130565b90825161ffff602085015116600052600160205260406000205403611f95576119e46080840151611447565b60408101515190937f00000000000000000000000000000000000000000000000000000000000000006001600160a01b039081169216919091149081611f5a575b5015611f1e576040830151602001516001600160a01b037f00000000000000000000000000000000000000000000000000000000000000008116949116849003611ecb576020810151936001600160a01b03198516611eb257604082015151611abc9085906001600160a01b037f000000000000000000000000000000000000000000000000000000000000000081169116611769565b60408281015180516020918201516080860151606087015187519551611b409690949093919262ffffff16916001600160a01b039081169116611afe86610eb7565b855285850152604084015230606084015260808301528760a083015260c0820152600060e08201526040518093819263414bf38960e01b835260048301611834565b038160007f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03165af19081611e87575b50611d72575060a0015190611bb682337f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611153565b611bf3611bc38385611130565b857f00000000000000000000000000000000000000000000000000000000000000006001600160a01b0316611153565b611d0e5760405163095ea7b360e01b60208201527f00000000000000000000000000000000000000000000000000000000000000006001600160a01b031660248201526000604480830191909152815260808101916001600160401b03831182841017610ed3577fda9a4112ac825b78f13f71800fb33cf4db7b43cc29219b09b7e495a75eedeade93611cb7611cbc9360809560405260018060a01b037f00000000000000000000000000000000000000000000000000000000000000001661119d565b611130565b9260ff600054166040519460018060a01b037f00000000000000000000000000000000000000000000000000000000000000001686523360208701526040860152606085015260018060a01b031692a2565b60405162461bcd60e51b815260206004820152603660248201527f5361666545524332303a20617070726f76652066726f6d206e6f6e2d7a65726f60448201527520746f206e6f6e2d7a65726f20616c6c6f77616e636560501b6064820152608490fd5b93929194955060a00151833b1561015857604051632e1a7d4d60e01b81526000600482018190528160248183895af180156108ed57611e6a575b501560011715611e565715611e42576001600160a01b0316906108fc83808080808786f115611e3757838080600081943390f115611e2c5760807fda9a4112ac825b78f13f71800fb33cf4db7b43cc29219b09b7e495a75eedeade9160ff855460081c16604051918252336020830152600060408301526060820152a290565b6040513d84823e3d90fd5b6040513d85823e3d90fd5b634e487b7160e01b83526012600452602483fd5b634e487b7160e01b84526011600452602484fd5b9094506001600160401b038111610ed35760405260009338611dac565b602090813d8311611eab575b611e9d8183610f1f565b810103126101585738611b77565b503d611e93565b6040516326385f5160e11b815260048101869052602490fd5b60405162461bcd60e51b815260206004820152602560248201527f746f6b656e4f7574206d7573742062652077726170706564206e617469766520604482015264185cdcd95d60da1b6064820152608490fd5b60405162461bcd60e51b8152602060048201526014602482015273746f6b656e496e206d757374206265205553444360601b6044820152606490fd5b604001517f00000000000000000000000000000000000000000000000000000000000000006001600160a01b03908116911614905038611a25565b60405162461bcd60e51b815260206004820152602860248201527f66726f6d41646472657373206973206e6f74206120726567697374657265642060448201526718dbdb9d1c9858dd60c21b6064820152608490fd5b506020823d602011612017575b8161200560209383610f1f565b81010312610158576119b891516119ae565b3d9150611ff8565b9093503d806000833e6120328183610f1f565b81016020828203126101585781516001600160401b039283821161015857019160a083830312610158576040519260a0840184811083821117610ed35760405280518452602081015161ffff811681036101585760208501526120976040820161105d565b6040850152606081015160608501526080810151918211610158570181601f820112156101585780516120c981610f40565b926120d76040519485610f1f565b81845260208284010111610158576120f59160208085019101611015565b60808201529238611961565b93506020843d60201161212e575b8161211c60209383610f1f565b81010312610158579251926000611901565b3d915061210f56fea2646970667358221220eafd06ecdaa8e1da3e88426c0c0cebf4d14a7684c5cc43cb11364fa086848acf64736f6c63430008130033";

type NativeSwapV3ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: NativeSwapV3ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class NativeSwapV3__factory extends ContractFactory {
  constructor(...args: NativeSwapV3ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _swapRouterAddress: PromiseOrValue<string>,
    _wormholeAddress: PromiseOrValue<string>,
    _orderRouterAddress: PromiseOrValue<string>,
    _usdcAddress: PromiseOrValue<string>,
    _wrappedNativeAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<NativeSwapV3> {
    return super.deploy(
      _swapRouterAddress,
      _wormholeAddress,
      _orderRouterAddress,
      _usdcAddress,
      _wrappedNativeAddress,
      overrides || {}
    ) as Promise<NativeSwapV3>;
  }
  override getDeployTransaction(
    _swapRouterAddress: PromiseOrValue<string>,
    _wormholeAddress: PromiseOrValue<string>,
    _orderRouterAddress: PromiseOrValue<string>,
    _usdcAddress: PromiseOrValue<string>,
    _wrappedNativeAddress: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _swapRouterAddress,
      _wormholeAddress,
      _orderRouterAddress,
      _usdcAddress,
      _wrappedNativeAddress,
      overrides || {}
    );
  }
  override attach(address: string): NativeSwapV3 {
    return super.attach(address) as NativeSwapV3;
  }
  override connect(signer: Signer): NativeSwapV3__factory {
    return super.connect(signer) as NativeSwapV3__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): NativeSwapV3Interface {
    return new utils.Interface(_abi) as NativeSwapV3Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): NativeSwapV3 {
    return new Contract(address, _abi, signerOrProvider) as NativeSwapV3;
  }
}