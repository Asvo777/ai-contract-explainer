// Import the ethers library
import { ethers, JsonRpcProvider, isAddress } from 'ethers';

const DUCKCHAIN_RPC_URL = "https://rpc-hk.duckchain.io/";
// 2. Create a provider (our connection to the blockchain)
const provider = new JsonRpcProvider(DUCKCHAIN_RPC_URL);

// 3. This is the core function you will call from your React components
export const getContractBytecode = async (contractAddress: string): Promise<string> => {
  // Basic validation
  if (!isAddress(contractAddress)) {
    throw new Error("Invalid contract address provided.");
  }

  // The magic call to the blockchain
  const bytecode = await provider.getCode(contractAddress);

  if (bytecode === '0x') {
    throw new Error("No contract found at this address.");
  }

  return bytecode;
};

// 4. (Optional) Can also create a function to get the ABI if you have it.
// This would be useful for more advanced interactions later.