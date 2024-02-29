import banner from '../assets/banner.jpg'
import useDebounce from '../assets/hooks/use-debounce'
import Banner from '../components/Banner'
import Button from '../components/Button'
import Categories from '../components/Categories'
import Goods from '../components/Goods'
import PageHeader from '../components/PageHeader'
import Search from '../components/Search'
import { getOrdersAll, orderType } from '../services/orders'
import { Divider, ShopStyled } from '../style'
import { FC, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Shop: FC = () => {
	const [searchValue, setSearchValue] = useState<string>('')
	const [goods, setGoods] = useState<orderType[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const debouncedSearch = useDebounce(searchValue, 500)
	const navigate = useNavigate()

	const categoriesTest = [
		{
			name: 'Категория 1',
		},
		{
			name: 'Категория 2',
		},
		{
			name: 'Категория 3',
		},
	]

	const [categories] = useState<{ name: string }[]>(categoriesTest)

	useEffect(() => {
		setLoading(true)
		getOrdersAll(
			undefined,
			undefined,
			(debouncedSearch as string) !== ''
				? (debouncedSearch as string)
				: undefined
		)
			.then(res => {
				setGoods(res.data)
			})
			.finally(() => {
				setLoading(false)
			})
	}, [debouncedSearch])

	return (
		<ShopStyled>
			<PageHeader name={'Магазин'} />
			<Search
				value={searchValue}
				setSearchValue={setSearchValue}
				placeholder='Поиск...'
				fail={goods.length === 0 && !loading}
			/>
			<Divider />
			<Banner imageSrc={banner} />
			{/* <Divider />
			<Categories categories={categories} /> */}
			<Divider />
			<Goods goods={goods} loading={loading} />
			<div
				style={{
					position: 'fixed',
					bottom: '20px',
					right: '20px',
				}}
			>
				<Button
					name='Корзина'
					onClick={() => {
						navigate('/orders')
					}}
				></Button>
			</div>
		</ShopStyled>
	)
}

export default Shop
