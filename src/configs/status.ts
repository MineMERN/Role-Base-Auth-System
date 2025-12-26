type HttpStatusStructure = {
  status: number;
  message: string;
};

export const HttpStatus = {
  OK: { status: 200, message: 'OK' },
  CREATED: { status: 201, message: 'Created' },
  BAD_REQUEST: { status: 400, message: 'Bad Request' },
  UNAUTHORIZED: { status: 401, message: 'Unauthorized' },
  FORBIDDEN: { status: 403, message: 'Forbidden' },
  NOT_FOUND: { status: 404, message: 'Not Found' },
  CONFLICT: { status: 409, message: 'Conflict' },
  TOO_MANY_REQUESTS: { status: 429, message: 'Rate limit exceeded' },
  INTERNAL_SERVER_ERROR: { status: 500, message: 'Internal Server Error' },
  BAD_GATEWAY: { status: 502, message: 'Bad Gateway' },
  SERVICE_UNAVAILABLE: { status: 503, message: 'Service Unavailable' },
} as const satisfies Record<string, HttpStatusStructure>;
