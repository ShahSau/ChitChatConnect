import ProfileImage from '../assets/profile.png'

const log = () =>{
	// Much better console.log function that formats/indents
	// objects for better readability
	for (let i = 0; i < arguments.length; i++) {
		let arg = arguments[i]
		// Stringify and indent object
		if (typeof arg === 'object') {
			arg = JSON.stringify(arg, null, 2)
		}
		console.log(`[${Platform.OS}]`, arg)
	}
}

const thumbnail =(url)=> {
	if (!url) {
		return ProfileImage
	}
	return {
		uri: 'https://ea7d-85-76-17-110.ngrok-free.app'+ url
	}
}

export default { log, thumbnail }