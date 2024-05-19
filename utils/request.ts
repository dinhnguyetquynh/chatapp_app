import axios, {AxiosResponse} from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
} from 'axios';
import localStorageService from '../services/localStorageService';
import {APP_KEY} from '../common/constant';

const baseConfig = {
  timeout: 10000,
  baseURL: 'http://127.0.0.1:3000/api',
};

interface ApiConfig extends AxiosRequestConfig {
  // Configure whether to allow takeover of 404 errors
  allow404?: boolean;
  ignoreError?: '403' | '50X';
  // Configure whether to pass errors directly
  passingError?: boolean;
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig<any> {
  retry?: boolean;
}

class Request {
  instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      async (requestConfig: CustomAxiosRequestConfig) => {
        const token = (await localStorageService.getValue(APP_KEY.token)) || '';
        (
          requestConfig.headers as AxiosRequestHeaders
        ).Authorization = `Bearer ${token.trim()}`;

        return requestConfig;
      },
      (err: AxiosError) => {
        console.error('request interceptors error:', err);
      },
    );

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const {status, data} = res;

        if (status === 204) {
          // no content
          return true;
        }
        return data;
      },
      async error => {
        const {status, data} = error.response || {};
        const {details, errorCode = ''} = data;

        const msg = details[0].message;
        console.log(data);
        if (status === 400) {
          return Promise.reject(msg);
        }
        // 401: Re-login required
        if (status === 401) {
          const originalRequest = error.config;
          // clear userinfo

          if (errorCode === 'token_expired' && !originalRequest._retry) {
            const refreshToken =
              localStorageService.getValue(APP_KEY.refreshToken) || null;
            if (refreshToken) {
              originalRequest._retry = true;
              try {
                const resp = await fetch(`${baseConfig.baseURL}/auth/token`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({token: refreshToken}),
                }).then(_data => data.json());

                const accessToken = resp.access_token;
                const _refreshToken = resp.refresh_token;

                localStorageService.setValue(APP_KEY.token, accessToken);
                localStorageService.setValue(
                  APP_KEY.refreshToken,
                  _refreshToken,
                );

                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return this.instance(originalRequest);
              } catch (_error) {
                return Promise.reject(_error);
              }
            } else {
              return Promise.reject(error);
            }
          }
          return Promise.reject(false);
        }

        if (status === 403) {
          // Permission interception
          return Promise.reject(msg);
        }

        if (status === 404) {
          return Promise.reject(msg);
        }

        if (status >= 500) {
          console.error(
            `Request failed with status code ${500}, ${
              'Server external error' || ''
            }`,
          );
        }
        return Promise.reject(data);
      },
    );
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T>(url: string, config?: ApiConfig): Promise<T> {
    return this.instance.get(url, config);
  }

  public post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.post(url, data, config);
  }

  public put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.put(url, data, config);
  }

  public delete<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.instance.delete(url, {
      data,
      ...config,
    });
  }
}

const request = new Request(baseConfig);
export default request;
export {Request};
