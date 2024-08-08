import { StyleSheet } from 'react-native'
import React from 'react'
import { TabBarIcon, Text, View } from '../Themed'
import ProfileImage from '../tabs/profileImage'
import Fonts from '@/constants/Fonts'
import Colors from '@/constants/Colors'

interface UserProfileProps{
    lastActive: Date,
    imagePath: string,
    title: string,
    subtext: string
}

const UserProfile = ({lastActive,
    imagePath,
    title, subtext} : UserProfileProps
) => {
  return (
    <View style={styles.container}>
        <View style={styles.userDataContainer}>
            <ProfileImage lastActive={lastActive}  imagePath={imagePath} title={title} />
            <View style={styles.textContainer}>
                <Text style={styles.header}>{title}</Text>
                <Text 
                lightColor={Colors.light.tabIconDefault}
                darkColor={Colors.dark.tabIconDefault}
                style={styles.subtext}>{subtext}</Text>
            </View>
        </View>
        <TabBarIcon name='angle-right' />
    </View>
  )
}

export default UserProfile

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    userDataContainer:{
        flexDirection: 'row',
        gap: 10
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: 10
    },
    header: {
        fontFamily: Fonts.SemiBold,
        fontSize: 16,
        lineHeight: 24,
    },
    subtext: {
        fontFamily: Fonts.Regular
    }
})