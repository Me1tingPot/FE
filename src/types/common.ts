import { AxiosError } from 'axios';

type ThemeMode = 'light' | 'dark';

type ResponseError = AxiosError<{
  statusCode: string;
  message: string;
  error: string;
}>;

export type { ThemeMode, ResponseError };
