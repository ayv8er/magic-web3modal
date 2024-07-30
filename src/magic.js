import { Magic } from 'magic-sdk';
import { web3ModalParams } from './web3modal';
import { Web3ModalExtension } from '@magic-ext/web3modal-ethers5';

function initializeMagic() {
    const magic = new Magic('pk_live_20F686D400716D03', {
      extensions: [new Web3ModalExtension(web3ModalParams)],
      network: 'sepolia',
    });
    magic.web3modal.initialize();
    return magic;
  }
  
  export const magic = initializeMagic();