import { Base64 } from 'js-base64'
import {
	FC,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import { useLocation } from 'react-router-dom'

type Props = {
	children: React.ReactNode
}

type UserIdContextType = {
	userId: string
	setUserId: (value: string) => void
}

const UserIdContext = createContext<UserIdContextType>({
	userId: '',
	setUserId: () => null,
})

export const UserIdProvider: FC<Props> = ({ children }) => {
	const location = useLocation()
	// const [userId, setUserId] = useState(Base64.decode('c3RyaW5n'))
	const [userId, setUserId] = useState(Base64.decode(location.search.slice(4)))

	const value = useMemo(
		() => ({
			userId,
			setUserId,
		}),
		[userId]
	)

	useEffect(() => {
		if (
			userId &&
			(localStorage.getItem('userId') === null ||
				localStorage.getItem('userId') === undefined ||
				localStorage.getItem('userId') === '')
		)
			localStorage.setItem('userId', userId)
	}, [userId])

	return (
		<UserIdContext.Provider value={{ ...value }}>
			{children}
		</UserIdContext.Provider>
	)
}

export const useUserId = (): UserIdContextType => {
	return {
		...useContext(UserIdContext),
	}
}
