import * as bcrypt from 'bcrypt';

// const SALT  = 10;

export function encodePassword(rawPassport) {
    const SALT = bcrypt.genSaltSync();
    return bcrypt.hashSync(rawPassport, SALT);
}

export function comparePasswrod(rawPassword, hash) {
    return bcrypt.compareSync(rawPassword, hash);
}