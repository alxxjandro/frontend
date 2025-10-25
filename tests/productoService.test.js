import ProductoServiceProxy from '../api/proxies/productoService'

global.fetch = jest.fn()

describe('ProductoService Tests', () => {
  let productoService

  beforeEach(() => {
    productoService = ProductoServiceProxy()
    jest.clearAllMocks()
  })

  test('getAllProductos successfully returns list of productos', async () => {
    const mockResponse = {
      success: true,
      count: 3,
      data: [
        {
          idProducto: 1,
          nombreProducto: 'Detergente Ariel',
          emoji: '🧴',
          idDepartamento_departamento: 2,
          departamento: {
            idDepartamento: 2,
            nombreDepartamento: 'Limpieza',
          },
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await productoService.getAllProductos()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createProducto successfully creates and returns producto', async () => {
    const mockRequest = {
      nombreProducto: 'Detergente Ariel',
      idDepartamento_departamento: 2,
      idUnidad_unidad: 5,
      emoji: '🧴',
    }

    const mockResponse = {
      success: true,
      message: 'Producto creado exitosamente',
      data: {
        idProducto: 1,
        nombreProducto: 'Detergente Ariel',
        emoji: '🧴',
        idDepartamento_departamento: 2,
        departamento: {
          idDepartamento: 2,
          nombreDepartamento: 'Limpieza',
        },
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    })

    const result = await productoService.createProducto(mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('updateProducto successfully updates and returns producto', async () => {
    const mockRequest = {
      nombreProducto: 'Cloro Pinol',
      idDepartamento_departamento: 1,
      emoji: '🧽',
    }

    const mockResponse = {
      success: true,
      message: 'Producto actualizado exitosamente',
      data: {
        idProducto: 1,
        nombreProducto: 'Cloro Pinol',
        emoji: '🧽',
        idDepartamento_departamento: 1,
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await productoService.updateProducto(1, mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('deleteProducto successfully deletes producto', async () => {
    const mockResponse = {
      success: true,
      message: 'Producto eliminado exitosamente',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await productoService.deleteProducto(1)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createProducto throws error for invalid data (400)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    })

    await expect(
      productoService.createProducto({
        nombreProducto: '',
      })
    ).rejects.toThrow('Datos inválidos')
  })
})
