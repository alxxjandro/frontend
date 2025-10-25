import UsuariosServiceProxy from '../api/proxies/usuariosService'

global.fetch = jest.fn()

describe('UsuariosService Tests', () => {
  let usuariosService

  beforeEach(() => {
    usuariosService = UsuariosServiceProxy()
    jest.clearAllMocks()
  })

  test('getAllUsuarios successfully returns list of usuarios', async () => {
    const mockResponse = {
      success: true,
      data: [
        {
          idUsuario: 1,
          nombreUsuario: 'juan.perez',
          apellidoPaterno: 'Pérez',
          apellidoMaterno: 'García',
          permisoUsuario: 1,
        },
      ],
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await usuariosService.getAllUsuarios()

    expect(result).toEqual(mockResponse.data)
    expect(Array.isArray(result)).toBe(true)
  })

  test('createUsuario successfully creates and returns usuario', async () => {
    const mockRequest = {
      nombreUsuario: 'maria.lopez',
      apellidoPaterno: 'López',
      apellidoMaterno: 'Martínez',
      permisoUsuario: 2,
      password: 'securePassword123',
    }

    const mockResponse = {
      success: true,
      message: 'Usuario creado exitosamente',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 201,
      json: async () => mockResponse,
    })

    const result = await usuariosService.createUsuario(mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('updateUsuario successfully updates and returns usuario', async () => {
    const mockRequest = {
      nombreUsuario: 'juan.perez.updated',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'García',
      permisoUsuario: 2,
      password: 'newPassword123',
    }

    const mockResponse = {
      success: true,
      message: 'Usuario actualizado correctamente',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await usuariosService.updateUsuario(1, mockRequest)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('deleteUsuario successfully deletes usuario', async () => {
    const mockResponse = {
      success: true,
      message: 'Usuario eliminado correctamente',
    }

    global.fetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => mockResponse,
    })

    const result = await usuariosService.deleteUsuario(1)

    expect(result).toEqual(mockResponse)
    expect(result.success).toBe(true)
  })

  test('createUsuario throws error for missing required fields (400)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
    })

    await expect(
      usuariosService.createUsuario({
        nombreUsuario: 'incomplete',
      })
    ).rejects.toThrow('Error al crear el usuario')
  })

  test('getUsuarioById throws error when usuario not found (404)', async () => {
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    await expect(usuariosService.getUsuarioById(999)).rejects.toThrow(
      'Usuario no encontrado'
    )
  })
})
