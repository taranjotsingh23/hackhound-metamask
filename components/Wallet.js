import React from 'react'
import {
    EthereumClient,
    modalConnectors,
    walletConnectProvider,
  } from "@web3modal/ethereum";
  import { Web3Button, Web3Modal } from "@web3modal/react";
  import { configureChains, createClient, WagmiConfig } from "wagmi";
  import { arbitrum, goerli, polygon } from "wagmi/chains";

const Wallet = () => {
    const chains = [arbitrum, goerli, polygon];

// Wagmi client
const { provider } = configureChains(chains, [
  walletConnectProvider({ projectId: "7457869b0c86badd1a89560d294b4714" }),
]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: modalConnectors({
    projectId: "7457869b0c86badd1a89560d294b4714",
    version: "1", // or "2"
    appName: "web3Modal",
    chains,
  }),
  provider,
});

// Web3Modal Ethereum Client
const ethereumClient = new EthereumClient(wagmiClient, chains);
  return (
    <>
    <WagmiConfig client={wagmiClient}>
      </WagmiConfig>

      <Web3Modal
        projectId="7457869b0c86badd1a89560d294b4714"
        ethereumClient={ethereumClient}
      />
      <Web3Button />
    </>
  )
}

export default Wallet