export class ErrorBase extends Error {
  public innerError: Error;
  public type: any;

  constructor(error: { type: any; innerError?: any; message: string }) {
    super(error.message);
    this.type = error.type;
    this.innerError = error.innerError;
  }
}
