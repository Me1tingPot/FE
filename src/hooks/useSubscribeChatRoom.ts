import { useStomp } from './useStomp'

const UseSubscribeChatRoom = async (destination: string, callback: () => void) => {
  const { client } = await useStomp();

  const subscription = client.subscribe(destination, callback);

  return { subscription }
}

export default UseSubscribeChatRoom