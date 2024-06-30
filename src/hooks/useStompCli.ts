import { getAccessToken } from '@/api/auth';
import { storageKeys } from '@/constants';
import { getEncryptStorage } from '@/utils';
import StompJs from '@stomp/stompjs';
import Config from 'react-native-config';

export async function useStompCli() {
  const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);
  console.log(accessToken, 'hi');
  const client = new StompJs.Client({
    brokerURL: `wss://meltingpot.kaaa.ng/chat`,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`
    },
    onConnect: () => {
      console.log('asdf');
    },
    onDisconnect: (err) => {
      console.error(err);
    },
    debug: function (str) {
      console.log(str, 123);
    },
    reconnectDelay: 10000, //자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  });
  client.activate();

  return { client }
}
