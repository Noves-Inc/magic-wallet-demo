import React, { useCallback, useEffect, useState } from 'react';
import FormButton from '@/components/ui/FormButton';
import Spacer from '@/components/ui/Spacer';
import FormInput from '@/components/ui/FormInput';
import Card from '@/components/ui/Card';
import CardHeader from '@/components/ui/CardHeader';
import ErrorText from '@/components/ui/error';
import { useMagicContext } from '@/components/magic/MagicProvider';
import { getNetworkToken } from '@/utils/networks';
import { ResponseData } from '@/utils/types';
import Simulation from '@/components/translate/Simulation';

const apiKey = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY as string

const SendTransaction = () => {
  const { web3 } = useMagicContext();
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [disabled, setDisabled] = useState<boolean>(false);
  const [toAddressError, setToAddressError] = useState(false);
  const [amountError, setAmountError] = useState(false);
  const [simulation, setSimulation] = useState<ResponseData | null>(null)
  const publicAddress = localStorage.getItem('user');
  const network = localStorage.getItem('network');
  const tokenSymbol = getNetworkToken();

  useEffect(() => {
    setAmountError(false);
    setToAddressError(false);
  }, [amount, toAddress]);

  const sendTransaction = useCallback(() => {
    if (!web3?.utils.isAddress(toAddress)) {
      return setToAddressError(true);
    }
    if (isNaN(Number(amount))) {
      return setAmountError(true);
    }
    setSimulation(null)
    setDisabled(true);
    const txnParams = {
      from: publicAddress,
      to: toAddress,
      value: web3.utils.toWei(amount, 'ether'),
      gas: 21000,
    };
    web3.eth
      .sendTransaction(txnParams as any)
      .on('transactionHash', (txHash: string) => {
        console.log('Transaction hash:', txHash);
      })
      .then((receipt: any) => {
        setToAddress('');
        setAmount('');
        console.log('Transaction receipt:', receipt);
        setDisabled(false);
      })
      .catch((error: any) => {
        console.error(error);
        setDisabled(false);
      });
  }, [web3, amount, publicAddress, toAddress]);

  const simulateTransaction = useCallback(async () => {
    if (!web3?.utils.isAddress(toAddress)) {
      return setToAddressError(true);
    }
    if (isNaN(Number(amount))) {
      return setAmountError(true);
    }
    setDisabled(true);

    const gasPrice = await web3.eth.getGasPrice()
    const gas = 21000
    const value = parseInt(web3.utils.toWei(amount, 'ether'))

    const data = {
      transaction: {
        from: publicAddress,
        to: toAddress,
        value:  `0x${value.toString(16)}`,
        gas: `0x${gas.toString(16)}`,
        data: '',
        gasPrice: `0x${gasPrice.toString(16)}`,
      }
    };

    fetch('/api/foresight', {
      method: 'POST',
      body: JSON.stringify({
        address: publicAddress,
        chain: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK,
        data
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => res.json())
    .then(json => {
      setSimulation(json)
      setDisabled(false);
    })
    .catch(err => {
      console.log('error', err)
      setDisabled(false);
    })

  }, [web3, amount, publicAddress, toAddress]);

  return (
    <Card>
      <CardHeader id="send-transaction">Send Transaction</CardHeader>
      <FormInput
        value={toAddress}
        onChange={(e: any) => setToAddress(e.target.value)}
        placeholder="Receiving Address"
      />
      {toAddressError ? <ErrorText>Invalid address</ErrorText> : null}
      <FormInput
        value={amount}
        onChange={(e: any) => setAmount(e.target.value)}
        placeholder={`Amount (${tokenSymbol})`}
      />
      {amountError ? <ErrorText className="error">Invalid amount</ErrorText> : null}
      <FormButton onClick={simulateTransaction} disabled={!toAddress || !amount || disabled} secondary>
        Transaction Preview
      </FormButton>
      <Spacer size={10} />
      <FormButton onClick={sendTransaction} disabled={!toAddress || !amount || disabled}>
        Send Transaction
      </FormButton>

      {
        simulation && (
          <Simulation tx={simulation} loading={disabled}/>
        )
      }
    </Card>
  );
};

export default SendTransaction;
