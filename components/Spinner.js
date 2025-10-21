import { View, StyleSheet } from 'react-native'
import * as Progress from 'react-native-progress'
import { COLORS, globalStyles } from '../styles/globalStyles'

const Spinner = ({ isVisible }) => {
  if (!isVisible) {
    return null
  }

  return (
    <View style={[globalStyles.container, styles.spinnerOverlay]}>
      <Progress.CircleSnail
        indeterminate={true}
        color={COLORS.primaryBlue}
        strokeCap={'round'}
        thickness={4}
        size={50}
        duration={600}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  spinnerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 86, 143, 0.3)',
    zIndex: 999,
  },
})

export default Spinner
