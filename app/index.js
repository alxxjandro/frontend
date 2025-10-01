import { View, Text, Button } from 'react-native'
import { Link } from 'expo-router'
import { globalStyles } from '../styles/globalStyles'
import CustomButton from '../components/customButton'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import CustomActionButton from '../components/customAccionButton'
import CustomSquareButton from '../components/customSquareButton'
import CusstomBottomBar from '../components/customBottomBar'
import { SIZE, COLORS } from '../styles/globalStyles'
import CustomPFP from '../components/customPFP'

export default function Page() {
  let name = 'Jorge Torres'
  let firstN = name.split(' ')[0]
  let lastN = name.split(' ')[1]
  return (
    <View
      style={{
        backgroundColor: '#FBFBFB',
        flex: 1,
      }}
    >
      <View
        style={{
          gap: '1rem',
          flexDirection: 'column',
          marginLeft: 29,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            marginTop: 52,
            gap: 8,
          }}
        >
          <CustomPFP
            first={firstN}
            last={lastN}
            width={36}
            height={36}
            fontSize={SIZE.xs}
            fontColor={COLORS.whiteText}
            colorBG={COLORS.primaryBlue}
          />

          <View
            style={{
              flexDirection: 'colum',
            }}
          >
            <Text
              style={{
                fontSize: SIZE.sm,
                color: '#000000',
                fontWeight: '500',
              }}
            >
              Bienvenido 👋
            </Text>
            <Text
              style={{
                fontSize: SIZE.xl,
                color: '#000000',
                fontWeight: '500',
              }}
            >
              {name}
            </Text>
          </View>
        </View>
        <Text style={{ fontSize: 16, color: '#000000', fontWeight: '500' }}>
          Accesos rápidos:
        </Text>
        <View
          style={{
            gap: '1rem',
            flexDirection: 'row',
          }}
        >
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
              backgroundColor="#d6e3eb"
            />
          </Link>
        </View>
        <View
          style={{
            gap: '1rem',
            flexDirection: 'row',
          }}
        >
          <Link href="/inventario" asChild>
            <CustomSquareButton
              title="Mi inventario"
              subtitle="79 productos"
              icon="archive-outline"
              borderColor="#824917"
              backgroundColor="#e3d8ce"
            />
          </Link>
          <Link href="/reportes" asChild>
            <CustomSquareButton
              title="Gestionar reportes"
              subtitle="11 reportes disponibles"
              icon="book-outline"
              borderColor="#FFBF00"
              backgroundColor="#fcefc9"
            />
          </Link>
        </View>
        <Text
          style={{
            fontSize: 16,
            color: '#000000',
            fontWeight: '500',
            marginTop: 48,
            marginBottom: 36,
          }}
        >
          Acciones:
        </Text>
        <View style={{ marginBottom: 66, gap: 8 }}>
          <Link href="/reportes" asChild>
            <CustomActionButton
              title="Ver reporte de salidas"
              iconLeft="open-outline"
              size={SIZE.md}
              color={COLORS.primaryBlue}
              iconRight="chevron-forward"
            />
          </Link>
          <CustomActionButton
            title="Stock bajo"
            iconLeft="warning-outline"
            size={SIZE.md}
            color="#E78128"
            iconRight="chevron-forward"
          />

          <CustomActionButton
            title="Por caducar"
            iconLeft="alert-circle-outline"
            size={SIZE.md}
            color="#B91C1C"
            iconRight="chevron-forward"
          />
        </View>
      </View>
      <View style={{}}>
        <CusstomBottomBar activeBtn={'inicio'} />
      </View>
    </View>
  )
}
