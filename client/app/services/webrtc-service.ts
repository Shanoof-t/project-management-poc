import apiClient from "../lib/axios.config";

export const getRoomURL = async () => {
  const res = await apiClient.get("/create-url");
  return res.data;
};

export const createRoom = async (id: string | string[] | undefined) => {
  const res = await apiClient.get("/room/:" + id);
  return res.data;
};
