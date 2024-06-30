import { API_URL } from '@/constants/path';
import axiosInstance from './axios';
import { CHAT_LIST, CHAT_ROOM } from '@/types';
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


const postChangeAlarmStatus = async () => {
  await axiosInstance.get(`${API_URL.POST_CHANGE_ALARM_STATUS}`)
}

type TGetChatContent = {
  chatRoomId: number;
  page?: number;
  size?: number;
}

type ResponseChatList = {
  chatMessageGetResponseList: CHAT_LIST[],
  chatRoomId: number,
  hostImageKey: string,
  title: string,
  memberCnt: number,
  isFirst: boolean,
  hasNext: boolean
}

const getChatContent = async ({ chatRoomId, page = 1, size = 1 }: TGetChatContent): Promise<ResponseChatList> => {
  const { data } = await axiosInstance.get(`${API_URL.GET_CHAT_CONTENT}/${chatRoomId}?page=${page}&size=${size}`)

  return data;
}

const deleteChatRoom = async ({chatRoomId}: {chatRoomId: number}) => {
  await axiosInstance.delete(`${API_URL.DELETE_CHAT_ROOM}/${chatRoomId}`)
}

export type { ResponseChatRoom, ResponseChatList };
export { getChatsList, postChangeAlarmStatus, getChatContent, deleteChatRoom };

