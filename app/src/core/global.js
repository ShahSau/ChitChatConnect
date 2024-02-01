import { create } from 'zustand'
import secure from './secure'
import { ADDRESS } from './api'




const useGlobal = create((set, get) => ({

  //---------------------
	//   Initialization
	//---------------------

	initialized: false,

	init: async () => {
		const credentials = await secure.get('credentials')
		if (credentials) {
			try {
				const response = await api({
					method: 'POST',
					url: '/chat/signin/',
					data: {
						username: credentials.username,
						password: credentials.password
					}
				})
				if (response.status !== 200) {
					throw 'Authentication error'
				}
				const user = response.data.user
				const tokens = response.data.tokens

				secure.set('tokens', tokens)

				set((state) => ({
					initialized: true,
					authenticated: true,
					user: user
				}))
				return
			} catch (error) {
				console.log('useGlobal.init: ', error)
			}
		}
		set((state) => ({
			initialized: true,
		}))
	},
	//---------------------
	//   Authentication
	//---------------------

	authenticated: false,
	user: {},

	login: (user, credentials, tokens) => {
		// secure.set('credentials', credentials)
		secure.set('tokens', user.tokens)
		set((state) => ({
			authenticated: true,
			user: user
		}))
	},

	logout: () => {

		set((state) => ({
			authenticated: false,
			user: {}
		}))
	},

	//---------------------
	//     Websocket
	//---------------------
	socket: null,

	socketConnect: async () => {
		const tokens = await secure.get('tokens')
		const socket = new WebSocket(`wss://ea7d-85-76-17-110.ngrok-free.app/chat/?token=${tokens.access}`)
		//console.log('useGlobal.socketConnect: connecting')
		//socket.onopen = () => {
		// 	console.log('useGlobal.socketConnect: connected')
		// }
		// const socket = new WebSocket({
		// 	target: `ws://https://ea7d-85-76-17-110.ngrok-free.app/chat/?token=${tokens.access}`,
		// 	ws: true
		
		// })
		// socket.onopen('upgrade', function (req, socket, head) {
		// 	proxy.ws(req, socket, head, {
		// 	  target: `ws://${ADDRESS}/chat/?token=${tokens.access}`,
		// 	  ws: true
		// 	})
		// 	console.log('useGlobal.socketConnect: connected')
		//   })
		socket.onopen = () => {
			console.log('useGlobal.socketConnect: connected')
		}
		  
		// socket.onmessage = (event) => {
		// 	//const message = JSON.parse(event.data)
		// 	console.log('useGlobal.socketConnect: message', message)
		// }

		socket.onerror = (error) => {
			console.log('useGlobal.socketError: error', error)
		}

		socket.onclose = (event) => {
			console.log('useGlobal.socketClose: closed', event)
		}

		set((state) => ({
			socket: socket
		}))
	},

	socketDisconnect: () => {
		if (get().socket) {
			get().socket.disconnect()
		}
	},

}))




export default useGlobal