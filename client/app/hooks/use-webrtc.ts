import { useMutation, useQuery } from "@tanstack/react-query";
import { createRoom, getRoomURL } from "../services/webrtc-service";

export const useGetRoomURL = (enabled: boolean) => {
  return useQuery({
    queryKey: ["room"],
    queryFn: getRoomURL,
    enabled,
  });
};

export const useGetRoom = (id: string | string[] | undefined, enabled: boolean) => {
  return useQuery({
    queryKey: ["roomcreate"],
    queryFn: () => createRoom(id),
    enabled,
  });
};
