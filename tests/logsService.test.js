/* eslint-disable */
import LogsServiceProxy from '../api/proxies/logsService'

// Mock global fetch
global.fetch = jest.fn()

describe('LogsService Tests', () => {
  let logsService

  beforeEach(() => {
    logsService = LogsServiceProxy()
    jest.clearAllMocks()
  })

  // Test 1: Successfully get all reportes by year
  test('getReporteByYear successfully returns years and months', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          year: 2025,
          months: [10],
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await logsService.getReporteByYear()

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  // Test 2: Successfully get reporte detail by date
  test('getReporteByDetail successfully returns daily report', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          producto: 'Coca-Cola 600ml',
          cantidad: 15,
          unidad: 'piezas',
          total: 300,
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await logsService.getReporteByDetail(2025, 10, 16, 'entrada')

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  // Test 3: Get reporte fails with 404 (not found)
  test('getReporteByDetail throws error when reporte not found (404)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(
      logsService.getReporteByDetail(2025, 10, 99, 'entrada')
    ).rejects.toThrow('Reporte no encontrado')
  })
})
