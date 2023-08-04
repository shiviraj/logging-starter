import * as crypto from "crypto";
import config, {Integer} from "../config";
import index from "../logger";
import DecryptionError from "../errors/decryptionError";

const algorithm = "aes-256-ctr";
const encoding: BufferEncoding = "base64";
const iv = (): Buffer => Buffer.from(config.encryptionKey).subarray(Integer.ZERO, Integer.SECRET_STRING_LENGTH);

const encryptData = <D extends Record<string, unknown>>(data?: D): { data: string } | { encryptedData: string } => {
  const text = JSON.stringify(data ?? {});

  if (!config.encryptionEnabled) {
    return {data: text};
  }

  const cipher = crypto.createCipheriv(algorithm, config.encryptionKey, iv());
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
  return {encryptedData: encrypted.toString(encoding)};
};

const formatText = <D>(encryptedData: string): { text: string } | D => {
  try {
    return JSON.parse(encryptedData) as D;
  } catch (error) {
    return {text: encryptedData};
  }
};

const decryptData = <D extends Record<string, unknown>>(encryptedData: string): { text: string } | D => {
  if (!config.encryptionEnabled) {
    return formatText<D>(encryptedData);
  }

  try {
    const decipher = crypto.createDecipheriv(algorithm, config.encryptionKey, iv());
    const contentBuffer = Buffer.from(encryptedData, encoding);
    const decrypted = Buffer.concat([decipher.update(contentBuffer), decipher.final()]);
    return JSON.parse(decrypted.toString()) as D;
  } catch (err) {
    const error = new DecryptionError();
    index.error(
      {
        errorCode: "LOGGING_DECRYPTION_ERROR",
        errorMessage: "Failed to decrypt text, Kindly check your encryption string",
        data: {text: encryptedData},
        error
      },
      false
    );
    return {text: encryptedData};
  }
};

export {encryptData, decryptData};
