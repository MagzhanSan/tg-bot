import { HEADER_COLOR, PRIMARY_COLOR, THIRD_COLOR } from '../constants'
import styled from 'styled-components'

export const BackBtn = styled.div`
	font-size: 18px;
	font-weight: 500;
	position: absolute;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	&:hover {
		color: ${THIRD_COLOR};
	}
`

export const MainBtn = styled(BackBtn)`
	position: absolute;
	right: 0;
	top: 0;
`

export const PageHeaderStyled = styled.div`
	position: relative;
`

export const CategoryList = styled.div`
	display: flex;
	flex-wrap: nowrap;
	gap: 10px;
	overflow-x: auto;
`

export const Category = styled.div<{ active?: boolean }>`
	font-size: 20px;
	border: 1px solid ${HEADER_COLOR};
	padding: 5px 10px;
	white-space: nowrap;
	border-radius: 10px;
	transition: all 0.3s ease-in-out;
	cursor: pointer;

	${p =>
		p.active &&
		`
		background-color: ${HEADER_COLOR};
		color: white;
	`}
`

export const GoodList = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	flex-wrap: wrap;
	gap: 20px;
`

export const GoodItem = styled.div`
	position: relative;
	border: 2px solid ${HEADER_COLOR};
	border-radius: 10px;
	cursor: pointer;
	width: 200px;
	height: 230px;
	overflow: hidden;
	box-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
`

export const GoodPrice = styled.div`
	background-color: white;
	position: absolute;
	bottom: 0;
	left: 0;
	font-size: 14px;
	color: ${THIRD_COLOR};
	border-radius: 0 10px 0 0;
	padding: 5px 10px;
	width: 100%;
	font-weight: 600;
	display: flex;
	flex-direction: column;
`

export const GoodImage = styled.img`
	width: 100%;
	height: 200px;
`

export const GoodPageStyled = styled.div`
	padding: 0 20px;
`

export const CounterAmountStyled = styled.div``

export const TextCustom = styled.div`
	font-size: 20px;
`

export const CounterWrapper = styled.div`
	display: flex;
	align-items: center;
	gap: 10px;
`

export const CounterButton = styled.div`
	width: 30px;
	height: 30px;
	background-color: ${PRIMARY_COLOR};
	border-radius: 10px;
	border: 1px solid ${HEADER_COLOR};
	font-size: 25px;
	font-weight: 500;
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	transform: translateY(-50%, -50%);
`

export const OrdersListStyled = styled.div``

export const OrderItem = styled.div``
