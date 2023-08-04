import index from "../logger";
import "./promise";
import DecryptionError from "../errors/decryptionError";

describe("Promise extension test", () => {

  beforeEach(jest.clearAllMocks);
  afterEach(jest.clearAllMocks);

  it("should log with promise on success", async () => {
    jest.spyOn(index, "info").mockImplementation();
    jest.spyOn(index, "error").mockImplementation();

    const message = await new Promise<string>((resolve) => {
      resolve("message");
    })
      .logOnSuccess({message: "success message"})
      .logOnError({errorMessage: "failure message"});

    expect(message).toStrictEqual("message");
    expect(index.info).toHaveBeenCalledTimes(1);
    expect(index.info).toHaveBeenCalledWith({message: "success message", data: {parameter: "message"}}, true);
    expect(index.error).toHaveBeenCalledTimes(0);

  });

  it("should log with promise on success without encryption and without log data", async () => {
    jest.spyOn(index, "info").mockImplementation();
    jest.spyOn(index, "error").mockImplementation();

    const message = await new Promise<string>((resolve) => {
      resolve("message");
    })
      .logOnSuccess({message: "success message"}, false, false)
      .logOnError({errorMessage: "failure message"});

    expect(message).toStrictEqual("message");
    expect(index.info).toHaveBeenCalledTimes(1);
    expect(index.info).toHaveBeenCalledWith({message: "success message"}, false);
    expect(index.error).toHaveBeenCalledTimes(0);

  });

  it("should log with promise on error", async () => {
    jest.spyOn(index, "error").mockImplementation();
    jest.spyOn(index, "info").mockImplementation();

    const promise = new Promise<string>((resolve, reject) => {
      reject(new DecryptionError());
    })
      .logOnSuccess({message: "success message"}, false, false)
      .logOnError({errorMessage: "failure message"});

    await expect(promise).rejects.toThrow(Error);

    expect(index.error).toHaveBeenCalledTimes(1);
    expect(index.error).toHaveBeenCalledWith({errorMessage: "failure message", error: new DecryptionError()}, true);
  });
});
