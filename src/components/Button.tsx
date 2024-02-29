import { ButtonStyled } from '../style'
import CircleLoader from './CirlceLoader'
import { FC } from 'react'

const Button: FC<{
	name: string
	onClick: () => void
	width?: string
	disabled?: boolean
	noWrap?: boolean
	loading?: boolean
}> = ({ name, onClick, width, disabled, noWrap, loading }) => {
	return (
		<ButtonStyled
			disabled={disabled}
			width={width}
			onClick={() => !disabled && !loading && onClick()}
			noWrap={noWrap}
		>
			<span>{name}</span>
			{loading && <CircleLoader shineColor='white' absolute={true} />}
		</ButtonStyled>
	)
}

export default Button
