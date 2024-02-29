import { OrderItem, OrdersListStyled } from '.'
import { FC, useState } from 'react'

const OrdersList: FC<{
	goods: any
}> = ({ goods }) => {
	const [amount, setAmount] = useState<number>(1)

	return (
		<OrdersListStyled>
			{goods.map((good: any, index: number) => (
				<OrderItem key={index}>
					{good.name} {good.variant} {good.amount}
				</OrderItem>
			))}
		</OrdersListStyled>
	)
}

export default OrdersList
