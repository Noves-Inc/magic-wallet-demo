import type { Action } from '@/utils/generateFlowViewData';
import { camelCaseToSentence } from '@/utils/stringHelpers';

import { formatNumberString } from '@/utils/numberHelpers';

const downArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path fillRule="evenodd" d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
  </svg>

);

const upArrow = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
  </svg>
)

interface TableActionCardProps {
  action: Action;
}

export function TableActionCard({ action }: TableActionCardProps) {
  const label = camelCaseToSentence(action.label);

  console.log(action)

  return (
    <div className="relative flex flex-col items-center">
      <div className="flex flex-col items-center gap-y-1 rounded-md bg-purple-50 px-5 py-1 text-xs font-medium text-purple-600 ring-1 ring-inset ring-purple-600/20 w-fit cursor-pointer">
        <span className="inline-flex items-center relative ">
          {label}
        </span>

        {action.token && (
          <div>
            <span>
              {formatNumberString(action.amount?.toString() || '', 3)} {action.token.symbol}
            </span>
          </div>
        )}
        {action.nft && (
          <div>
            <span>
              {formatNumberString(action.amount?.toString() || '', 3)} {action.nft.symbol}
            </span>
          </div>
        )}
      </div>

      <div className='my-2 text-purple-600 flex flex-col items-center'>
        {action.flowDirection === "toRight" ?
          <>
            <span className='text-sm'>to</span>
            {downArrow}
          </>
        :
          <>
          {upArrow}
          <span className='text-sm'>from</span>
          </>
        }
      </div>
    </div>
  );
}
