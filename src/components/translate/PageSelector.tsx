import { AccountHistoryResponse } from '@/utils/types'
import { Dispatch, FC, SetStateAction } from 'react'

interface Props {
    history: AccountHistoryResponse;
    setPage: Dispatch<SetStateAction<number>>
    page: number
}

const PageSelector:FC<Props> = ({history, setPage, page}) => {
  const changePage = (pageNumber: number) => {
    setPage(pageNumber)
  };

  const chevronLeftIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 cursor-pointer ${
      page === 1 ? 'text-gray-600' : 'text-sky-700'
    }`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  )

  const chevronRightIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-5 cursor-pointer ${
      !history.hasNextPage ? 'text-gray-600' : 'text-sky-700'
    }`}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

  )

  return(
    history.hasNextPage || (history.pageNumber > 1) ? (
      <div className="flex justify-center mt-3">
        <div className="flex items-center gap-x-1">
          <button
            className="bg-gray-300 rounded-md px-2 cursor-pointer flex items-center h-full"
            onClick={() => changePage(1)}
            disabled={page === 1}
          >
            <span className="text-sm font-semibold">FIRST</span>
          </button>

          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            {chevronLeftIcon}
          </button>

          <span>{page}</span>

          <button onClick={() => changePage(page + 1)} disabled={!history.hasNextPage}>
            {chevronRightIcon}
          </button>
        </div>
      </div>
    ) : null
  )
}

export default PageSelector