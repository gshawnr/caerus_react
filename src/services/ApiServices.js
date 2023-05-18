import backend from "../apis/backend";
import Exception from "../utils/Exception";

export const getBackendApi = async () => {
  try {
    // add min delay to clearly show loading and improve UX
    const [apiRes] = await Promise.all([
      backend.get("investments"),
      delay(700),
    ]);

    const { data = [] } = apiRes;

    return data;
  } catch (err) {
    const { message, response = {} } = err;
    const { status = "investment fetch error" } = response;
    throw new Exception(message, status, err);
  }
};

export const postBackendApi = async (url, inputData) => {
  try {
    const {
      status = 500,
      statusText = "axios call error",
      data = null,
    } = await backend.post(url, {
      data: inputData,
    });

    return data;
  } catch (err) {
    const { message, response = {} } = err;
    const { status = "investment fetch error" } = response;
    throw new Exception(message, status, err);
  }
};

export const putBackendApi = async (url, data) => {
  try {
    const { status = 500, statusText = "axios call error" } = await backend.put(
      url,
      { data }
    );
  } catch (err) {
    const { message, response = {} } = err;
    const { status = "investment fetch error" } = response;
    throw new Exception(message, status, err);
  }
};

const delay = async (ms) =>
  new Promise((res, rej) => {
    setTimeout(() => {
      res();
    }, ms);
  });
