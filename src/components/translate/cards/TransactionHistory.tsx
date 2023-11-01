import React, { useCallback, useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import History from '../History';
import Transaction from '../Transaction';
import Spinner from '@/components/ui/Spinner';
import { AccountHistoryResponse, ResponseData } from '@/utils/types';
import Spacer from '@/components/ui/Spacer';
import Footer from '../Footer';
import CardHeader from '@/components/ui/CardHeader';

const apiKey = process.env.NEXT_PUBLIC_TRANSLATE_API_KEY as string

const TransactionHistory = ({  }) => {
  const [history, setHistory] = useState<AccountHistoryResponse>()
  const [item, setItem] = useState<ResponseData>()
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false)
  const publicAddress = localStorage.getItem('user');
  const [page, setPage] = useState<number>(1)

  const getHistory = useCallback(async () => {
    if(!publicAddress){
      return
    }
    setIsRefreshing(true);
    fetch('/api/translate', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: publicAddress,
        chain: process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK,
        page
      }),
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        setHistory(json)
        setIsRefreshing(false);
      })
      .catch(err => {
        console.log('error', err)
        setIsRefreshing(false);
      })
  }, [publicAddress, page])

  const refresh = useCallback(async () => {
    setIsRefreshing(true);
    await getHistory();
    setTimeout(() => {
      setIsRefreshing(false);
    }, 500);
  }, [getHistory]);

  useEffect(() => {
    getHistory()
  }, [getHistory, page])

  return (
    <Card>
      <div className='flex justify-between mb-5'>
        <CardHeader id='transaction-history'>Transaction History</CardHeader>

        <div className='action-button'>
          <div onClick={refresh} className='text-base'>Refresh</div>
        </div>
      </div>
      {
        isRefreshing && <Spinner/>
      }
      { history ?
        !isRefreshing ?
          !item ?
            <History history={history} setItem={setItem} page={page} setPage={setPage}/>
            :
            <Transaction tx={item} setItem={setItem} />
          : null
        :null
      }

      <Spacer size={20}/>

      <Footer/>

    </Card>
  );
};

export default TransactionHistory;
