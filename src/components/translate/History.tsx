import React, { Dispatch, FC, SetStateAction } from 'react';
import Divider from '@/components/ui/Divider';
import CardLabel from '@/components/ui/CardLabel';
import { AccountHistoryResponse, ResponseData } from '@/utils/types';
import Spacer from '@/components/ui/Spacer';
import BlockExplorer from '@/components/ui/BlockExplorer';
import PageSelector from './PageSelector';
import { timeago } from '@/utils/timeago';

interface Props {
    history: AccountHistoryResponse,
    setItem: Dispatch<SetStateAction<ResponseData | undefined>>
    page: number
    setPage: Dispatch<SetStateAction<number>>
}

const rightArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M3.75 12a.75.75 0 01.75-.75h13.19l-5.47-5.47a.75.75 0 011.06-1.06l6.75 6.75a.75.75 0 010 1.06l-6.75 6.75a.75.75 0 11-1.06-1.06l5.47-5.47H4.5a.75.75 0 01-.75-.75z" clipRule="evenodd" />
  </svg>
)

const History: FC<Props> = ({ history, setItem, setPage, page }) => {
  if(history.items && !history.items[0]){
    return(
      <p className="px-2 py-4 text-center text-lg font-semibold text-gray-700">
          This address has not made any transaction yet
      </p>
    )
  }
  console.log(history)
  return (
    <>
      <BlockExplorer />
      <Spacer size={20} />
      {history.items &&
      history.items.map((tx, i) => (
        <div key={i}>
          <div onClick={() => setItem(tx)} className='cursor-pointer'>
            <CardLabel leftHeader={<div className='flex flex-col space-y-1'>
                <span className='text-gray-500'>{timeago(tx.rawTransactionData.timestamp * 1000, true)}</span>
                <span>{tx.classificationData.description}</span>
              </div>
              }
              rightAction={rightArrow}
              history
            />
          </div>
          {
            i < history.items.length -1 && <Divider/>
          }
        </div>
      ))}
      <PageSelector history={history} page={page} setPage={setPage} />
    </>
  );
};

export default History;
