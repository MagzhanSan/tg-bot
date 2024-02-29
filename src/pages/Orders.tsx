import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { HEADER_COLOR, SECONDARY_COLOR, fallbackImage } from '../constants'
import { orderType } from '../services/orders'
import { Divider, Flex } from '../style'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const Main = styled.div`
	font-family: 'Lato', sans-serif;
	color: #686868;
	padding: 20px;
`

const ShoppingCart = styled.section`
	width: 80%;
	max-width: 60rem;
	margin: 0 auto;
	background-color: #ffffff;
	border-radius: 10px;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	padding: 20px;
`

const ShoppingCartList = styled.ol`
	list-style: none;
	padding: 0;
`

const ShoppingCartListItem = styled.li`
	display: flex;
	align-items: center;
	justify-content: space-between;
	border-bottom: 1px solid #bdc3c7;
	margin-bottom: 20px;
	padding-bottom: 20px;
	flex-wrap: wrap;
	row-gap: 10px;
	&:last-child {
		border-bottom: none;
	}
`

const ProductImage = styled.div`
	flex: 0 0 100px;
	height: 100px;
	background-size: cover;
	background-position: center;
	margin-right: 20px;
`

const ProductInfo = styled.div`
	flex-grow: 1;
`

const ProductName = styled.h4`
	margin: 0;
	font-weight: 400;
`

const ProductVariant = styled.p`
	margin: 5px 0;
	font-size: 0.9em;
`

const ProductAmount = styled.div`
	font-size: 1.2em;
	font-weight: bold;
`

const Button2 = styled.button<{ size?: string }>`
	background-color: ${HEADER_COLOR};
	color: white;
	border: none;
	border-radius: 5px;
	padding: 5px 10px;
	cursor: pointer;
	margin-left: 10px;
	font-size: ${props => props.size || '18px'};
	&:hover {
		background-color: #2980b9;
	}
`

const ProductControls = styled.div`
	display: flex;
	align-items: center;
`

const GoodsComponent = () => {
	const navigate = useNavigate()
	const cartString = localStorage.getItem('cart')
	const [goods, setGoods] = useState<orderType[]>([])

	const incrementAmount = (id: number) => {
		setGoods(
			goods.map(item =>
				item.id === id ? { ...item, amount: item.amount + 1 } : item
			)
		)
	}

	useEffect(() => {
		if (cartString) {
			const cartArray = JSON.parse(cartString)
			setGoods(cartArray)
		}
	}, [cartString])

	const decrementAmount = (id: number) => {
		setGoods(
			goods.map(item =>
				item.id === id
					? item.amount !== 0
						? { ...item, amount: Math.max(1, item.amount - 1) }
						: item
					: item
			)
		)
	}

	const removeItem = (id: number) => {
		setGoods(goods.filter(item => item.id !== id))
	}

	const save = () => {
		localStorage.clear()
		localStorage.setItem('cart', JSON.stringify(goods))
	}

	const createOrder = () => {
		save()
		setTimeout(() => {
			navigate('/delivery')
		}, 100)
	}

	return (
		<Main>
			<PageHeader name='Корзина' shop />
			<Divider />
			<ShoppingCart>
				<ShoppingCartList>
					{goods.map(good => (
						<ShoppingCartListItem key={good.id}>
							<ProductImage
								style={{
									backgroundImage: `url(${fallbackImage})`,
								}}
							/>
							<ProductInfo>
								<ProductName>{good.name}</ProductName>
								{/* <ProductVariant>{good.variant}</ProductVariant> */}
								<ProductAmount>{`Количество: ${good.amount}`}</ProductAmount>
							</ProductInfo>
							<ProductControls>
								<Button2 onClick={() => decrementAmount(good.id)}>-</Button2>
								<Button2 onClick={() => incrementAmount(good.id)}>+</Button2>
								<Button2 onClick={() => removeItem(good.id)}>Удалить</Button2>
							</ProductControls>
						</ShoppingCartListItem>
					))}
					{goods.length === 0 && <p>Корзина пуста</p>}
				</ShoppingCartList>
				<Flex style={{ gap: '10px' }}>
					<Button
						name={'Оформить заказ'}
						onClick={createOrder}
						disabled={goods.length === 0}
						noWrap
					/>
					<Button name={'Сохранить'} onClick={save} />
				</Flex>
			</ShoppingCart>
		</Main>
	)
}

export default GoodsComponent
