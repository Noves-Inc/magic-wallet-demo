import React, { FC, useState } from 'react';
import Divider from '@/components/ui/Divider';
import CardLabel from '@/components/ui/CardLabel';
import { generateFlowViewData } from '@/utils/generateFlowViewData';
import { TableActionCard } from './TableActionCard';
import { truncateMiddle } from '@/utils/stringHelpers';
import { ResponseData } from '@/utils/types';
import CardHeader from '@/components/ui/CardHeader';
import Spinner from '@/components/ui/Spinner';
import Footer from './Footer';
import Spacer from '@/components/ui/Spacer';

interface Props {
    tx: ResponseData;
    loading: boolean
}

const code = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>
)

const document = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-1">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>

)

const Simulation: FC<Props> = ({ tx, loading }) => {
  const [showCode, setShowCode] = useState<boolean>(false)

  const SeeCode = () => (
    <button
      className='mb-5 wallet-method flex items-center'
      onClick={() => setShowCode(!showCode)}
    >
      {
        showCode ?
          <span className='flex items-center'>Show Default {document}</span>
          :
          <span className='flex items-center'>Show Code{code}</span>
      }
    </button>
  )

  if(loading){
    return <div className='mt-8'>
      <CardHeader id='simulation'>Transaction Simulation</CardHeader>
      <Spinner/>
    </div>
  }

  if(tx.classificationData.type === 'error'){
    return <div className='mt-8'>
      <CardHeader id='simulation'>Transaction Simulation</CardHeader>
      <CardLabel rightAction={<SeeCode/>}/>
      {
        !showCode ? (
          <>
            <CardLabel leftHeader="Type" history />
            <div className='code'>{tx.classificationData.type}</div>
            <Divider/>
            <CardLabel leftHeader="Message" history />
            <div className='code'>{tx.classificationData.message}</div>

          </>
        ) : (
          <pre className='code overflow-x-scroll'>
            {JSON.stringify(tx, null, 2)}
          </pre>
        )
      }
      <Spacer size={20} />
      <Footer/>
    </div>
  }

  return (
    <div className='mt-8'>
      <CardHeader id='simulation'>Transaction Simulation</CardHeader>
      <CardLabel rightAction={<SeeCode/>}/>
      {
        !showCode ? (
          <>
            <CardLabel leftHeader="Type" history />
            <div className='code'>{tx.classificationData.type}</div>
            <Divider/>
            <CardLabel leftHeader="Description" history />
            <div className='code'>{tx.classificationData.description}</div>
            <Divider/>
            <CardLabel leftHeader="Flow" history />

            <FlowView tx={tx} />
          </>
        ) : (
          <pre className='code overflow-x-scroll'>
            {JSON.stringify(tx, null, 2)}
          </pre>
        )
      }
      <Spacer size={20} />
      <Footer/>
    </div>
  );
};

const fireIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="ml-1 w-4 text-orange-700 cursor-pointer motion-reduce:animate-pulse">
    <path fillRule="evenodd" d="M12.963 2.286a.75.75 0 00-1.071-.136 9.742 9.742 0 00-3.539 6.177A7.547 7.547 0 016.648 6.61a.75.75 0 00-1.152-.082A9 9 0 1015.68 4.534a7.46 7.46 0 01-2.717-2.248zM15.75 14.25a3.75 3.75 0 11-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 011.925-3.545 3.75 3.75 0 013.255 3.717z" clipRule="evenodd" />
  </svg>

)

interface FlowProps {
    tx: ResponseData
}

const FlowView: FC<FlowProps> = ({tx}) => {
  if (!tx) {
    return null;
  }

  const tableViewData = generateFlowViewData(tx);

  return (
    <div>
      {tableViewData.map((item, i) => (
        <div key={i} >
          <div className='flex flex-col items-center'>
            <TableActionCard
              action={item.action}
            />

            <div className="text-sm text-gray-500">
              <div className="text-gray-900">
                <span className="flex">
                  {item.rightActor.name}
                  {item.rightActor.name === 'Null address' && fireIcon}
                </span>
              </div>

              <span>{truncateMiddle(item.rightActor.address || '', 6, 4)}</span>
            </div>
          </div>
          {
            i < tableViewData.length - 1 && (
              <Divider/>
            )
          }
        </div>
      ))}
    </div>
  )
}

export default Simulation;
