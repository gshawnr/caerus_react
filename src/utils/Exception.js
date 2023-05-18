class Exception extends Error {
  constructor(message, statusCode = 500, err = null) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
    this.cause = err;
  }
}

export default Exception;
