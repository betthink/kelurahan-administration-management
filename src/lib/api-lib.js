import { axiosInstance } from "../utils/axiosInstance";

export async function handleFetchApi(url) {
  try {
    const res = await axiosInstance.get(
      `/administrasikelurahan/src/api/${url}`
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}
