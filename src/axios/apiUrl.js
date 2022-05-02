import { noAuthget, get, post, put, delhandle, patch} from "./axios";

export const apiAddEmp = (params, callback, errorCallback) => noAuthget('/api/empAuth/sign-in', callback, params, errorCallback )
export const apiGetBackFun = (callback) => get('/api/function', callback )
export const apiAdoption = {
    getAllByStatus:  (adoPetNo,callback) => get(`/api/adoption/adopets/${adoPetNo}`, callback ),
    addAdopet:  (param, callback) => post('/api/adoption/adopets', callback, param ),
    updateAdopet:  (param, callback) => put('/api/adoption/adopets', callback, param ),
    deleteAdopet:  (adoPetNo, callback) => delhandle(`/api/adoption/adopets/${adoPetNo}`, callback ),
    updateAdoStatus:  (adoPetNo, param, callback) => patch(`/api/adoption/adopets/${adoPetNo}`, callback, param ),
    confirmApplication:  (adoPetNo, callback) => patch(`/api/adoption/pdf/${adoPetNo}`, callback ),
}
export const apiEmployee = {
    getAllByParams:  (param,callback) => get(`/api/employees/searchEmp`, callback , param),
    addEmp:  (param, callback) => post('/api/employees', callback, param ),
    updateEmp:  (param, callback) => put('/api/employees', callback, param ),
    updateEmpAccStatus:  (empNo, callback) => patch(`/api/employees/${empNo}`, callback ),
}
