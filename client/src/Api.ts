/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface OrderDto {
  /** @format int32 */
  id?: number;
  /** @format date */
  deliveryDate?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  status?: string;
  /** @format date-time */
  orderDate?: string;
  orderEntries?: OrderEntryDto[];
}

export interface OrderEntryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  orderId?: number | null;
  product?: PaperDto | null;
}

export interface PaperDto {
  /** @format int32 */
  id?: number;
  name?: string;
  /** @format double */
  price?: number;
  discontinued?: boolean;
  /** @format int32 */
  stock?: number;
  properties?: PropertyDto[];
}

export interface PropertyDto {
  /** @format int32 */
  id?: number;
  propertyName?: string;
}

export interface OrderResponseDto {
  /** @format int32 */
  id?: number;
  /** @format date */
  deliveryDate?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  status?: string;
  /** @format date-time */
  orderDate?: string;
  orderEntries?: OrderResponseEntryDto[];
}

export interface OrderResponseEntryDto {
  /** @format int32 */
  id?: number;
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  orderId?: number | null;
}

export interface CreateOrderDto {
  /** @format date */
  deliveryDate?: string | null;
  /** @format double */
  totalAmount?: number;
  /** @format int32 */
  customerId?: number | null;
  orderEntries?: CreateOrderEntryDto[];
}

export interface CreateOrderEntryDto {
  /** @format int32 */
  quantity?: number;
  /** @format int32 */
  productId?: number;
  /** @format int32 */
  orderId?: number;
}

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "https://server-844014329852.europe-west1.run.app",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title My Title
 * @version 1.0.0
 * @baseUrl https://server-844014329852.europe-west1.run.app
 */
export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
  api = {
    /**
     * No description
     *
     * @tags Admin
     * @name AdminGetAllOrders
     * @request GET:/api/Admin/orders-history-allCustomers
     */
    adminGetAllOrders: (params: RequestParams = {}) =>
      this.request<OrderDto[], any>({
        path: `/api/Admin/orders-history-allCustomers`,
        method: "GET",
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminCreatePaper
     * @request POST:/api/Admin/create-paper
     */
    adminCreatePaper: (data: PaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Admin/create-paper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminUpdateOrderStatus
     * @request PUT:/api/Admin/updateStatus
     */
    adminUpdateOrderStatus: (
      query?: {
        /** @format int32 */
        orderId?: number;
        newStatus?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<File, any>({
        path: `/api/Admin/updateStatus`,
        method: "PUT",
        query: query,
        ...params,
      }),

    /**
     * No description
     *
     * @tags Admin
     * @name AdminEditPaper
     * @request PUT:/api/Admin/edit-paper
     */
    adminEditPaper: (data: PaperDto, params: RequestParams = {}) =>
      this.request<PaperDto, any>({
        path: `/api/Admin/edit-paper`,
        method: "PUT",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetAllPapers
     * @request GET:/api/Paper/papers
     */
    paperGetAllPapers: (
      query?: {
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
        /**
         * @format int32
         * @default 0
         */
        startAt?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper/papers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

      /**
       * No description
       *
       * @tags Paper
       * @name PaperGetCustomersPapers
       * @request GET:/api/Paper/papers
       */
      paperGetCustomersPapers: (
          query?: {
              /**
               * @format int32
               * @default 10
               */
              limit?: number;
              /**
               * @format int32
               * @default 0
               */
              startAt?: number;
          },
          params: RequestParams = {},
      ) =>
          this.request<PaperDto[], any>({
              path: `/api/Paper/customers-papers`,
              method: "GET",
              query: query,
              format: "json",
              ...params,
          }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetFilteredPapers
     * @request GET:/api/Paper/filtered-papers
     */
    paperGetFilteredPapers: (
      query?: {
        /**
         * @format int32
         * @default 10
         */
        limit?: number;
        /**
         * @format int32
         * @default 0
         */
        startAt?: number;
        sortField?: string | null;
        sortOrder?: string | null;
        priceRange?: string | null;
        propertieSelected?: string | null;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper/filtered-papers`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetTotalPapersCount
     * @request GET:/api/Paper
     */
    paperGetTotalPapersCount: (params: RequestParams = {}) =>
      this.request<number, any>({
        path: `/api/Paper`,
        method: "GET",
        format: "json",
        ...params,
      }),

      /**
       * No description
       *
       * @tags Paper
       * @name PaperGetTotalPapersCountCustomers
       * @request GET:/api/papers-count-customers
       */
      paperGetTotalPapersCountCustomers: (params: RequestParams = {}) =>
          this.request<number, any>({
              path: `/api/Paper/papers-count-customers`,
              method: "GET",
              format: "json",
              ...params,
          }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperCreateOrder
     * @request POST:/api/Paper
     */
    paperCreateOrder: (data: CreateOrderDto, params: RequestParams = {}) =>
      this.request<OrderResponseDto, any>({
        path: `/api/Paper`,
        method: "POST",
        body: data,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetCustomerOrders
     * @request GET:/api/Paper/orders-history
     */
    paperGetCustomerOrders: (
      query?: {
        /** @format int32 */
        id?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<OrderDto[], any>({
        path: `/api/Paper/orders-history`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperSearchItems
     * @request GET:/api/Paper/search
     */
    paperSearchItems: (
      query?: {
        query?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<PaperDto[], any>({
        path: `/api/Paper/search`,
        method: "GET",
        query: query,
        format: "json",
        ...params,
      }),

    /**
     * No description
     *
     * @tags Paper
     * @name PaperGetAllProperties
     * @request GET:/api/Paper/properties
     */
    paperGetAllProperties: (params: RequestParams = {}) =>
      this.request<PropertyDto[], any>({
        path: `/api/Paper/properties`,
        method: "GET",
        format: "json",
        ...params,
      }),
  };
}
