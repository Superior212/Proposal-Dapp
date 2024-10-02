//Imports necessary modules and configurations 
import { createAppKit } from '@reown/appkit/react'
import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { sepolia } from '@reown/appkit/networks'

// 1. Get projectId
// Retrieves the projectId from environment variables.
const projectId = import.meta.env.VITE_APPKIT_PROJECT_ID;



//Defines a custom network configuration for "Lisk Sepolia". 
export const liskSepoliaNetwork = {
    id: "eip155:4202",
    chainId: 4202,
    chainNamespace: "eip155",
    name: "Lisk Sepolia",
    currency: "ETH",
    explorerUrl: import.meta.env.VITE_LISK_SEPOLIA_EXPLORER_URL,
    rpcUrl: import.meta.env.VITE_LISK_SEPOLIA_RPC_URL,
};

// 2. Set the networks
//  Sets up an array of networks including "Lisk Sepolia" and predefined`sepolia`.
const networks = [liskSepoliaNetwork, sepolia];
// 3. Create a metadata object - optional
//Creates an optional metadata object with details like name, description, url, and icons.
const metadata = {
    name: 'My Website',
    description: 'My Website description',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

// 4. Create a AppKit instance

// Creates an instance of `AppKit` with specified configurations including adapters, networks, metadata, projectId, and various features.
export const appkit = createAppKit({
    adapters: [new EthersAdapter()],
    networks,
    metadata,
    projectId,
    allowUnsupportedChain: false,
    allWallets: "SHOW",
    defaultNetwork: liskSepoliaNetwork,
    enableEIP6963: true,
    features: {
        analytics: true,
        allWallets: true,
        email: false,
        socials: [],
    },
});