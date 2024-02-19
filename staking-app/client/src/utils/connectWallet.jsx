import { ethers, Contract } from 'ethers';
import stakingAbi from '../ABI/stakingAbi.json';
import stakeTokenAbi from '../ABI/stakeTokenAbi.json';

export const connectWallet = async () => {
  try {
    let [signer, provider, stakingContract, stakeTokenContract, chainId] = [
      null,
      null,
      null,
      null,
      null,
    ];

    if (window.ethereum === null) {
      throw new Error('Metamsk is not installed');
    }

    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    let chainIdHex = await window.ethereum.request({
      method: 'eth_chainId',
    });

    chainId = parseInt(chainIdHex, 16);

    let selectedAccount = accounts[0];
    if (!selectedAccount) {
      throw new Error('No ethereum accounts available');
    }

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    const stakingContractAddress = '0x5089f01dCC1957B316d71af168A88a4Ea505A6f3';
    const stakeTokenContractAddress =
      '0xacb6821D0E0596B2236c39bD168EA47284A21747';

    stakingContract = new Contract(stakingContractAddress, stakingAbi, signer);
    stakeTokenContract = new Contract(
      stakeTokenContractAddress,
      stakeTokenAbi,
      signer
    );

    return {
      provider,
      selectedAccount,
      stakeTokenContract,
      stakingContract,
      chainId,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
