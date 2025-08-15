export enum ErrorCodes {
  INTERNAL_ERROR = "INTERNAL_ERROR",
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  BAD_REQUEST = "BAD_REQUEST",
  UNSUFICIENT_SERVICE_PROVIDERS = "UNSUFICIENT_SERVICE_PROVIDERS",
  UNAUTHORIZED = "UNAUTHORIZED",
  VALIDATION_ERROR = "VALIDATION_ERROR",
}

export const ErrorMessages: Record<ErrorCodes, string> = {
  [ErrorCodes.INTERNAL_ERROR]: "An internal error occurred.",
  [ErrorCodes.RESOURCE_NOT_FOUND]: "The requested resource was not found.",
  [ErrorCodes.RESOURCE_ALREADY_EXISTS]: "The resource already exists.",
  [ErrorCodes.BAD_REQUEST]: "The request was invalid.",
  [ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS]:
    "There are not enough service providers available.",
  [ErrorCodes.UNAUTHORIZED]: "Unauthorized access. Please log in.",
  [ErrorCodes.VALIDATION_ERROR]: "The request data is invalid.",
};

export const ErrorStatuses: Record<ErrorCodes, number> = {
  [ErrorCodes.INTERNAL_ERROR]: 500,
  [ErrorCodes.RESOURCE_NOT_FOUND]: 404,
  [ErrorCodes.RESOURCE_ALREADY_EXISTS]: 409,
  [ErrorCodes.BAD_REQUEST]: 400,
  [ErrorCodes.UNSUFICIENT_SERVICE_PROVIDERS]: 422,
  [ErrorCodes.UNAUTHORIZED]: 401,
  [ErrorCodes.VALIDATION_ERROR]: 422,
};

export type ErrorCode = keyof typeof ErrorCodes;
export type ErrorStatus = (typeof ErrorStatuses)[keyof typeof ErrorStatuses];
