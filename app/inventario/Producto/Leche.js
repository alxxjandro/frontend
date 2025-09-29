import { View, Text } from 'react-native'
import { useRouter } from 'expo-router'
import { globalStyles } from '../../../styles/globalStyles'
import ExtraButton from '../../../components/extraButton'
import { inventarioStyles } from '../../../styles/inventarioStyles'

export default function Inventario() {
  const router = useRouter()

  return (
    <View style={[inventarioStyles.body, globalStyles.container, { justifyContent: 'flex-start', paddingTop: 10 }]}>

      {/* Titulo producto */}
      <View style={inventarioStyles.header}>
          <View>
            <Text style={globalStyles.h1}>
              Detalle producto  
            </Text> 
          </View> 
            <ExtraButton icon='chevron-back' color='black' style={inventarioStyles.backButton} size={30} onPress={() => router.push('/inventario')}/> 
      </View>

      <View style={{ alignItems: 'center', marginVertical: 20 }}>
        <Text style={inventarioStyles.customButtonTextEmoji}>
          🥛  
        </Text> 
        <Text style={[globalStyles.h1]}>
          Leche  
        </Text>
        <Text style={{ fontSize: 14 }}>
          Categoria • 12L disponibles  
        </Text>
      </View>
      
      <View style={{ width: '100%', paddingHorizontal: 25, marginTop: 10 }}>
        <Text style={[globalStyles.h2 , { color: '#00568F' }]}>
          Ultimas entradas:
        </Text>

        <View style={{ backgroundColor: '#E6E6E7', padding: 10, borderRadius: 8, marginVertical: 5 }}>
          <Text style={[globalStyles.h3]}>
            Entrada del 8 de septiembre
          </Text>
          <Text style={{ fontSize: 14 }}>
            23 unidades
          </Text>
        </View>

        <View style={{ backgroundColor: '#E6E6E7', padding: 10, borderRadius: 8, marginVertical: 5 }}>
          <Text style={[globalStyles.h3]}>
            Entrada del 6 de septiembre
          </Text>
          <Text style={{ fontSize: 14 }}>
            18 unidades
          </Text>
        </View>

        <View style={{ backgroundColor: '#E6E6E7', padding: 10, borderRadius: 8, marginVertical: 5 }}>
          <Text style={[globalStyles.h3]}>
            Entrada del 5 de septiembre
          </Text>
          <Text style={{ fontSize: 14 }}>
            12 unidades
          </Text>
        </View>
      </View>
    </View>
  )
}
