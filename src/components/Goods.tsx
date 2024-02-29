import { GoodImage, GoodItem, GoodList, GoodPrice } from '.'
import { HEADER_COLOR, fallbackImage } from '../constants'
import { createOrderType, orderType } from '../services/orders'
import { formatDate } from '../utils/utils'
import SkeletonLoader from './SkeletonLoader'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Goods: FC<{
	goods?: orderType[]
	loading?: boolean
	items?: createOrderType[]
}> = ({ goods, loading, items }) => {
	const navigate = useNavigate()

	return (
		<GoodList>
			{!loading && goods && goods?.length > 0
				? goods.map(good => (
						<GoodItem
							key={good.id}
							onClick={() =>
								navigate(`/shop/${good.id}`, {
									state: { good: good },
								})
							}
						>
							<GoodImage src={fallbackImage} />
							<GoodPrice>
								<span>{good.name}</span>
								<span>{good.price} тенге</span>
							</GoodPrice>
						</GoodItem>
				  ))
				: goods &&
				  goods?.length === 0 &&
				  loading && (
						<>
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
						</>
				  )}
			{goods && goods.length === 0 && !loading && <p>Нет товаров</p>}

			{!loading && items && items?.length > 0
				? items.map(good => (
						<div
							style={{
								width: '220px',
								border: `2px solid ${HEADER_COLOR}`,
								borderRadius: '10px',
								padding: '10px',
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}
						>
							<GoodItem key={good.receipt_number}>
								<GoodImage src={fallbackImage} />
								<GoodPrice>{good.amount} тенге</GoodPrice>
							</GoodItem>
							<div
								style={{
									marginTop: '10px',
								}}
							>
								<span
									style={{
										fontSize: '20px',
										fontWeight: 'bold',
										marginBottom: '10px',
									}}
								>
									Данные
								</span>
								{good?.quantity !== null && <p>Количество: {good?.quantity}</p>}
								{good?.status !== null && (
									<p>Статус: {good?.status ? 'Оплачено' : 'Не оплачено'}</p>
								)}
								{good?.date_time !== null && (
									<p>Дата: {formatDate(good?.date_time)}</p>
								)}
								{good?.payer_name !== null && (
									<p>Имя плательщика: {good?.payer_name}</p>
								)}
							</div>
						</div>
				  ))
				: items &&
				  items?.length === 0 &&
				  loading && (
						<>
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
							<SkeletonLoader width='200px' height='200px' />
						</>
				  )}
			{items && items.length === 0 && !loading && <p>Нет товаров</p>}
		</GoodList>
	)
}

export default Goods
