# Logging-starter

A library to log your info and error in your application. If you don't want to log your PII/secret data in logs you can enable the log encryption, so that It will log as encrypted data


### How to use

- If you want to enable the log encryption, you have to set two env variable as `LOGGING_ENCRYPTION_KEY="your log encryption key"` and `LOGGING_ENCRYPTION_ENABLED="true"` .
- By default log encryption is disabled. 

## Example

```javascript
const logger = require("logging-starter")

logger.info({message: "good message", data: {text: "text that you want to encrypt"}, additionalData: {text: "some additional data"}, searchableFields:{field: "Fields that you want to search on logging screen"}})

logger.error({errorCode: "your custom error code", errorMessage: "your custom message", data: {text: "text that you want to encrypt"}, error: new Error("Error that you recieved in your application"),  additionalData: {text: "some additional data"}, searchableFields:{field: "Fields that you want to search on logging screen"}})

new Promise((resolve, reject) => {
  resolve("message");
})
  .logOnSuccess({message: "good message"})
  .logOnError({errorMessage: "error message"});
```
