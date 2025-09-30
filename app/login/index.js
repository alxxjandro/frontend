import { useState } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Link, router } from 'expo-router'
import { COLORS, FONTS, globalStyles } from '../../styles/globalStyles'
import InputField from '../../components/inputField'
import PrimaryButton from '../../components/primaryButton'

// Credenciales hardcodeadas
const CORRECT_USER = 'alonso'
const CORRECT_PASS = 'bebe'

export default function LoginScreen() {
  console.log(COLORS)

  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const canContinue = user.trim().length > 0 && password.trim().length > 0

  const handleLogin = () => {
    if (user === CORRECT_USER && password === CORRECT_PASS) {
      setShowError(false)
      router.push('/')
    } else {
      setShowError(true)
    }
  }

  return (
    <View
      style={[
        globalStyles.authContainer,
        { justifyContent: 'center', alignItems: 'center' },
      ]}
    >
      <View style={{ width: '100%', maxWidth: 360, paddingHorizontal: 14 }}>
        {/* LOGO */}
        <View style={{ alignItems: 'center', marginBottom: 18 }}>
          <Image
            source={require('../../assets/logo.jpg')}
            style={{ width: 140, height: 140, resizeMode: 'contain' }}
          />
        </View>
        {/* Título */}
        <Text
          style={{
            fontFamily: FONTS.bold,
            fontSize: FONTS.size.xl,
            color: COLORS.primaryBlue,
            marginBottom: 6,
          }}
        >
          Iniciar sesión
        </Text>

        {/* Subtítulo */}
        <Text
          style={{
            fontFamily: FONTS.regular,
            fontSize: FONTS.size.sm,
            color: COLORS.greyBorder,
            marginBottom: 18,
          }}
        >
          ¿No tienes una cuenta?{' '}
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: FONTS.size.sm,
              color: COLORS.primaryBlue,
              textDecorationLine: 'underline',
            }}
          >
            Solicita una
          </Text>
        </Text>

        {/* Usuario */}
        <View style={{ marginBottom: 14 }}>
          <InputField
            label="Usuario"
            placeholder="Usuario"
            value={user}
            onChangeText={(t) => {
              setUser(t)
              if (showError) setShowError(false)
            }}
            labelStyle={{ color: COLORS.primaryBlue, fontFamily: FONTS.bold }}
          />
        </View>

        {/* Contraseña */}
        <View style={{ marginBottom: 6 }}>
          <InputField
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChangeText={(t) => {
              setPassword(t)
              if (showError) setShowError(false)
            }}
            labelStyle={{ color: COLORS.primaryBlue, fontFamily: FONTS.bold }}
            secure
            error={showError}
          />
        </View>

        {/* ¿Olvidaste la contraseña? */}
        <TouchableOpacity activeOpacity={0.8}>
          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: FONTS.size.xs,
              color: COLORS.greyBorder,
              textDecorationLine: 'underline',
              marginBottom: 18,
            }}
          >
            ¿Olvidaste la contraseña?
          </Text>
        </TouchableOpacity>

        {/* Botón */}
        <PrimaryButton
          title="Iniciar sesión"
          onPress={handleLogin}
          disabled={!canContinue}
        />

        {/* Error */}
        {showError && (
          <Text
            style={{
              textAlign: 'center',
              marginTop: 8,
              fontFamily: FONTS.regular,
              fontSize: FONTS.size.xs,
              color: COLORS.error,
            }}
          >
            Usuario o contraseña incorrecta
          </Text>
        )}
      </View>
    </View>
  )
}
