import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router'

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Link href="/inventario" asChild>
        <Button title="Ir a inventario" />
      </Link>
    </View>
  )
}
