/* eslint-disable */
import { View, Text, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { globalStyles, SIZE, COLORS } from '../styles/globalStyles'
import CustomButton from '../components/customButton'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import CustomSquareButton from '../components/customSquareButton'
import CustomBottomBar from '../components/customBottomBar'
import UserIcon from '../components/userIcon'
import { useAuth } from '../hooks/useAuth'
import { useInventario } from '../hooks/useInventario'
import { useEffect, useState } from 'react'
import { useLogs } from '../hooks/useLogs'
import { useEntradas } from '../hooks/useEntradas'
import { useSalidas } from '../hooks/useSalidas'

export default function Page() {
  const { user } = useAuth()
  const { entradas, fetchEntradas, loading: loadingEntradas } = useEntradas()
  const { salidas, fetchSalidas, loading: loadingSalidas } = useSalidas()
  const { fetchLogsByYear, reportes, loading: loadingLogs } = useLogs()
  const {
    inventario,
    fetchAll: fetchProductos,
    loading: loadingInventario,
  } = useInventario()

  const [productoCount, setProductCount] = useState(0)
  const [logsCount, setLogCount] = useState(0)

  const name = user?.nombreUsuario
    ? user.nombreUsuario.charAt(0).toUpperCase() + user.nombreUsuario.slice(1)
    : 'Usuario'

  useEffect(() => {
    fetchProductos()
    fetchLogsByYear()
    fetchEntradas()
    fetchSalidas()
  }, [])

  useEffect(() => {
    const totalMeses =
      reportes?.reduce((acc, item) => acc + item.months.length, 0) || 0
    setLogCount(totalMeses)
  }, [reportes])

  useEffect(() => {
    setProductCount(inventario?.length || 0)
  }, [inventario])

  const entradasSubtitle = loadingEntradas
    ? 'Cargando...'
    : entradas
      ? `${entradas.count || entradas.length || 0} entradas creadas`
      : '0 entradas creadas'

  const salidasSubtitle = loadingSalidas
    ? 'Cargando...'
    : salidas
      ? `${salidas?.data?.length || 0} salidas creadas hoy`
      : '0 salidas creadas hoy'

  const inventarioSubtitle = loadingInventario
    ? 'Cargando...'
    : `${productoCount} productos`

  const reportesSubtitle = loadingLogs
    ? 'Cargando...'
    : `${logsCount} reportes disponibles`

  return (
    <SafeAreaProvider>
      <SafeAreaView style={globalStyles.body}>
        <View style={[globalStyles.body]}>
          <View style={{ height: '100%', gap: 30 }}>
            {/* HEADER */}
            <View style={styles.userHeader}>
              <UserIcon name={name} bgColor={COLORS.primaryBlue15} />
              <View
                style={{ display: 'flex', justifyContent: 'center', gap: 0 }}
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
                    subtitle={entradasSubtitle}
                  />
                </Link>

                <Link href="/nuevaSalida" asChild>
                  <CustomSquareButton
                    title="Registrar salida"
                    subtitle={salidasSubtitle}
                    icon="exit-outline"
                    borderColor={COLORS.primaryBlue}
                    backgroundColor={COLORS.primaryBlue15}
                  />
                </Link>

                <Link href="/inventario" asChild>
                  <CustomSquareButton
                    title="Mi inventario"
                    subtitle={inventarioSubtitle}
                    icon="archive-outline"
                    borderColor={COLORS.brownAccent}
                    backgroundColor={COLORS.brownAccent15}
                  />
                </Link>

                <Link href="/reportes" asChild>
                  <CustomSquareButton
                    title="Gestionar reportes"
                    subtitle={reportesSubtitle}
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
