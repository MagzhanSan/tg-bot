import PageHeader from '../components/PageHeader'
import SkeletonLoader from '../components/SkeletonLoader'
import { BLACK_COLOR } from '../constants'
import { useUserId } from '../context/userId'
import { getLotteriesUser } from '../services/loterry'
import { Divider, GoodPageWrapper } from '../style'
import { Ticket as TicketType } from '../types'
import { formatDate } from '../utils/utils'
import { FC, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const Main = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 auto;
	width: 100%;
	height: 100%;
`

const Passenger = styled.div`
	.ticket {
		min-width: 260px;
		border-left: 2px solid ${BLACK_COLOR};
		border-right: 2px solid ${BLACK_COLOR};
		border-top: 2px solid ${BLACK_COLOR};
		padding: 1em;
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
		background: #fff;
		position: relative;
		border-bottom: 3px dashed #afadad;

		&:last-child {
			border-bottom: none;
			border-bottom-left-radius: 5px;
			border-bottom-right-radius: 5px;

			.circle {
				display: none;
			}
		}

		&__line {
			display: flex;
			margin: 8px 0;
		}

		&__data {
			width: 50%;

			&:last-child {
				margin-right: 0;
			}
		}

		&__bottom {
			position: absolute;
			width: 100%;
			bottom: 6px;
			left: 0;

			.circle {
				width: 14px;
				height: 14px;
				border-radius: 50%;
				position: absolute;
				background: #6b6b6b;
				z-index: 2;

				&-left {
					left: -7px;
				}

				&-right {
					right: -7px;
				}
			}
		}
	}
`

const Tickets: FC = () => {
	const { userId } = useUserId()
	const user = localStorage.getItem('userId')

	const [tickets, setTickets] = useState<TicketType[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		if (!user) {
			toast.error('Пользователь не найден')
			return
		}
		setLoading(true)
		getLotteriesUser(user)
			.then((res: any) => {
				setTickets(res.data)
			})
			.finally(() => setLoading(false))
	}, [user])

	return (
		<GoodPageWrapper>
			<PageHeader name='Мои лотерееи' />
			<Divider />
			<Main>
				<Passenger>
					{tickets.length > 0
						? tickets.map((ticket, index) => (
								<div className='ticket' key={index}>
									<div className='ticket__line'>
										<b>{ticket.gift_name}</b>
									</div>
									<div className='ticket__line'>
										<div className='ticket__data'>
											<b>Дата</b>
											<br />
											{formatDate(ticket.issue_time)}
										</div>
										<div className='ticket__data'>
											<b>Номер</b>
											<br />
											{ticket.number}
										</div>
									</div>
									<div className='ticket__bottom'>
										<div className='circle circle-left'></div>
										<div className='circle circle-right'></div>
									</div>
								</div>
						  ))
						: !loading && <div>У вас нет лотерей</div>}
					{loading && <SkeletonLoader width='260px' height='100px' />}
				</Passenger>
			</Main>
		</GoodPageWrapper>
	)
}

export default Tickets
