import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useAccount,
  useWaitForTransaction,
} from 'wagmi';
import { ethers } from 'ethers';
import axios from 'axios';
import { useCounterStore } from './store';
import { contractAddresses, } from '../config';
import contractABI from '../assets/abi/contract-abi.json';
const secondsInDay = 24 * 60 * 60 * 1000;

export const useBulkIsDomain = () => {
  const [count, setCount] = useCounterStore();
  const { chain } = useNetwork();

  const { data: bulkIsdomain, error, isLoading } = useContractRead({
    address: contractAddresses[chain.id],
    abi: contractABI,
    functionName: "bulkIsdomain",
    args: [count.names],
    onSuccess() {
      console.log("bulk is domain success")
    },
    onError(error) {
      console.log("error occured in use bulk is domain: ", error);
    }
  });

  return {
    status: error == undefined ? true : false,
    result: bulkIsdomain,
    isLoading,
  }
}

export const useReadDomainByName = (detailName) => {
  const { chain } = useNetwork();
  console.log("detail name: ", detailName);

  const { data: readDomainByName, error, isLoading } = useContractRead({
    address: contractAddresses[chain.id],
    abi: contractABI,
    functionName: "readDomainByName",
    args: [detailName],
    onSuccess() {
      console.log("read domain by name success")
    },
    onError(error) {
      console.log("error occured in read domain by name: ", error);
    }
  });

  return {
    status: error == undefined ? true : false,
    result: readDomainByName,
    isLoading,
  }
}

export const useBulkBuyDomain = (names, deadlines, totalValue) => {
  const { chain } = useNetwork();
  const { address, } = useAccount();

  const { config, error: prepareError } = usePrepareContractWrite({
    address: contractAddresses[chain.id],
    abi: contractABI,
    functionName: 'bulkBuyDomain',
    args: [names, deadlines],
    overrides: {
      value: ethers.utils.parseEther(totalValue?.toString()),
    },
    onSuccess(data) {
      console.log('prepare contract write Success', data)
    },
    onError(prepareError) {
      console.log('prepare contract write Error', prepareError)
    },
  })
  const { write: buyFunction, data } = useContractWrite(config)
  const { isLoading, isSuccess, isError, error, } = useWaitForTransaction({
    hash: data?.hash,
    onSuccess(data) {
      window.alert("wait for transaction success: ", data);
    },
    onError(error) {
      window.alert('wait for transaction result error: ', error);
    },
  })

  return {
    status: error == undefined ? true : false,
    isLoading,
    buyFunction,
    isSuccess,
  }
}