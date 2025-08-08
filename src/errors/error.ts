// Errors
import {
  ErrorCode,
  ErrorCodes,
  ErrorMessages,
  ErrorStatus,
  ErrorStatuses,
} from "./utils";

export class InternalError extends Error {
  public readonly code: ErrorCode;
  public readonly status: ErrorStatus;

  constructor(
    code: ErrorCode = ErrorCodes.INTERNAL_ERROR,
    status: ErrorStatus = ErrorStatuses.INTERNAL_ERROR
  ) {
    super(ErrorMessages[code]);
    this.code = code;
    this.status = ErrorStatuses[code];
  }
}
