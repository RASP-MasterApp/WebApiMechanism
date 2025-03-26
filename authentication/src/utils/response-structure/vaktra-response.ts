import { StatusCodes, ReasonPhrases } from 'http-status-codes';

export class VaktraResponse<T> {
  constructor(
    public statusCode: number,
    public message: string,
    public data: T | null,
    public error: string | null = null,
  ) {}

  static success<T>(
    statusCode: number = StatusCodes.OK,
    message: string = ReasonPhrases.OK,
    data: T,
  ): VaktraResponse<T> {
    return new VaktraResponse(statusCode, message, data, null);
  }

  static error<T>(
    statusCode: number = StatusCodes.INTERNAL_SERVER_ERROR,
    message: string = ReasonPhrases.INTERNAL_SERVER_ERROR,
    error: string,
  ): VaktraResponse<T> {
    return new VaktraResponse(statusCode, message, null, error);
  }
}
