import { noAuthget, get, post, put, delhandle, patch, noAuthpost} from "./axios";

export const apiAddEmp = (params, callback, errorCallback) => noAuthget('/api/empAuth/sign-in', callback, params, errorCallback )
export const apiGetBackFun = (callback) => get('/api/function', callback )
export const apiAdoption = {
    getAllByStatus:  (adoPetNo,callback) => get(`/api/adoption/adopets/${adoPetNo}`, callback ),
    addAdopet:  (param, callback) => post('/api/adoption/adopets', callback, param ),
    updateAdopet:  (param, callback) => put('/api/adoption/adopets', callback, param ),
    deleteAdopet:  (adoPetNo, callback) => delhandle(`/api/adoption/adopets/${adoPetNo}`, callback ),
    updateAdoStatus:  (adoPetNo, param, callback) => patch(`/api/adoption/adopets/${adoPetNo}`, callback, param ),
    confirmApplication:  (param, callback) => patch(`/api/adoption/pdf`, callback, param ),
    addApplication:  (param, callback) => post(`/api/adoption/pdf`, callback, param ),
}
export const apiEmployee = {
    getAllByParams:  (param,callback) => get(`/api/employees/searchEmp`, callback , param),
    getEmpInfo:  (empNo,callback) => get(`/api/employees/${empNo}`, callback),
    addEmp:  (param, callback) => post('/api/employees', callback, param ),
    updateEmp:  (param, callback) => put('/api/employees', callback, param ),
    updateEmpAccStatus:  (empNo, callback) => patch(`/api/employees/${empNo}`, callback ),
    getAuthFun: (empNo,callback) => get(`/api/authorities/${empNo}`, callback ),
    saveAuthFun: (param, callback) => put('/api/authorities', callback, param ),
}

export const apiAuthentication = {
    login: (param, callback) => noAuthpost('/api/empAuth/login', callback, param ),
    forgotPsw: (param, callback) => noAuthpost('/api/empAuth/forgot', callback, param ),
    changePsw: (param, callback) => noAuthpost('/api/empAuth/change', callback, param ),
    refreshToken: (param, callback) => noAuthpost('/api/empAuth/refreshToken', callback, param ),
    getHost: (callback) => noAuthget('/api/empAuth', callback),
}
