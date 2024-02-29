import PageHeader from '../components/PageHeader'
import {
	BLACK_COLOR,
	HEADER_COLOR,
	PRIMARY_COLOR,
	SECONDARY_COLOR,
} from '../constants'
import { useUserId } from '../context/userId'
import { formPost } from '../services/orders'
import { Divider, GoodPageWrapper } from '../style'
import { useState, FC, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'

const Form = styled.form`
	margin: 40px auto;
	padding: 20px;
	width: 80%;
	max-width: 700px;
	background-color: ${PRIMARY_COLOR};
	border-radius: 30px;
`

const Label = styled.label`
	display: block;
	margin-top: 20px;
	color: ${BLACK_COLOR};
`

const Input = styled.input`
	margin: 10px 0;
	display: block;
	box-sizing: border-box;
	width: 100%;
	padding: 5px;
	background: none;
	border: none;
	border-bottom: 1px solid ${BLACK_COLOR};
	&:focus {
		outline: none;
		border-bottom: 1px solid ${SECONDARY_COLOR};
	}
`

const SubmitButton = styled.input<{ loading?: boolean }>`
	background-color: ${HEADER_COLOR};
	border-radius: 10px;
	color: white;
	padding: 10px 20px;
	cursor: pointer;
	border: none;
	width: auto;
	font-size: 20px;

	${props =>
		props.loading &&
		`
		background-color: ${PRIMARY_COLOR};
		color: ${SECONDARY_COLOR};
		cursor: not-allowed;
		border: 2px solid ${SECONDARY_COLOR};
	`}
`

const Delivery: FC = () => {
	const { userId } = useUserId()
	const user = localStorage.getItem('userId')
	const [loading, setLoading] = useState<boolean>(false)
	const [formData, setFormData] = useState({
		fullname: '',
		phone: '',
		city: '',
		postal_code: '',
		address: '',
	})
	const [phone, setPhone] = useState('')
	const [postal, setPostal] = useState('')

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
	) => {
		if (e.target.name === 'phone')
			setPhone(e.target.value.replace(/[^\d+]/g, ''))
		if (e.target.name === 'postal_code')
			setPostal(e.target.value.replace(/[^\d+]/g, ''))

		const { name, value } = e.target
		setFormData({ ...formData, [name]: value })
	}

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		if (loading) return

		const isEmptyField = Object.values(formData).some(
			value => value.trim() === ''
		)

		if (isEmptyField) {
			toast.error('Пожалуйста, заполните все поля')
			return
		}

		const cart = JSON.parse(localStorage.getItem('cart') || '[]')
		const filteredCart = cart.filter((product: any) => product.amount > 0)
		if (user) {
			const products = filteredCart.map((product: any) => ({
				user_id: user,
				product_id: product.id,
				quantity: product.amount,
			}))

			if (filteredCart.length === 0) {
				toast.error('У вас ничего в корзине нету, что бы оформить заказ.')
				return
			}

			setLoading(true)

			formPost({ ...formData, products })
				.then(() => {
					localStorage.clear()
					toast.success(
						'Заказ успешно оформлен! Вам нужно перейти к телеграмм боту.'
					)
					setFormData({
						fullname: '',
						phone: '',
						city: '',
						postal_code: '',
						address: '',
					})
					setPhone('')
					setPostal('')
					window.location.href = 'https://t.me/opencladebot'
				})
				.catch(() => {
					toast.error('Ошибка при оформлении заказа, попробуйте снова')
				})
				.finally(() => {
					setLoading(false)
				})
		} else toast.error('Пользователь не распознан')
	}

	return (
		<GoodPageWrapper>
			<PageHeader name='Доставка' shop />
			<Divider />
			<Form onSubmit={handleSubmit}>
				<Label>Имя:</Label>
				<Input
					value={formData.fullname}
					type='text'
					name='fullname'
					placeholder='Ваше имя'
					onChange={handleInputChange}
				/>

				<Label>Телефон:</Label>
				<Input
					value={phone}
					type='tel'
					name='phone'
					placeholder='+7 (999) 999-99-99'
					onChange={handleInputChange}
					maxLength={16}
				/>

				<Label>Город:</Label>
				<Input
					value={formData.city}
					type='text'
					name='city'
					placeholder='Город'
					onChange={handleInputChange}
				/>

				<Label>Почтовый индекс:</Label>
				<Input
					type='text'
					name='postal_code'
					placeholder='123456'
					maxLength={6}
					value={postal}
					onChange={handleInputChange}
				/>

				<Label>Улица, дом, квартира:</Label>
				<Input
					value={formData.address}
					type='text'
					name='address'
					placeholder='Улица, дом, квартира'
					onChange={handleInputChange}
				/>

				<SubmitButton
					type='submit'
					loading={loading}
					value={loading ? 'Отправка...' : 'Отправить'}
				/>
			</Form>
		</GoodPageWrapper>
	)
}

export default Delivery
