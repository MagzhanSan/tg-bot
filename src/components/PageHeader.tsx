import { ShopName } from '../style'
import { BackBtn, MainBtn, PageHeaderStyled } from './index'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const PageHeader: FC<{ name: string; shop?: boolean; nothing?: boolean }> = ({
	name,
	shop,
	nothing,
}) => {
	const navigate = useNavigate()

	return (
		<PageHeaderStyled>
			{!nothing && (
				<BackBtn
					onClick={() => {
						navigate(-1)
					}}
				>
					Назад
				</BackBtn>
			)}
			<ShopName>{name}</ShopName>
			{!nothing && (
				<MainBtn
					onClick={() => {
						shop ? navigate('/shop') : navigate('/')
					}}
				>
					{shop ? 'Магазин' : 'Главная'}
				</MainBtn>
			)}
		</PageHeaderStyled>
	)
}

export default PageHeader
