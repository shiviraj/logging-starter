import * as crypto from "crypto";
import config from "./config";
import logger from "./index";
import DecryptionError from "./errors/decryptionError";

const algorithm = "aes-256-ctr";
const iv = Buffer.from(config.encryptionKey).subarray(0, 16);
const encoding: BufferEncoding = "base64";

const encryptData = <D extends Record<string, unknown>>(data: D): { data: string } | { encryptedData: string } => {
  const text = JSON.stringify(data);

  if (!config.encryptionEnabled) {
    return {data: text};
  }

  const cipher = crypto.createCipheriv(algorithm, config.encryptionKey, iv);
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {encryptedData: encrypted.toString(encoding)};
};

const decryptData = <D extends Record<string, unknown>>(encryptedData: string): { text: string } | D => {

  if (!config.encryptionEnabled) {
    try {
      return JSON.parse(encryptedData);
    } catch (error) {
      return {text: encryptedData};
    }
  }

  try {
    const decipher = crypto.createDecipheriv(algorithm, config.encryptionKey, iv);
    const contentBuffer = Buffer.from(encryptedData, encoding);
    const decrypted = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);
    return JSON.parse(decrypted.toString());
  } catch (e) {
    const error = new DecryptionError();
    logger.error({
      errorCode: "LOGGING_DECRYPTION_ERROR",
      errorMessage: "Failed to decrypt text, Kindly check your encryption string",
      data: {text: encryptedData},
      error
    }, false);
    return {text: encryptedData};
  }
};

export {encryptData, decryptData};
