import * as bcrypt from 'bcrypt';
import * as forge from 'node-forge';
import * as dotenv from 'dotenv';

dotenv.config();
const pair = forge.pki.rsa.generateKeyPair({bits: 2048});


export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}
export async function comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
}
export function encrypt(password: string) {
    const publicKey = forge.pki.publicKeyToPem(pair.publicKey);
    const encryptedPassword = forge.pki.publicKeyFromPem(publicKey).encrypt(password);
    return forge.util.encode64(encryptedPassword);
}
export function decrypt(encryptedPassword: string) {
    const privateKey = forge.pki.privateKeyToPem(pair.privateKey);
    const encryptedPasswordBytes = forge.util.decode64(encryptedPassword);
    const decryptedPassword = forge.pki.privateKeyFromPem(privateKey).decrypt(encryptedPasswordBytes);
    return decryptedPassword;
}
export function DBPassword() {
    const password = process.env.DB_PASSWORD || '';
    const encryptedPassword = encrypt(password);
    return encryptedPassword;
}
export function DBUser() {
    return process.env.DB_USER || '';
}
export function DBHost() {
    return process.env.DB_HOST || '';
}
export function DBPort() {
    return parseInt(process.env.DB_PORT || '0');
}
export function DBName() {
    return process.env.DB_NAME || '';
}