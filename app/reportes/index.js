import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Body } from './_components'
import ScreenHeader from '../../components/screenHeader'
import { COLORS, FONTS } from '../../styles/globalStyles'

export default function ReportesScreen() {
  return (
    <View style={styles.container}>
      <ScreenHeader title="Reportes" showBackButton={true} />
      <Body />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: COLORS.background,
  },
  descriptionText: {
    fontFamily: FONTS.regular,
    fontSize: FONTS.size.md,
    color: COLORS.blackText,
    marginBottom: 20,
  },
})
