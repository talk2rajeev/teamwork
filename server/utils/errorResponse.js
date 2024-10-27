export function getErrorResponse(error, response) {
  response.success = false;
  response.status = error.status || 500;
  response.message = error.message;

  return response;
}
