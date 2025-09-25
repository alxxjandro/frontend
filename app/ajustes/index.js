import { Link } from 'expo-router'
import { View, Button } from 'react-native-web'

export default function Test() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Link href="/" asChild>
        <Button title="Volver a inicio" />
      </Link>
    </View>
  )
}
