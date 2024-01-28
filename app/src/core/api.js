import axios from 'axios'
import { Platform } from 'react-native'


export const ADDRESS =  `https://cbbf-85-76-135-77.ngrok-free.app`
const api = axios.create({
	baseURL: ADDRESS,
	headers: {
		'Content-Type': 'application/json'
	}
})

export default api