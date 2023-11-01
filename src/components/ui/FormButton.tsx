import React from 'react'

interface Props {
	children: React.ReactNode
	onClick: () => void
	disabled: boolean
	secondary?: boolean
}

const FormButton = ({children, onClick, disabled, secondary}: Props) => {
	return (
		<button className={secondary ? 'form-button form-button-secondary' : 'form-button'} disabled={disabled} onClick={onClick}>
			{children}
		</button>
	)
}

export default FormButton
