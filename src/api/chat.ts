import { API_URL } from '@/constants/path';
import axiosInstance from './axios';
import { CHAT_ROOM } from '@/types';
import { INFINITE_META_DATA } from '@/types/api/types';

type ResponseChatRoom = {
  chatRoomGetResponseList: CHAT_ROOM[];
  isFirst: boolean;
  hasNext: boolean;
}

type InfiniteParams = {
  page?: number;
  size?: number;
};

const getChatsList = async ({ page = 1, size = 1 }: InfiniteParams): Promise<ResponseChatRoom> => {
  const { data } = await axiosInstance.get(`${API_URL.GET_CHAT_ROOMS}?page=${page}&size=${size}`);

  return data;
};

export { getChatsList };
export type { ResponseChatRoom };
