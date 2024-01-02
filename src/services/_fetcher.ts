import { ACCESS_TOKEN } from "@/constants";
import { getWithExpiry } from "@/utils/localstorage";
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosResponse,
    InternalAxiosRequestConfig,
  } from "axios";


  import { QueryClient } from "react-query";
 
  
  const FETCHER: AxiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_ENDPOINT ,
  });
  
  const onRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = getWithExpiry(ACCESS_TOKEN);
    if (token) {
      config.headers.set("Authorization", `Bearer ${token as string}`);
    }
    return config;
  };
  
  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  };
  
  const onResponse = (response: AxiosResponse): AxiosResponse => {
    return response;
  };
  
  const onResponseError = (
    error: AxiosError<{ message: string }>
  ): Promise<AxiosError> => {
    if (
      error.response?.data?.message === "Missing authentication header" ||
      error.response?.data.message === "Unauthorized Token"
    ) {
      const token = getWithExpiry(ACCESS_TOKEN);
      if (token) {
        localStorage.removeItem(ACCESS_TOKEN);
      }
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  };
  
  const setInterceptor = (axiosInstance: AxiosInstance): AxiosInstance => {
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
    axiosInstance.interceptors.response.use(onResponse, onResponseError);
    return axiosInstance;
  };
  
  setInterceptor(FETCHER);
  
  export default FETCHER;
  
  export const queryClient = new QueryClient();