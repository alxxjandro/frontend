import { Link } from 'expo-router'
import { View, Text } from 'react-native'
import { Button } from 'react-native-web'
import CustomActionButton from '../../components/customAccionButton'
import { SIZE, COLORS } from '../../styles/globalStyles'

export default function Test() {
  return (
    <View style={{ backgroundColor: '#FBFBFB' }}>
      <View style={{ gap: 10, marginLeft: 29, marginTop: 43 }}>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 30, color: '#000000', fontWeight: '600' }}>
            Ajustes
          </Text>
        </View>
        <View
          style={{
            width: 128,
            height: 128,
            borderRadius: 64,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#737373',
            alignSelf: 'center',
          }}
        >
          <Text style={{ fontSize: 48, color: '#FEFEFF', fontWeight: '600' }}>
            JT
          </Text>
        </View>
        <Text
          style={{
            fontsize: 24,
            color: '#000000',
            fontWeight: '600',
            height: 28,
            width: 137,
          }}
        >
          Jorge Torres
        </Text>
        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
          Acciones:
        </Text>
        <View style={{ display: 'flex', gap: '1rem' }}>
          <CustomActionButton
            title="Reportar un problema"
            iconLeft="repeat"
            size={SIZE.md}
            color={COLORS.blackText}
            iconRight="chevron-forward"
          />
        </View>

        <Link href="/" asChild>
          <Button title="Volver a inicio" />
        </Link>
      </View>
    </View>
  )
}
