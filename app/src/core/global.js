import { create } from 'zustand'
import secure from './secure'
import { ADDRESS } from './api'

//-------------------------------------
//   Socket receive message handlers
//-------------------------------------

const responseThumbnail = (set, get, data)=> {
	set((state) => ({
		user: data
	}))
}

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
		
		socket.onopen = () => {
			console.log('useGlobal.socketConnect: connected')
		}
		  
		socket.onmessage = (event) => {
			// convert message to JS object
			const parsed = JSON.parse(event.data)

			const response ={
				'thumbnail': responseThumbnail
			}

			// getting the source type from the message
			const res = response[parsed.source]

			// if the source type is not found
			if (!res) {
				console.log('useGlobal.socketConnect: source not found' + parsed.source)
				return
			}

			// if the source type is found, call the function
			res(set,get,parsed.data)

		}

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

	//---------------------
	//     Thumbnail
	//---------------------
	uploadThumbnail: (file) => {
		const socket = get().socket
		socket.send(JSON.stringify({
			source: 'thumbnail',
			base64: file.base64,
			filename: file.uri
		}))
	}

}))

    

export default useGlobal