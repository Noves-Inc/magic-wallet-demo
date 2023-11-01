import React, { useEffect } from 'react';
import TableOfContents from '../ui/TableOfContents';
import AppHeader from '../ui/AppHeader';
import Wallet from './cards/UserInfoCard';
import WalletMethods from './cards/WalletMethodsCard';
import SendTransaction from './cards/SendTransactionsCard';
import Links from './DevLinks';
import Spacer from '../ui/Spacer';
import HomePageBackground from 'public/main.svg';
import TransactionHistory from '../translate/cards/TransactionHistory';
import { useMagicContext } from './MagicProvider';
import { getChainId, getNetworkName } from '@/utils/networks';

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Home({ setAccount }: Props) {
  const { magic, web3 } = useMagicContext();

  // Update state for newly connected wallet
  const handleDisconnect = async () => {
    if (magic) {
      await magic.user.logout()
      await magic.wallet.disconnect();
      localStorage.removeItem('user');
      setAccount(null);
    }
  };

  // Update state for newly connected wallet
  const handleAccountsChanged = async (acc: any) => {
    console.log('New account:', acc);
    if(magic){
      const walletInfo = await magic.wallet.getInfo();
      // If is magic wallet return
      if(walletInfo.walletType === "magic"){
        return
      }
      // If user disconnected wallet, logout & reset web3
      if (!acc[0]) {
        handleDisconnect();
      } else {
        localStorage.setItem('user', acc[0]);
        setAccount(acc[0]);
      }
    }
  };

  // Refresh the page when a user changes networks,
  const handleChainChanged = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (!web3) return;
    // Once a user is connected, check if the wallet is on the correct network
    (async function () {
      const userWalletChainId = await web3.eth.getChainId();
      const dappChainId = getChainId();
      if (Number(userWalletChainId) !== dappChainId) {
        alert(`Connected wallet is on the wrong network. Please switch to ${getNetworkName()} (chainId ${dappChainId})`);
      }
    })();

    // Listen for events emitted by third party wallets
    web3.currentProvider.on('accountsChanged', handleAccountsChanged);
    web3.currentProvider.on('chainChanged', handleChainChanged);
    return () => {
      web3.currentProvider.removeListener('accountsChanged', handleAccountsChanged);
      web3.currentProvider.removeListener('chainChanged', handleChainChanged);
    };
  }, [web3, magic]);

  return (
    <div className="home-page">
      <AppHeader />
      <Links />
      <Spacer size={120} />
      <TableOfContents />
      <div className="cards-container">
        <Wallet setAccount={setAccount} />
        <SendTransaction />
        <TransactionHistory/>
        <WalletMethods setAccount={setAccount} />
        <Spacer size={15} />
        <Links dark />
        <Spacer size={30} />
      </div>
    </div>
  );
}
