import { Link } from 'expo-router'
import { useState } from 'react'
import { View, Text, Button } from 'react-native'
import CustomActionButton from '../../components/customAccionButton'
import CustomToggleContainer from '../../components/customToggleContainer'
import CustomPFP from '../../components/customPFP'
import { SIZE, COLORS, FONTS } from '../../styles/globalStyles'
import CusstomBottomBar from '../../components/customBottomBar'

export default function Test() {
  let name = 'Jorge Torres'
  let firstN = name.split(' ')[0]
  let lastN = name.split(' ')[1]
  const [isDarkMode, setIsDarkMode] = useState(false)
  const toggleSwitchTheme = () =>
    setIsDarkMode((previousState) => !previousState)

  return (
    <View
      style={{ backgroundColor: '#FBFBFB', flex: 1, alignContent: 'center' }}
    >
      <View style={{ gap: 10, marginLeft: 29, marginTop: 43 }}>
        <View style={{ alignSelf: 'flex-start', justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 30, color: '#000000', fontWeight: '600' }}>
            Ajustes
          </Text>
        </View>
        <View
          style={{
            alignSelf: 'center',
            justifyContent: 'center',
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <CustomPFP
            first={firstN}
            last={lastN}
            width={128}
            height={128}
            fontSize={48}
            fontColor={COLORS.whiteText}
            colorBG={COLORS.primaryBlue}
          />
          <Text
            style={{
              fontSize: 24,
              color: COLORS.blackText,
              fontStyle: FONTS.bold,
              alignSelf: 'center',
              marginTop: 8,
            }}
          >
            {name}
          </Text>
        </View>
        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
          Acciones:
        </Text>
        <View style={{ display: 'flex', gap: '1rem' }}>
          <CustomToggleContainer
            title="Notificaciones"
            iconLeft="notifications-outline"
            size={SIZE.md}
            color={COLORS.blackText}
          />
          <CustomToggleContainer
            title="Tema"
            iconLeft="moon-outline"
            size={SIZE.md}
            color={COLORS.blackText}
            value={isDarkMode}
            onValueChange={toggleSwitchTheme}
          />
          <CustomActionButton
            title="Cambiar contraseña"
            iconLeft="repeat"
            size={SIZE.md}
            color={COLORS.blackText}
            iconRight="chevron-forward"
          />
          <CustomActionButton
            title="Cerrar sesión"
            iconLeft="lock-closed-outline"
            size={SIZE.md}
            color={COLORS.blackText}
            iconRight="chevron-forward"
          />
          <CustomActionButton
            title="Reportar un problema"
            iconLeft="warning-outline"
            size={SIZE.md}
            color={COLORS.blackText}
            iconRight="chevron-forward"
          />
        </View>
        <View style={{ marginTop: 125, alignSelf: 'center', marginRight: 30 }}>
          <CusstomBottomBar activeBtn={'ajustes'} />
        </View>
      </View>
    </View>
  )
}
