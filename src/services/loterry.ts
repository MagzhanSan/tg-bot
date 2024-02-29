import axios from 'axios'

const baseUrl = 'api/lotteries/'

type createLoterryType = {
	number: string
	stage: string
	gift_name: string
	win: true
	issue_time: string
	user_id: number
	order_id: number
}

type updateLoterryType = {
	name: string
	description: string
}

export const getLotteries = () => {
	return axios.get(`${baseUrl}lotteries`)
}

export const getLotteriesUser = (tg_id: string) => {
	return axios.get(`${baseUrl}lotteries/user/${tg_id}`)
}

export const createLoterry = (data: createLoterryType) => {
	return axios.post(`${baseUrl}lotteries`, data)
}

export const getLoterryById = (id: number) => {
	return axios.get(`${baseUrl}lotteries/${id}`)
}

export const updateLoterryById = (id: number, data: updateLoterryType) => {
	return axios.put(`${baseUrl}lotteries/${id}`, data)
}

export const deleteLoterryById = (id: number) => {
	return axios.delete(`${baseUrl}lotteries/${id}`)
}
