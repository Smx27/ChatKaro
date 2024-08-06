import { StyleSheet } from 'react-native'
import React from 'react'
import { View } from '../Themed'
import ProfileImage from './profileImage'


//Fetch Status if have any then use effect and aff profile
const Status = () => {
  return (
    <View style={styles.container}>
      <ProfileImage imagePath='https://wallpapers-clan.com/wp-content/uploads/2022/07/funny-cat-1.jpg' hasStatus title='Sumit Maiti' lastActive={new Date(Date.now() - 3 * 60 * 1000)} />
      <ProfileImage imagePath='' hasStatus title='Sumit Maiti' lastActive={new Date(Date.now() - 3 * 60 * 1000)} />
      <ProfileImage imagePath='' hasStatus={false} title='Sumit Maiti' lastActive={new Date(Date.now() - 3 * 60 * 1000)} />
      <ProfileImage imagePath=''  title='Sumit Maiti' lastActive={new Date(Date.now() - 3 * 60 * 1000)} />
    </View>
  )
}

export default Status

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 10
    }
})