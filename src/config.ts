const encryptionKey = (process.env.LOGGING_ENCRYPTION_KEY ?? "").trim();
const encryptionEnabled = (process.env.LOGGING_ENCRYPTION_ENABLED ?? encryptionKey).trim() || "false";

const config = {
  encryptionKey: encryptionKey ? encryptionKey.padStart(32, "0") : encryptionKey,
  encryptionEnabled: encryptionEnabled.toLowerCase() === "true"
};

export default config;
