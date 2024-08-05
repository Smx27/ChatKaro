import { StyleSheet, Text  } from 'react-native'
import React from 'react'
import { TextInput,View } from './Themed'
import Colors from '@/constants/Colors'


interface InputComponentProps{
    title: string,
    onTextChange: (text:string) => void,
    placeHolder: string
}

const InputComponent = (props: InputComponentProps) => {
  return (
    <View style={styles.container}>
        <TextInput style={styles.inputStyle}  placeholder={props.placeHolder} textAlign='left' inputMode="text" onChangeText={(text)=> console.log(text)} />
    </View>
  )
}

export default InputComponent

const styles = StyleSheet.create({
    container: {
        padding: 24,
        width: '80%',
        borderRadius: 8,
        backgroundColor: Colors.light.grey
    },
    inputStyle: {
        backgroundColor: Colors.light.grey
    }
})