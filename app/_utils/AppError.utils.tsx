export default class AppError extends Error {
  statusCode: number
  statusText: 'fail' | 'error'

  constructor({
    statusCode,
    message
  }: {
    statusCode: number
    message: string
  }) {
    super(message)
    this.statusCode = statusCode
    this.statusText = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      statusText: this.statusText
    }
  }
}
