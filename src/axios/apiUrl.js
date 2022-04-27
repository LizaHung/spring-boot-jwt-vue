import { noAuthget } from "./axios";

export const apiAddEmp = (params, callback, errorCallback) => noAuthget('/api/empAuth/sign-in', callback, params, errorCallback )