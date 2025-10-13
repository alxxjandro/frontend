import { Text, Switch, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { globalStyles } from '../styles/globalStyles'

export default function CustomToggleContainer({
    title,
    toggleSwitch,
    value,
    size = 20,
    color = '#fff',
    iconLeft,
}) {
    return (

        <View style={globalStyles.customActionButton}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {iconLeft && (
                    <View className="iconRight">
                        <Ionicons
                            name={iconLeft}
                            size={size}
                            color={color}
                            style={{ marginRight: 8 }}
                        />
                    </View>
                )}
                <Text style={globalStyles.customActionButtonText}>{title}</Text>
                <View style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'end',
                }}>
                    <Switch
                        value={value}
                        onValueChange={toggleSwitch}
                    />
                </View>
            </View>
        </View>
    )
}