const projectId = '55955a821304e74a0b8d82bac1725e05';

const sepolia = {
    chainId: 11155111,
    name: 'Sepolia',
    currency: 'ETH',
    explorerUrl: 'https://sepolia.etherscan.io',
    rpcUrl: 'https://ethereum-sepolia-rpc.publicnode.com',
};

const metadata = {
    name: 'Web3Modal/Magic Demo App',
    description: 'Magic email and 3rd party wallet connection by WalletConnect',
    url: 'http://localhost:3000',
    icons: ['https://avatars.mywebsite.com/'],
    enableCoinbase: true,
    enableEIP6963: false
};

export const web3ModalParams = {
    configOptions: { metadata },
    modalOptions: {
        chains: [sepolia],
        projectId
    }
};