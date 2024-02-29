import axios from 'axios'

const baseUrl = 'api/orders/orders/'

export type createOrderType = {
	quantity: number
	status: boolean
	bin_number: string
	receipt_number: string
	bank_name: string
	amount: number
	date_time: string
	payer_name: string
	user_id: number
}

type updateOrderType = {
	name: string
	description: string
}

export type orderType = {
	amount: number
	description: string
	id: number
	image: string
	name: string
	price: number
	stock: number
}
type productType = {
	user_id: string
	product_id: number
	quantity: number
}

export type orderCreateType = {
	fullname: string
	phone: string
	city: string
	postal_code: string
	address: string
	products: productType[]
}

export const getOrdersAll = (
	skip: number = 0,
	limit: number = 100,
	name?: string
) => {
	return axios.get<any, any>(`${baseUrl}products`, {
		params: { skip, limit, name },
	})
}

export const getOrders = (id: string) => {
	return axios.get<any, any>(`${baseUrl}${id}/all`)
}

export const createOrder = (data: createOrderType) => {
	return axios.post(`${baseUrl}`, data)
}

export const getOrderById = (id: number) => {
	return axios.get(`${baseUrl}${id}`)
}

export const updateOrderById = (id: number, data: updateOrderType) => {
	return axios.put(`${baseUrl}${id}`, data)
}

export const deleteOrderById = (id: number) => {
	return axios.delete(`${baseUrl}${id}`)
}

export const formPost = (data: orderCreateType) => {
	return axios.post(`${baseUrl}user_product`, data)
}
