import Goods from '../components/Goods'
import PageHeader from '../components/PageHeader'
import { useUserId } from '../context/userId'
import { createOrderType, getOrders } from '../services/orders'
import { Divider, ShopStyled } from '../style'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const MyOrders: FC = () => {
	const { userId } = useUserId()
	const user = localStorage.getItem('userId')
	const [goods, setGoods] = useState<createOrderType[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (user) {
			setLoading(true)
			getOrders(user)
				.then(res => {
					setGoods(res.data)
				})
				.catch(err => {
					toast.error('Ошибка при загрузке заказов')
				})
				.finally(() => {
					setLoading(false)
				})
		} else {
			toast.error('Пользователь не найден')
		}
	}, [userId])

	return (
		<ShopStyled>
			<PageHeader name={'Мои заказы'} />
			<Divider />
			<Goods items={goods} loading={loading} />
		</ShopStyled>
	)
}

export default MyOrders
