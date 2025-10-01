import { Text, View, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalStyles'
import { Link } from 'expo-router'
import IconBottomBar from './iconBottomBar'

import { COLORS } from '../styles/globalStyles'

export default function CustomBottomBar({
    //iconLeft='home-outline'
    //iconMiddle='settings-outline'
    //iconRight='person-outline'
    activeBtn
}) {
    return (
        <View style={{ width: 390, height: 73, backgroundColor: '#EDEDED', flexDirection: 'row' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginRight: 52, marginLeft: 65, flexDirection: 'row', display: 'flex' }}>
                    <IconBottomBar
                        title='Inicio'
                        icon='home-outline'
                        active={activeBtn !== 'inicio'}
                        redirect={''}
                    />
                </View>
                <View style={{ marginRight: 52, flexDirection: 'row', display: 'flex' }}>

                    <IconBottomBar
                        title='Ajustes'
                        icon='settings-outline'
                        active={activeBtn !== 'ajustes'}
                        redirect={'ajustes'}
                    />
                </View>
                <View style={{ marginRight: 65, flexDirection: 'row' }}>
                    <IconBottomBar
                        title='Usuarios'
                        icon='person'
                        active={activeBtn !== 'usuarios'}
                        redirect={'usuarios'}
                    />
                </View>
            </View>
        </View>
    )
}
