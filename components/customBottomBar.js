import { View } from 'react-native'
import IconBottomBar from './iconBottomBar'

/**
 * Main project Navbar.
 *
 * @component
 * @param {"usuarios" | "inicio" | "ajustes"} [props.activeBtn] - Button to render as active
 * @returns {JSX.Element} The navbar
 */
export default function CustomBottomBar({ activeBtn }) {
  return (
    <View
      style={{
        width: 390,
        minHeight: 100,
        backgroundColor: '#EDEDED',
        flexDirection: 'row',
        paddingBottom: 20,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View
          style={{
            marginRight: 52,
            marginLeft: 65,
            flexDirection: 'row',
            display: 'flex',
          }}
        >
          <IconBottomBar
            title="Inicio"
            icon="home-outline"
            active={activeBtn !== 'inicio'}
            redirect={''}
          />
        </View>
        <View
          style={{ marginRight: 52, flexDirection: 'row', display: 'flex' }}
        >
          <IconBottomBar
            title="Ajustes"
            icon="settings-outline"
            active={activeBtn !== 'ajustes'}
            redirect={'ajustes'}
          />
        </View>
        <View style={{ marginRight: 65, flexDirection: 'row' }}>
          <IconBottomBar
            title="Usuarios"
            icon="person"
            active={activeBtn !== 'usuarios'}
            redirect={'usuarios'}
          />
        </View>
      </View>
    </View>
  )
}
