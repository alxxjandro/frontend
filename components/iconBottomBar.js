import { Text, TouchableOpacity, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { SIZE, COLORS, FONTS } from '../styles/globalStyles'
import { router, useRouter } from 'expo-router'
import { useState } from 'react'

export default function IconBottomBar({
    icon,
    title,
    redirect,
    active
}) {

    const router = useRouter()

    const handleOnPress = () => {
        router.navigate(`/${redirect}`)
    }

    return (
        <TouchableOpacity
            onPress={handleOnPress}
            style={{
                width: 52,
                height: 52,
                borderRadius: 12,
                backgroundColor: active ? COLORS.backgroundColor : '#C9D6DF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >

            {active ? (
                <View style={{ alignItems: 'center', display: 'flex' }} >
                    <Ionicons
                        style={{ fontSize: 22 }}
                        name={icon}
                        size='large'
                        color={COLORS.blackText}
                    />
                </View>
            ) : (
                <View style={{ alignItems: 'center', display: 'flex' }} >
                    <Ionicons
                        style={{ fontSize: 22 }}
                        name={icon}
                        size='large'
                        color={COLORS.primaryBlue}
                    />
                    <Text style={{ fontSize: SIZE.xs, color: COLORS.primaryBlue }}>
                        {title}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    )
}
