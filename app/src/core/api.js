import axios from 'axios'
import { Platform } from 'react-native'


export const ADDRESS =  `https://ea7d-85-76-17-110.ngrok-free.app`
const api = axios.create({
	baseURL: ADDRESS,
	headers: {
		'Content-Type': 'application/json'
	}
})

export default api