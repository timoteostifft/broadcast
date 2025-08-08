export enum ErrorCodes {
  INTERNAL_ERROR = "INTERNAL_ERROR",
  NOT_FOUND = "NOT_FOUND",
  BAD_REQUEST = "BAD_REQUEST",
  UNSUFICIENT_SERVICE_PROVIDERS = "UNSUFICIENT_SERVICE_PROVIDERS",
}

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.INTERNAL_ERROR]: "An internal error occurred",
  [ErrorCodes.NOT_FOUND]: "The requested resource was not found",
  [ErrorCodes.BAD_REQUEST]: "The request was invalid",
  [ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS]:
    "There are not enough service providers available",
};

export const ErrorStatuses: Record<ErrorCodes, number> = {
  [ErrorCodes.INTERNAL_ERROR]: 500,
  [ErrorCodes.NOT_FOUND]: 404,
  [ErrorCodes.BAD_REQUEST]: 400,
  [ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS]: 422,
};

export type ErrorCode = keyof typeof ErrorCodes;
export type ErrorStatus = (typeof ErrorStatuses)[keyof typeof ErrorStatuses];
