import { UserIdProvider } from './context/userId'
import Delivery from './pages/Delivery'
import GoodPage from './pages/GoodPage'
import Menu from './pages/Menu'
import MyOrders from './pages/MyOrders'
import Orders from './pages/Orders'
import Shop from './pages/Shop'
import Tickets from './pages/Tickets'
import { AppDiv } from './style'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
	return (
		<BrowserRouter>
			<UserIdProvider>
				<AppDiv>
					<Routes>
						<Route path='/' element={<Menu />} />
						<Route path='/shop' element={<Shop />} />
						<Route path='/orders' element={<Orders />} />
						<Route path='/tickets' element={<Tickets />} />
						<Route path='/shop/:goodId' element={<GoodPage />} />
						<Route path='/delivery' element={<Delivery />} />
						<Route path='/my_orders' element={<MyOrders />} />
						<Route path='*' element={<Menu />} />
					</Routes>
					<ToastContainer />
				</AppDiv>
			</UserIdProvider>
		</BrowserRouter>
	)
}

export default App
