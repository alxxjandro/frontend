import { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import { router } from 'expo-router'
import { COLORS, FONTS, globalStyles } from '../../styles/globalStyles'
import CustomInput from '../../components/customInput'
import CustomButton from '../../components/customButton'

const CORRECT_USER = 'admin'
const CORRECT_PASS = 'admin'

export default function LoginScreen() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const handleLogin = () => {
    if (user === CORRECT_USER && password === CORRECT_PASS) {
      setShowError(false)
      router.push('/')
    } else {
      setShowError(true)
    }
  }

  const handleOutsidePress = () => {
    Keyboard.dismiss()
  }

  return (
    <TouchableWithoutFeedback onPress={handleOutsidePress}>
      <View
        style={[
          globalStyles.authContainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <View
          style={{
            width: '100%',
            height: '85%',
            marginVertical: 20,
            paddingVertical: 50,
            maxWidth: 332,
          }}
        >
          <View style={{ alignItems: 'center', marginBottom: 18 }}>
            <Image
              source={require('../../assets/logo.jpg')}
              style={{ width: 140, height: 140, resizeMode: 'contain' }}
            />
          </View>

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

          <Text
            style={{
              fontFamily: FONTS.regular,
              fontSize: FONTS.size.sm,
              color: COLORS.greyText,
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

          <CustomInput
            label="Usuario"
            placeholder="Usuario"
            value={user}
            onChangeText={(t) => {
              setUser(t)
              if (showError) setShowError(false)
            }}
            error={showError}
          />

          <CustomInput
            label="Contraseña"
            placeholder="Contraseña"
            value={password}
            onChangeText={(t) => {
              setPassword(t)
              if (showError) setShowError(false)
            }}
            secureTextEntry
            error={showError}
            password={true}
          />

          {/* Olvidaste contraseña */}
          <TouchableOpacity activeOpacity={0.8}>
            <Text
              style={{
                fontFamily: FONTS.regular,
                fontSize: FONTS.size.xs,
                color: COLORS.greyText,
                textDecorationLine: 'underline',
                marginTop: 8,
                marginBottom: 18,
              }}
            >
              ¿Olvidaste la contraseña?
            </Text>
          </TouchableOpacity>

          {/* Botón */}
          <CustomButton
            title="Iniciar sesión"
            onPress={handleLogin}
            width={332}
            borderRadius={4}
            backgroundColor={COLORS.primaryBlue}
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
    </TouchableWithoutFeedback>
  )
}
