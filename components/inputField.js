// components/InputField.js
import { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../styles/globalStyles'

export default function InputField({
  label,
  placeholder,
  value,
  onChangeText,
  secure = false,
  error = false,
  onSubmitEditing,
  labelStyle, // 👈 nuevo prop
}) {
  const [visible, setVisible] = useState(!secure)

  return (
    <View style={{ width: '100%', maxWidth: 332 }}>
      <Text
        style={[
          {
            fontFamily: FONTS.regular,
            fontSize: FONTS.size.sm,
            marginBottom: 6,
            color: COLORS.blackText,
          },
          labelStyle,
        ]}
      >
        {label}
      </Text>

      <View style={{ position: 'relative' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={!visible}
          onSubmitEditing={onSubmitEditing}
          style={{
            width: '100%',
            height: 36,
            paddingHorizontal: 12,
            borderWidth: 1,
            borderRadius: 6,
            borderColor: error ? COLORS.error : COLORS.greyBorder,
            backgroundColor: '#fff',
            fontFamily: FONTS.regular,
            fontSize: FONTS.size.sm,
          }}
          placeholderTextColor="#9CA3AF"
        />

        {secure && (
          <TouchableOpacity
            onPress={() => setVisible((v) => !v)}
            style={{
              position: 'absolute',
              right: 8,
              top: 6,
              height: 24,
              width: 24,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons
              name={visible ? 'eye-off-outline' : 'eye-outline'}
              size={18}
              color="#6B7280"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}
