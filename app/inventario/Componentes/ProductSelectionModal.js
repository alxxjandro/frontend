import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, FONTS } from '../../../styles/globalStyles'

export default function ProductSelectionModal({
  visible,
  onClose,
  product,
  onConfirm,
}) {
  const [quantity, setQuantity] = useState(1)

  const handleIncrement = () => {
    if (quantity < product?.quantity) {
      setQuantity((prev) => prev + 1)
    }
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  const handleConfirm = () => {
    onConfirm({ ...product, selectedQuantity: quantity })
    setQuantity(1)
    onClose()
  }

  const handleCancel = () => {
    setQuantity(1)
    onClose()
  }

  if (!product) return null

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              {/* Header */}
              <View style={styles.header}>
                <Text style={styles.title}>Salida de producto</Text>
                <TouchableOpacity
                  onPress={handleCancel}
                  style={styles.closeButton}
                >
                  <Ionicons name="close" size={24} color={COLORS.blackText} />
                </TouchableOpacity>
              </View>

              {/* Product Info */}
              <View style={styles.productInfo}>
                <Text style={styles.productEmoji}>{product.emoji}</Text>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productQuantity}>
                  {product.quantity} {product.unit}
                </Text>
              </View>

              {/* Quantity Selector */}
              <View style={styles.quantityContainer}>
                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity <= 1 && styles.quantityButtonDisabled,
                  ]}
                  onPress={handleDecrement}
                  disabled={quantity <= 1}
                >
                  <Ionicons
                    name="remove"
                    size={20}
                    color={
                      quantity <= 1 ? COLORS.greyBorder : COLORS.primaryBlue
                    }
                  />
                </TouchableOpacity>

                <Text style={styles.quantityText}>{quantity}</Text>

                <TouchableOpacity
                  style={[
                    styles.quantityButton,
                    quantity >= product.quantity &&
                      styles.quantityButtonDisabled,
                  ]}
                  onPress={handleIncrement}
                  disabled={quantity >= product.quantity}
                >
                  <Ionicons
                    name="add"
                    size={20}
                    color={
                      quantity >= product.quantity
                        ? COLORS.greyBorder
                        : COLORS.primaryBlue
                    }
                  />
                </TouchableOpacity>
              </View>

              {/* Action Buttons */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[styles.actionButton, styles.cancelButton]}
                  onPress={handleCancel}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.actionButton, styles.confirmButton]}
                  onPress={handleConfirm}
                >
                  <Text style={styles.confirmButtonText}>Agregar salida</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  )
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 24,
    margin: 20,
    minWidth: 300,
    maxWidth: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: FONTS.size.lg,
    fontFamily: FONTS.bold,
    color: COLORS.primaryBlue,
  },
  closeButton: {
    padding: 4,
  },
  productInfo: {
    alignItems: 'center',
    marginBottom: 24,
  },
  productEmoji: {
    fontSize: 64,
    marginBottom: 8,
  },
  productName: {
    fontSize: FONTS.size.lg,
    fontFamily: FONTS.bold,
    color: COLORS.blackText,
    marginBottom: 4,
  },
  productQuantity: {
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
    color: '#666',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.cardBackgroundOne,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.primaryBlue,
  },
  quantityButtonDisabled: {
    borderColor: COLORS.greyBorder,
    backgroundColor: '#f5f5f5',
  },
  quantityText: {
    fontSize: FONTS.size.xl,
    fontFamily: FONTS.bold,
    color: COLORS.blackText,
    marginHorizontal: 24,
    minWidth: 30,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: COLORS.cardBackgroundOne,
    borderWidth: 1,
    borderColor: COLORS.greyBorder,
  },
  confirmButton: {
    backgroundColor: COLORS.primaryBlue,
  },
  cancelButtonText: {
    color: COLORS.blackText,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.regular,
  },
  confirmButtonText: {
    color: COLORS.whiteText,
    fontSize: FONTS.size.md,
    fontFamily: FONTS.bold,
  },
})
