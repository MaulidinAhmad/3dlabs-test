import { NextRouter } from "next/router";
// import { number } from 'yup';
// import { InitialContextType } from '../store';

export enum Status {
  ENABLE = "0",
  DISABLE = "1",
}

export interface Admin {
  id: number;
  name: string;
  email: string;
  roles: string[];
  password: string;
  status: Status;
  otp_code: string;
  last_iat: number;
  created_by: Admin;
  updated_by: Admin;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export type ErrorObj<T extends object> = {
  [key in keyof T]: string;
};

export interface ResponseAPI<T = any> {
  errors?: T extends object ? ErrorObj<T> : any;
  code: number;
  message: string;
  data: T;
  timestamp: string;
}

// JSON Placeholder Request and Response Type
export interface IPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

export interface LoginExampleRequest {
  username: string;
  password: string;
}

export interface IResponseTemplate<T> {
  code: number;
  data: T;
  message: string;
  timestamp: string;
  version: string;
}

// export interface IAuthGuardInstace {
//   ctx?: InitialContextType;
//   router?: NextRouter;
//   withoutErrorModal?: boolean;
//   withoutAuth?: boolean;
// }

// export interface INoGuardInstance {
//   ctx?: InitialContextType;
//   withoutErrorModal?: boolean;
// }

export interface IPaginationResponse {
  currentPage: number;
  totalData: number;
  totalDataOnPage: number;
  totalPages: number;
}
