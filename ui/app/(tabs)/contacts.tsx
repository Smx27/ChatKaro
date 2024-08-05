import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '@/constants/Colors'

const Contacts = () => {
  return (
    <View>
      <Text style={styles.text}>Contacts</Text>
      <Text style={styles.text}>Contacts</Text>
      <Text style={styles.text}>Contacts</Text>
    </View>
  )
}

export default Contacts

const styles = StyleSheet.create({
    text:{
        color: Colors.light.text
    }
})