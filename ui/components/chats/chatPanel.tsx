import { StyleSheet } from 'react-native'
import React from 'react'
import { Text, View } from '../Themed'
import Message from './messageComponent'
import Colors from '@/constants/Colors'
const ChatPanel = () => {
    const time = new Date();
  return (
    <View style={styles.container} lightColor={Colors.light.grey} darkColor={Colors.dark.grey}>
        <Message time={time}  message='Good morning, did you sleep well?' isSenderMessage isMessageSent />
        <Message time={time}  message='hello how do you do?' isSenderMessage isMessageSent />
        <Message time={time}  message='Habibi'  isMessageSent />
    </View>
  )
}

export default ChatPanel

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        height: '100%',
        gap: 10,
        padding: 24
    }
})