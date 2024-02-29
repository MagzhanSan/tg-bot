import { HEADER_COLOR, PRIMARY_COLOR } from '../constants'
import { alignItems, justifyContent } from '../types'
import styled, { css } from 'styled-components'

export const AppDiv = styled.div`
	font-family: 'Open Sans', sans-serif;
	max-width: 1000px;
	margin: 0 auto;
`

export const StyledBanner = styled.div`
	width: 100%;
	max-width: 700px;
	height: clamp(
		250px,
		250px + ((100vw - 320px) * (700 - 250) / (1160 - 320)),
		700px
	);
	margin: 0 auto;
	background-color: ${PRIMARY_COLOR};
	border-radius: 50px;
	overflow: hidden;
	display: flex;
	justify-content: center;
	align-items: center;
`

export const BannerImage = styled.img`
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: center;
`

export const ButtonStyled = styled.div<{
	width?: string
	disabled?: boolean
	noWrap?: boolean
}>`
	border-radius: 15px;
	width: ${props => props.width || 'fit-content'};
	max-width: 100%;
	padding: 10px 20px;
	color: ${PRIMARY_COLOR};
	border: 2px solid ${HEADER_COLOR};
	font-size: 16px;
	text-align: center;
	background-color: ${HEADER_COLOR};
	cursor: pointer;
	white-space: ${props => (props.noWrap ? 'nowrap' : 'normal')};
	box-shadow: 0 0 5px ${HEADER_COLOR};

	${props =>
		props.disabled &&
		css`
			background-color: ${PRIMARY_COLOR};
			color: gray;
			border: 2px solid ${PRIMARY_COLOR};
			cursor: not-allowed;
		`}
`

export const ButtonList = styled.div<{ column?: boolean }>`
	display: flex;
	justify-content: center;
	align-items: center;
	gap: 10px;
	margin: 0 auto;
	flex-direction: ${props => (props.column ? 'column' : 'row')};
`

export const StyledMenu = styled.div`
	padding: 20px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;
	width: calc(100% - 40px);
	height: 80vh;
`

export const Divider = styled.div`
	height: 1.5px;
	background-color: ${PRIMARY_COLOR};
	width: 100%;
	overflow: hidden;
	margin: 10px;
`

export const ShopName = styled.div`
	font-size: 36px;
	color: ${HEADER_COLOR};
	text-align: center;
	padding: 20px 0;
	max-width: 70%;
	overflow: hidden;
	text-overflow: ellipsis;
	margin: 0 auto;
	font-weight: 600;
`

export const Flex = styled.div<{
	jc?: justifyContent
	ai?: alignItems
	column?: boolean
}>`
	display: flex;
	justify-content: ${props => (props.jc ? props.jc : 'normal')};
	align-items: ${props => (props.ai ? props.ai : 'normal')};
	flex-direction: ${props => (props.column ? 'column' : 'row')};
	flex-wrap: wrap;
`

export const ShopStyled = styled.div`
	padding: 20px;
	background-image: ;
`

export const GoodPageWrapper = styled.div`
	padding: 0 20px;
`
