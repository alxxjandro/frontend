import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router'

export default function Page() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home</Text>
      <Link href="/inventario" asChild>
        <Button title="Ir a inventario" />
      </Link>
      <Text>Login</Text>
      <Link href="/login" asChild>
        <Button title="Ir a Login" />
      </Link>
      <Text>Nueva Entrada</Text>
      <Link href="/nuevaEntrada" asChild>
        <Button title="Ir a Nueva Entrada" />
      </Link>
      <Text>Nueva Salida</Text>
      <Link href="/nuevaSalida" asChild>
        <Button title="Ir a Nueva Salida" />
      </Link>
      <Text>Reportes</Text>
      <Link href="/reportes" asChild>
        <Button title="Ir a Reportes" />
      </Link>
      <Text>Ajustes</Text>
      <Link href="/ajustes" asChild>
        <Button title="Ir a Ajustes" />
      </Link>
      <Text>Usuarios</Text>
      <Link href="/usuarios" asChild>
        <Button title="Ir a Usuarios" />
      </Link>
    </View>
  )
}
