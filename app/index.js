import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import { globalStyles } from '../styles/globalStyles'
import CustomButton from '../components/customButton'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomSquareButton from '../components/customSquareButton'
import CustomBottomBar from '../components/customBottomBar'
import { SIZE, COLORS } from '../styles/globalStyles'
import { StyleSheet } from 'react-native'
import UserIcon from '../components/userIcon'
import { useAuth } from '../hooks/useAuth'
import { useInventario } from '../hooks/useInventario'
import { useEffect, useState } from 'react'

export default function Page() {
  const { user } = useAuth()
  const [productoCount, setProductCount] = useState(0)
  const name =
    user?.nombreUsuario.charAt(0).toUpperCase() +
      user?.nombreUsuario.slice(1) || 'usuario'

  const { inventario, fetchAll: fetchProductos } = useInventario()

  //fetch and update the product count on mount
  useEffect(() => {
    fetchProductos()
  }, [])

  useEffect(() => {
    setProductCount(inventario?.length)
  }, [inventario])

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={[globalStyles.body]}>
          <View
            style={{
              height: '100%',
              gap: '30',
            }}
          >
            <View style={styles.userHeader}>
              <UserIcon name={name} bgColor={COLORS.primaryBlue15} />
              <View
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 0,
                }}
              >
                <Text>Bienvenido 👋</Text>
                <Text style={globalStyles.h2}>{name}</Text>
              </View>
            </View>

            <View>
              <Text style={globalStyles.subtitle}>Accesos rápidos:</Text>
              <View style={styles.squreBtnsContainer}>
                <Link href="/nuevaEntrada" asChild>
                  <CustomSquareButton
                    title="Registrar entrada"
                    subtitle="7 entradas creadas hoy"
                  />
                </Link>

                <Link href="/nuevaSalida" asChild>
                  <CustomSquareButton
                    title="Registrar salida"
                    subtitle="4 salidas creadas hoy"
                    icon="exit-outline"
                    borderColor={COLORS.primaryBlue}
                    backgroundColor={COLORS.primaryBlue15}
                  />
                </Link>

                <Link href="/inventario" asChild>
                  <CustomSquareButton
                    title="Mi inventario"
                    subtitle={`${productoCount} productos`}
                    icon="archive-outline"
                    borderColor={COLORS.brownAccent}
                    backgroundColor={COLORS.brownAccent15}
                  />
                </Link>

                <Link href="/reportes" asChild>
                  <CustomSquareButton
                    title="Gestionar reportes"
                    subtitle="11 reportes disponibles"
                    icon="book-outline"
                    borderColor={COLORS.yellowAccent}
                    backgroundColor={COLORS.yellowAccent15}
                  />
                </Link>
              </View>
            </View>

            <View style={{ gap: 10 }}>
              <Text style={globalStyles.subtitle}>Acciones:</Text>
              <CustomButton
                iconLeft="open-outline"
                colorLeft={COLORS.primaryBlue}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Ver reporte de salidas"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
              />
              <CustomButton
                iconLeft="warning-outline"
                colorLeft={COLORS.yellowAccent}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Stock bajo"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
              />
              <CustomButton
                iconLeft="alert-circle-outline"
                colorLeft={COLORS.errorAccent}
                colorRight={COLORS.blackText}
                textColor={COLORS.blackText}
                backgroundColor={COLORS.cardBackgroundOne}
                title="Por caducar"
                borderRadius={8}
                textSize={SIZE.sm}
                iconRight="chevron-forward"
                expand="right"
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
      <CustomBottomBar activeBtn={'inicio'} />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  userHeader: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
  },
  squreBtnsContainer: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    width: 332,
  },
})
