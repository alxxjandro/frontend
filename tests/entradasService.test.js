import EntradasServiceProxy from '../api/proxies/entradasService'

global.fetch = jest.fn()

describe('EntradasService Tests', () => {
  let entradasService

  beforeEach(() => {
    entradasService = EntradasServiceProxy()
    jest.clearAllMocks()
  })

  test('getAllEntradas successfully returns list of entradas', async () => {
    const mockResponse = {
      success: true,
      count: 3,
      data: [
        {
          idEntrada: 1,
          fechaEntrada: '2025-10-16T00:00:00.000Z',
          emisor: 'Proveedor X',
          compra: 'Compra #12345',
          idUsuario_usuario: 2,
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await entradasService.getAllEntradas()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createEntrada successfully creates and returns entrada', async () => {
    const mockRequest = {
      idUsuario_usuario: 2,
      fechaEntrada: '2025-10-16',
      emisor: 'Proveedor X',
      compra: 0,
      productos: [
        {
          idProducto: 1,
          idUnidad: 1,
          fechaEstimada: '2025-10-25',
          cantidad: 10,
        },
      ],
    }

    const mockResponse = {
      success: true,
      message: 'Entrada creada correctamente',
      data: {
        idEntrada: 5,
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      text: async () => JSON.stringify(mockResponse),
    })

    const result = await entradasService.createEntrada(mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('getAllEntradas throws error on server failure (500)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    await expect(entradasService.getAllEntradas()).rejects.toThrow(
      'Error al obtener las entradas'
    )
  })
})
