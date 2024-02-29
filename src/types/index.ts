export type justifyContent =
	| 'center'
	| 'start'
	| 'end'
	| 'flex-start'
	| 'flex-end'
	| 'space-between'
	| 'space-around'
	| 'space-evenly'
	| 'left'
	| 'right'

export type alignItems = justifyContent

export type Ticket = {
	id: number
	gift_name: string
	issue_time: string
	order_id: number
	stage: string
	number: string
	win: true
	user_id: number
}
