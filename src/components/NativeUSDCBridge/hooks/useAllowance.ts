import { ChainId, CHAIN_ID_KLAYTN, isEVMChain } from "@certusone/wormhole-sdk";
import { BigNumber, Overrides, ethers } from "ethers";
import { useEffect, useMemo, useState } from "react";
import { useEthereumProvider } from "../contexts/EthereumProviderContext";
import { TokenImplementation__factory } from "../ethers-contracts";

export async function getAllowanceEth(
  tokenBridgeAddress: string,
  tokenAddress: string,
  signer: ethers.Signer
) {
  const token = TokenImplementation__factory.connect(tokenAddress, signer);
  const signerAddress = await signer.getAddress();
  const allowance = await token.allowance(signerAddress, tokenBridgeAddress);

  return allowance;
}

export async function approveEth(
  tokenBridgeAddress: string,
  tokenAddress: string,
  signer: ethers.Signer,
  amount: ethers.BigNumberish,
  overrides: Overrides & { from?: string | Promise<string> } = {}
) {
  const token = TokenImplementation__factory.connect(tokenAddress, signer);
  return await (
    await token.approve(tokenBridgeAddress, amount, overrides)
  ).wait();
}

export default function useAllowance(
  chainId: ChainId,
  tokenAddress?: string,
  transferAmount?: BigInt,
  sourceIsNative?: boolean,
  overrideAddress?: string
) {
  const [allowance, setAllowance] = useState<BigInt | null>(null);
  const [isAllowanceFetching, setIsAllowanceFetching] = useState(false);
  const [isApproveProcessing, setIsApproving] = useState<boolean>(false);
  const { signer } = useEthereumProvider();
  const sufficientAllowance =
    !isEVMChain(chainId) ||
    sourceIsNative ||
    (allowance && transferAmount && allowance >= transferAmount);

  useEffect(() => {
    let cancelled = false;
    if (
      isEVMChain(chainId) &&
      tokenAddress &&
      signer &&
      overrideAddress &&
      !isApproveProcessing
    ) {
      setIsAllowanceFetching(true);
      getAllowanceEth(overrideAddress, tokenAddress, signer).then(
        (result) => {
          if (!cancelled) {
            setIsAllowanceFetching(false);
            setAllowance(result.toBigInt());
          }
        },
        (error) => {
          if (!cancelled) {
            setIsAllowanceFetching(false);
            //setError("Unable to retrieve allowance"); //TODO set an error
          }
        }
      );
    }

    return () => {
      cancelled = true;
    };
  }, [chainId, tokenAddress, signer, isApproveProcessing, overrideAddress]);

  const approveAmount: (amount: BigInt) => Promise<any> = useMemo(() => {
    return !isEVMChain(chainId) || !tokenAddress || !signer || !overrideAddress
      ? (amount: BigInt) => {
          return Promise.resolve();
        }
      : (amount: BigInt) => {
          setIsApproving(true);
          // Klaytn requires specifying gasPrice
          const gasPricePromise =
            chainId === CHAIN_ID_KLAYTN
              ? signer.getGasPrice()
              : Promise.resolve(undefined);
          return gasPricePromise.then(
            (gasPrice) =>
              approveEth(
                overrideAddress,
                tokenAddress,
                signer,
                BigNumber.from(amount),
                gasPrice === undefined ? {} : { gasPrice }
              ).then(
                () => {
                  setIsApproving(false);
                  return Promise.resolve();
                },
                () => {
                  setIsApproving(false);
                  return Promise.reject();
                }
              ),
            () => {
              setIsApproving(false);
              return Promise.reject();
            }
          );
        };
  }, [chainId, tokenAddress, signer, overrideAddress]);

  return useMemo(
    () => ({
      sufficientAllowance,
      approveAmount,
      isAllowanceFetching,
      isApproveProcessing,
    }),
    [
      sufficientAllowance,
      approveAmount,
      isAllowanceFetching,
      isApproveProcessing,
    ]
  );
}
