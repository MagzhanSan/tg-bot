import banner from '../assets/banner.jpg'
import Banner from '../components/Banner'
import Button from '../components/Button'
import PageHeader from '../components/PageHeader'
import { ButtonList, Divider, GoodPageWrapper, StyledMenu } from '../style'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Menu: FC = () => {
	const menuItems = {
		shop: 'Открыть магазин',
		my_orders: 'Мои заказы',
		tickets: 'Мои билеты',
	}

	const navigate = useNavigate()

	const NavigateToPage = (url: string) => {
		navigate(url)
	}

	return (
		<GoodPageWrapper>
			<PageHeader name='Меню' nothing />
			<Divider />
			<StyledMenu>
				<Banner imageSrc={banner} />
				<div
					style={{
						margin: '10px 0',
					}}
				></div>
				<ButtonList column>
					{Object.entries(menuItems).map((item, index) => (
						<Button
							width='100%'
							key={index}
							name={item[1]}
							onClick={() => NavigateToPage(item[0])}
						/>
					))}
				</ButtonList>
			</StyledMenu>
		</GoodPageWrapper>
	)
}

export default Menu
