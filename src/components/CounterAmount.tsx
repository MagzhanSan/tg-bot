import {
	CounterAmountStyled,
	CounterButton,
	CounterWrapper,
	TextCustom,
} from '.'
import { Divider } from '../style'
import { FC } from 'react'

const CounterAmount: FC<{
	amount: number
	setAmount: (amount: number) => void
}> = ({ amount, setAmount }) => {
	return (
		<CounterAmountStyled>
			<TextCustom>Количество</TextCustom>
			<CounterWrapper>
				<CounterButton
					onClick={() => {
						amount !== 0 && setAmount(amount - 1)
					}}
				>
					-
				</CounterButton>
				<TextCustom>{amount}</TextCustom>
				<CounterButton
					onClick={() => {
						setAmount(amount + 1)
					}}
				>
					+
				</CounterButton>
			</CounterWrapper>
			<Divider />
		</CounterAmountStyled>
	)
}

export default CounterAmount
