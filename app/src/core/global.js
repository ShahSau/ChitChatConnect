import { create } from 'zustand'
import secure from './secure'
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

	login: (user) => {
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


}))




export default useGlobal