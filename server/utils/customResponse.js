export default class CustomResponse {
  constructor(success, message, status, data) {
    this.success = success;
    this.message = message || "";
    this.status = status || 400;
    this.data = data || null;
  }
}
