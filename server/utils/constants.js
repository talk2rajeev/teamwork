function minutesToSeconds(min) {
    return 60 * min;
}

const TOKEN_EXPIRE_TIME = 120;

export const EXPIRE_TIME = minutesToSeconds(TOKEN_EXPIRE_TIME);