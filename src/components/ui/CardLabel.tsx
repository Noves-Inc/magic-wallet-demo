import React from 'react'

interface Props {
	leftHeader?: React.ReactNode
	rightAction?: React.ReactNode
	isDisconnect?: boolean
	history?: boolean;
	[rest: string]: any
}

const CardLabel = ({leftHeader, rightAction, isDisconnect, history, ...rest}: Props) => {
	return (
		<div className='card-label-container' {...rest}>
			<div className={`card-label ${history && 'card-history-label'}`} >{leftHeader}</div>
			{rightAction ? (
				<div
					className={`card-label ${
						isDisconnect ? 'disconnect-button' : 'action-button'
					}`}>
					{rightAction}
				</div>
			) : null}
		</div>
	)
}

export default CardLabel
