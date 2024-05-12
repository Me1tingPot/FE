import {QueryClient} from '@tanstack/react-query';

// 요청이 실패하면 기본적으로 3번 재요청 모두 이것을 안하도록 설정
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
