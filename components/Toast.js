import { Text, StyleSheet, Animated } from 'react-native'
import { COLORS, FONTS } from '../styles/globalStyles'
import { useRef, useState } from 'react'

let showToast

function ToastContainer() {
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')
  const [visible, setVisible] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current

  showToast = (msg, t = 'success') => {
    setMessage(msg)
    setType(t)
    setVisible(true)
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start()

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setVisible(false))
    }, 2000)
  }

  if (!visible) return null

  return (
    <Animated.View
      style={[
        styles.toast,
        { opacity: fadeAnim },
        type === 'error' ? styles.error : styles.success,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const Toast = {
  Container: ToastContainer,
  show: (msg, type) => showToast?.(msg, type),
}

export default Toast

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 150,
    alignSelf: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 12,
    zIndex: 100,
  },
  success: { backgroundColor: COLORS.primaryGreen },
  error: { backgroundColor: COLORS.error },
  text: {
    color: '#fff',
    fontFamily: FONTS.bold,
    fontSize: FONTS.size.sm,
  },
})
