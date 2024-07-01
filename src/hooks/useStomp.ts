import { storageKeys } from '@/constants';
import { getEncryptStorage } from '@/utils';
import { Client } from '@stomp/stompjs';



export async function useStomp() {
  const accessToken = await getEncryptStorage(storageKeys.ACCESS_TOKEN);

  const client = new Client({
    brokerURL: `wss://meltingpot.kaaa.ng/chat`,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`
    },
    onConnect: () => {
      console.log("asdf")
    },
    onDisconnect: (err) => {
      console.log(err)
    },
    debug: (str) => {
      console.log(str)
    },
    reconnectDelay: 10000, //자동 재 연결
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,
  })


  client.activate();

  return { client }
}