import { Text, View } from 'react-native'
import { globalStyles } from '../styles/globalStyles'
import { FONTS } from '../styles/globalStyles'

export default function CustomPFP({
    width = 128,
    height = 128,
    first,
    last,
    fontSize = 48,
    fontColor = '#fff',
    colorBG = '#fff',
}) {
    return (
        <View
            style={{
                width: width,
                height: height,
                borderRadius: width / 2,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colorBG,
            }}
        >
            <Text style={{ fontSize: fontSize, color: fontColor, fontStyle: FONTS.regular }}>
                {first.charAt(0)}{last.charAt(0)}
            </Text>
        </View>
    )
}