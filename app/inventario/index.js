import { useState, useEffect } from 'react'
import { View, Text, Modal, TouchableOpacity } from 'react-native'
import { useRouter } from 'expo-router'
import SearchBar from '../../components/searchBar'
import { globalStyles } from '../../styles/globalStyles'
import ExtraButton from '../../components/extraButton'
import { inventarioStyles } from '../../styles/inventarioStyles'
import ProductButton from '../../components/productButton'
import TipoVistaModal from './Componentes/tipoVista'
import OrdenarPor from './Componentes/ordenarPor'
import Categorias from './Componentes/categorias'

export default function Inventario() {
  const router = useRouter()
  const [searchText, setSearchText] = useState('');
  const [showTipoVista, setShowTipoVista] = useState(false)
  const [showOrdenarPor, setShowOrdenarPor] = useState(false)
  const [showCategorias, setShowCategorias] = useState(false)

  const [products, setProducts] = useState([
  { name: 'Manzana', emoji: '🍎', subtitle: '53 disponibles', route: '/inventario/Producto/Manzana' },
  { name: 'Leche', emoji: '🥛', subtitle: '12L disponibles', route: '/inventario/Producto/Leche' },
  { name: 'Naranja', emoji: '🍊', subtitle: '41 disponibles', route: '/inventario/Producto/Manzana' },
  { name: 'Cereal', emoji: '🥣', subtitle: '20 disponibles', route: '/inventario/Producto/Leche' },
  { name: 'Huevo', emoji: '🥚', subtitle: '199 disponibles', route: '/inventario/Producto/Manzana' },
  { name: 'Tomate', emoji: '🍅', subtitle: '4 disponibles', route: '/inventario/Producto/Leche' },
  ]);

  const filteredProducts = products.filter(product =>
  product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={[inventarioStyles.body, globalStyles.container]}>

      {/* Titulo inventario */}
      <View style={inventarioStyles.header}>
          <View>
            <Text style={globalStyles.h1}>
              Inventario  
            </Text> 
            <Text>
              (59 productos)
            </Text>
          </View> 
            <ExtraButton icon='chevron-back' color='black' style={inventarioStyles.backButton} size={30} onPress={() => router.push('/')}/> 
      </View>

      {/* Buscador + botón agregar */}
      <View style={inventarioStyles.searchSection}>
        <SearchBar icon='search-outline' placeHolder="Buscar producto" value={searchText} onChangeText={setSearchText}/>
        <ExtraButton color='white' style={inventarioStyles.addButton} styleText={inventarioStyles.customButtonTextFilter} title='Agregar producto' icon='add' size={15}/>
      </View>

      {/* Filtros */}
      <View style={[inventarioStyles.filtersSection, { justifyContent: 'space-around' }]}>  
        <ExtraButton color='white' style={[inventarioStyles.filterButton]} styleText={inventarioStyles.customButtonTextFilter} title='Tipo de vista' icon='chevron-down' size={15} onPress={() => setShowTipoVista(true)}/> 
        <ExtraButton color='white' style={[inventarioStyles.filterButton]} styleText={inventarioStyles.customButtonTextFilter} title='Ordenar por' icon='chevron-down' size={15} onPress={() => setShowOrdenarPor(true)}/>
        <ExtraButton color='white' style={[inventarioStyles.filterButton]} styleText={inventarioStyles.customButtonTextFilter} title='Categorias' icon='chevron-down' size={15} onPress={() => setShowCategorias(true)}/> 
      </View>

      {/* Botones de productos */}
      <View>
        <View style={inventarioStyles.buttonGrid}>
          
          {filteredProducts.map((product, index) => (
            <ProductButton
              key={index}
              product={product.emoji}
              productStyle={inventarioStyles.customButtonTextEmoji}
              title={product.name}
              subtitle={product.subtitle}
              icon='chevron-down'
              styleText={inventarioStyles.customButtonTextAdd}
              onPress={() => router.push(product.route)}
            />
          ))}
        </View>
      </View>

      {/* Modales */}
      <TipoVistaModal visible={showTipoVista} onClose={() => setShowTipoVista(false)}/>
      <OrdenarPor visible={showOrdenarPor} onClose={() => setShowOrdenarPor(false)}/>
      <Categorias visible={showCategorias} onClose={() => setShowCategorias(false)}/>
    </View>
  )
}
