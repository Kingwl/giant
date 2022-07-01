import axios from "axios";

export async function push(title: string, desp?: string) {
  const token = process.env.serverToken;
  if (!token) {
    throw new Error("serverToken is required");
  }
  const url = `https://sctapi.ftqq.com/${token}.send`;
  const resp = await axios.post(
    url,
    {},
    {
      params: {
        title,
        desp,
      },
    }
  );
  return resp.data;
}
