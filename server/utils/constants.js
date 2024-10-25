function minutesToSeconds(min) {
  return 60 * min;
}

const TOKEN_EXPIRE_TIME = 360;

export const EXPIRE_TIME = minutesToSeconds(TOKEN_EXPIRE_TIME);

export const responseData = {
  success: false,
  status: 400,
  message: "",
  data: null,
};
