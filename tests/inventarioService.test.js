/* eslint-disable */
import InventarioServiceProxy from '../api/proxies/inventarioService'

// Mock global fetch
global.fetch = jest.fn()

describe('InventarioService Tests', () => {
  let inventarioService

  beforeEach(() => {
    inventarioService = InventarioServiceProxy()
    jest.clearAllMocks()
  })

  // Test 1: Successfully get all inventario
  test('getAllInventario successfully returns list of inventario', async () => {
    const mockResponse = {
      success: true,
      count: 5,
      data: [
        {
          idInventario: 1,
          idProducto_producto: 3,
          cantidadTotal: 150,
          idUnidad_unidad: 2,
          fechaFinal: '2025-10-31T00:00:00.000Z',
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await inventarioService.getAllInventario()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  // Test 2: Successfully update inventario
  test('updateInventario successfully updates and returns inventario', async () => {
    const mockRequest = {
      idProducto_producto: 3,
      cantidadTotal: 200,
      idUnidad_unidad: 2,
      fechaFinal: '2025-12-01',
    }

    const mockResponse = {
      success: true,
      message: 'Inventario actualizado correctamente',
      data: {
        idInventario: 1,
        cantidadTotal: 200,
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await inventarioService.updateInventario(1, mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  // Test 3: Update inventario fails with 400 (invalid data)
  test('updateInventario throws error for invalid data (400)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    })

    await expect(
      inventarioService.updateInventario(1, {
        cantidadTotal: -10,
      })
    ).rejects.toThrow('Datos inválidos')
  })
})
