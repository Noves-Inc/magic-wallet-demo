import React from 'react';
import Disconnect from '../wallet-methods/Disconnect';
import GetWalletInfo from '../wallet-methods/GetWalletInfo';
import RequestUserInfo from '../wallet-methods/RequestUserInfo';
import ShowUI from '../wallet-methods/ShowUi';
import Divider from '@/components/ui/Divider';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';

interface Props {
  setAccount: React.Dispatch<React.SetStateAction<string | null>>;
}

const WalletMethods = ({ setAccount }: Props) => {
  return (
    <Card>
      <CardHeader id="wallet-methods">Wallet Methods</CardHeader>
      <ShowUI />
      <Divider />
      <GetWalletInfo />
      <Divider />
      <RequestUserInfo />
      <Divider />
      <Disconnect setAccount={setAccount} />
    </Card>
  );
};

export default WalletMethods;
