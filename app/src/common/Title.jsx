import { Text, StyleSheet, } from "react-native"


const Title = ({ text, color }) =>{
	return (
		<Text 
			style={{
                    ...styles,
                    color: color || '#fff'
                }}
		>
			{text}
		</Text>
	)
}

export default Title

const styles = StyleSheet.create({
    textAlign: 'center',
    fontSize: 48,
    marginBottom: 30
})