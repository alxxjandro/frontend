import AuthServiceProxy from '../api/proxies/authService'

global.fetch = jest.fn()

describe('AuthService Tests', () => {
  let authService

  beforeEach(() => {
    authService = AuthServiceProxy()
    jest.clearAllMocks()
  })

  test('login successfully returns token and user data', async () => {
    const mockResponse = {
      success: true,
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      user: {
        idUsuario: 1,
        nombre: 'Juan Pérez',
        rol: 'admin',
      },
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await authService.login({
      nombreUsuario: 'admin',
      password: 'password123',
    })

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
    expect(result.token).toBeTruthy()
    expect(result.user.idUsuario).toBe(1)
  })

  test('login throws error for invalid credentials (401)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
    })

    await expect(
      authService.login({
        nombreUsuario: 'wronguser',
        password: 'wrongpass',
      })
    ).rejects.toThrow('Credenciales incorrectas')
  })

  test('login throws error for invalid data (400)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    })

    await expect(
      authService.login({
        nombreUsuario: '',
        password: '',
      })
    ).rejects.toThrow('Datos inválidos')
  })
})
