export const ERROR_MESSAGE = {
  /*
    AXIOS ERROR CODES
    Lista completa en:
    https://github.com/axios/axios?tab=readme-ov-file#error-types
  */
  ERR_BAD_OPTION_VALUE:
    'Se proporcionó un valor no válido o no compatible en la configuración de Axios',
  ERR_BAD_OPTION:
    'Se proporcionó una opción no válida en la configuración de Axios',
  ECONNABORTED: 'La solicitud excedió el tiempo límite configurado y se abortó',
  ETIMEDOUT:
    'La solicitud excedió el tiempo de espera predeterminado y no obtuvo respuesta a tiempo',
  ERR_NETWORK:
    'Hubo un problema relacionado con la red (como pérdida de conexión)',
  ERR_FR_TOO_MANY_REDIRECTS:
    'La solicitud fue redirigida demasiadas veces, superando el máximo permitido en la configuración',
  ERR_DEPRECATED: 'Se utilizó una característica o método obsoleto en Axios',
  ERR_BAD_RESPONSE:
    'La respuesta no se puede analizar correctamente o está en un formato inesperado',
  ERR_BAD_REQUEST:
    'La solicitud tiene un formato inesperado o le faltan parámetros necesarios',
  ERR_CANCELED: 'La solicitud fue cancelada explícitamente por el usuario',
  ERR_NOT_SUPPORT:
    'La característica o método no es compatible en el entorno actual de Axios',
  ERR_INVALID_URL:
    'Se proporcionó una URL no válida para la solicitud de Axios',

  // CUSTOM CODES
  ERR_LOGIN: 'Email o contraseña incorrectos',
}

const UNKNOWN_ERROR_MESSAGE = 'Se ha producido un error desconocido'

export class AppError extends Error {
  constructor(code?: string) {
    const message = code
      ? ERROR_MESSAGE[code as keyof typeof ERROR_MESSAGE]
      : UNKNOWN_ERROR_MESSAGE

    super(message)
  }
}
