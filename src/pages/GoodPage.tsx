import { GoodPageStyled, TextCustom } from '../components'
import Banner from '../components/Banner'
import Button from '../components/Button'
import CounterAmount from '../components/CounterAmount'
import PageHeader from '../components/PageHeader'
import Variant from '../components/Variant'
import { fallbackImage } from '../constants'
import { orderType } from '../services/orders'
import { Divider, GoodPageWrapper } from '../style'
import { FC, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import styled from 'styled-components'

const GoodName = styled.div`
	font-size: 30px;
	font-weight: 500;
`

const GoodDescription = styled.span`
	font-size: 16px;
`

const GoodPage: FC = () => {
	const { state } = useLocation()
	const navigate = useNavigate()
	const good = state?.good

	const { goodId } = useParams()
	const [amount, setAmount] = useState<number>(1)
	const [variants, setVariants] = useState<{ name: string }[]>([
		{ name: 'Вариант 1' },
		{ name: 'Вариант 2' },
	])

	useEffect(() => {
		if (!good) {
			navigate('/shop')
		} else if (good) setAmount(good?.stock)
	}, [good])

	const addGoods = (good: orderType) => {
		const cartString = localStorage.getItem('cart')
		const cart = cartString ? JSON.parse(cartString) : []

		const existingGoodIndex = cart.findIndex(
			(item: orderType) => item.id === good.id
		)
		if (Array.isArray(cart)) {
			if (existingGoodIndex !== -1) {
				cart[existingGoodIndex].amount += amount
			} else if (Array.isArray(cart)) {
				cart.push({
					...good,
					amount,
				})
			}

			localStorage.setItem('cart', JSON.stringify(cart))
			navigate('/orders')
		}
	}

	return (
		<GoodPageWrapper>
			<PageHeader name={good?.name} shop />
			<Banner />
			<GoodPageStyled>
				<Divider />
				<GoodName>{good?.name}</GoodName>
				<GoodDescription>{good?.description}</GoodDescription>
				<Divider />
				{/* <Variant variants={variants} /> */}
				<CounterAmount amount={amount} setAmount={setAmount} />
				<TextCustom>Цена - {good?.price} тг</TextCustom>
				<div style={{ margin: '20px 0' }}></div>
				<Button
					name='В корзину'
					onClick={() => {
						addGoods(good as orderType)
					}}
				/>
				<div style={{ margin: '20px 0' }}></div>
			</GoodPageStyled>
		</GoodPageWrapper>
	)
}

export default GoodPage
