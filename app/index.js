import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { globalStyles } from '../styles/globalStyles'
import CustomButton from '../components/customButton'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={globalStyles.body}>
          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Home</Text>
            <Link href="/inventario" asChild>
              <CustomButton title="Ir a inventario" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Login</Text>
            <Link href="/login" asChild>
              <CustomButton title="Ir a Login" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Nueva Entrada</Text>
            <Link href="/nuevaEntrada" asChild>
              <CustomButton title="Ir a Nueva Entrada" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Nueva Salida</Text>
            <Link href="/nuevaSalida" asChild>
              <CustomButton title="Ir a Nueva Salida" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Reportes</Text>
            <Link href="/reportes" asChild>
              <CustomButton title="Ir a Reportes" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Ajustes</Text>
            <Link href="/ajustes" asChild>
              <CustomButton title="Ir a Ajustes" />
            </Link>
          </View>

          <View style={globalStyles.container}>
            <Text style={globalStyles.h3}>Usuarios</Text>
            <Link href="/usuarios" asChild>
              <CustomButton title="Ir a Usuarios" />
            </Link>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}
