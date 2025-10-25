import SalidasServiceProxy from '../api/proxies/salidaService'

global.fetch = jest.fn()

describe('SalidaService Tests', () => {
  let salidaService

  beforeEach(() => {
    salidaService = SalidasServiceProxy()
    jest.clearAllMocks()
  })

  test('getAllSalidas successfully returns list of salidas', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          idSalidaProducto: 1,
          idUsuario: 1,
          idRazon: 2,
          fechaSalida: '2025-10-30',
          idEntradaProducto: 5,
          producto: {
            idProducto: 1,
            cantidad: 3,
          },
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await salidaService.getAllSalidas()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('getSalidaById successfully returns single salida', async () => {
    const mockResponse = {
      success: true,
      data: {
        idSalidaProducto: 1,
        idUsuario: 1,
        idRazon: 2,
        fechaSalida: '2025-10-30',
        idEntradaProducto: 5,
        producto: {
          idProducto: 1,
          cantidad: 3,
        },
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await salidaService.getSalidaById(1)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createSalida successfully creates and returns salida', async () => {
    const mockRequest = {
      idUsuario: 1,
      idRazon: 1,
      fechaSalida: '2025-10-30',
      productos: [
        {
          idProducto: 1,
          cantidad: 3,
        },
      ],
    }

    const mockResponse = {
      success: true,
      message: 'Salida(s) creada(s) correctamente',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      text: async () => JSON.stringify(mockResponse),
    })

    const result = await salidaService.createSalida(mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('getRazonesSalida successfully returns list of razones', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          idRazon: 1,
          razon: 'Merma',
        },
        {
          idRazon: 2,
          razon: 'Consumo',
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await salidaService.getRazonesSalida()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createSalida throws error for invalid data (400)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => '',
    })

    await expect(
      salidaService.createSalida({
        idUsuario: 1,
        productos: [],
      })
    ).rejects.toThrow('Datos faltantes o inválidos')
  })
})
