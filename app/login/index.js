import { useState } from 'react'
import { View, Image, Text, TextInput } from 'react-native'
import { Button } from 'react-native-web'

export default function Login() {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    console.log('Login as: ', user, password)
  }

  return (
    <View>
      <Image
        style={{ width: '100px', height: '100px' }}
        source={require('../../assets/logo.png')}
      />
      <View>
        <Text>Iniciar sesión</Text>
        <View>
          <Text>¿No tienes una cuenta? </Text>
          <Text>Solicita Una</Text>
        </View>
      </View>

      <View>
        <Text>Usuario</Text>
        <TextInput
          placeholder="Usuario"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
      </View>
      <View>
        <Text>Contra</Text>
        <TextInput
          placeholder="Contra"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </View>
      <View>
        <Button onPress={handleLogin} title="Login" />
      </View>
    </View>
  )
}
